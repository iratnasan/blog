import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Eye } from "lucide-react";
import type { Post } from "@/lib/types";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-bold">Dashboard</h1>
                <Link href="/admin/editor/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="bg-card rounded-xl shadow-sm border border-muted overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Title</th>
                                <th className="text-left p-4 font-semibold">Status</th>
                                <th className="text-left p-4 font-semibold">Date</th>
                                <th className="text-right p-4 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts && posts.length > 0 ? (
                                posts.map((post: Post) => (
                                    <tr key={post.id} className="border-b border-muted last:border-0">
                                        <td className="p-4">
                                            <div className="font-medium">{post.title}</div>
                                            <div className="text-sm text-foreground/60">
                                                {post.slug}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs rounded-full ${post.is_published
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                                                    }`}
                                            >
                                                {post.is_published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-foreground/60">
                                            {formatDate(post.created_at)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/read/${post.slug}`} target="_blank">
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/editor/${post.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <DeletePostButton postId={post.id} postTitle={post.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center">
                                        <div className="flex flex-col items-center gap-3 text-foreground/40">
                                            <PlusCircle className="h-12 w-12 stroke-[1px]" />
                                            <p className="text-lg font-medium">No posts yet</p>
                                            <p className="text-sm">Create your first story to see it here.</p>
                                        </div>
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
