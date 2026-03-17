import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import type { Post } from "@/lib/types";
import { PostActionsMenu } from "@/components/admin/post-actions-menu";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 sm:mb-12">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-2">Dashboard</h1>
                    <p className="text-foreground/50 text-sm sm:text-base">Manage your stories and creative thoughts.</p>
                </div>
                <Link href="/admin/editor/new">
                    <Button className="w-full sm:w-auto shadow-lg shadow-primary/20 transition-transform active:scale-95">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            {/* Mobile View: Card List */}
            <div className="grid gap-4 sm:hidden">
                {posts && posts.length > 0 ? (
                    posts.map((post: Post) => (
                        <div 
                            key={post.id} 
                            className="bg-card/50 backdrop-blur-sm border border-muted p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
                        >
                            <div className="flex justify-between items-start gap-3 mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-serif font-bold text-lg leading-tight truncate group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-xs text-foreground/40 mt-1 truncate">{post.slug}</p>
                                </div>
                                <PostActionsMenu postId={post.id} postTitle={post.title} postSlug={post.slug} />
                            </div>
                            
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-muted/50">
                                <span
                                    className={`inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg ${post.is_published
                                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400"
                                        : "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400"
                                        }`}
                                >
                                    {post.is_published ? "Published" : "Draft"}
                                </span>
                                <span className="text-[10px] text-foreground/30 font-medium">
                                    {formatDate(post.created_at)}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* Desktop View: Modern Table */}
            <div className="hidden sm:block bg-card/30 backdrop-blur-md rounded-2xl shadow-xl border border-muted/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-muted/50 bg-muted/20">
                                <th className="text-left p-6 font-serif font-bold text-foreground/70">Story Title</th>
                                <th className="text-left p-6 font-serif font-bold text-foreground/70">Status</th>
                                <th className="text-left p-6 font-serif font-bold text-foreground/70">Last Updated</th>
                                <th className="text-right p-6 font-serif font-bold text-foreground/70">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.length > 0 ? (
                                posts.map((post: Post) => (
                                    <tr 
                                        key={post.id} 
                                        className="border-b border-muted/30 last:border-0 hover:bg-muted/10 transition-colors group"
                                    >
                                        <td className="p-6">
                                            <div className="font-serif font-bold text-lg group-hover:text-primary transition-colors">{post.title}</div>
                                            <div className="text-xs text-foreground/40 font-mono mt-0.5">
                                                /{post.slug}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span
                                                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${post.is_published
                                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                                                    : "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
                                                    }`}
                                            >
                                                {post.is_published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="p-6 text-sm text-foreground/50">
                                            {formatDate(post.created_at)}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end">
                                                <PostActionsMenu postId={post.id} postTitle={post.title} postSlug={post.slug} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>
                                        <EmptyState />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="p-20 text-center bg-card/20 rounded-2xl border border-dashed border-muted/50 m-4 sm:m-0">
            <div className="flex flex-col items-center gap-4 text-foreground/20">
                <div className="p-6 bg-muted/30 rounded-full">
                    <PlusCircle className="h-12 w-12 stroke-[1px]" />
                </div>
                <div>
                    <p className="text-xl font-serif font-bold text-foreground/60">No stories found</p>
                    <p className="text-sm text-foreground/40 max-w-[240px] mx-auto mt-2">
                        Your dashboard is currently an empty canvas. Time to write something beautiful.
                    </p>
                </div>
                <Link href="/admin/editor/new" className="mt-4">
                    <Button variant="outline" className="rounded-full px-8">Create Entry</Button>
                </Link>
            </div>
        </div>
    );
}
