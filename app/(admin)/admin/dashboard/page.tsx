import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import type { Post } from "@/lib/types";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen max-w-6xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-serif font-bold">Dashboard</h1>
                <Link href="/admin/editor/new">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-[var(--muted)]">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-[var(--muted)]">
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
                                    <tr key={post.id} className="border-b border-[var(--muted)] last:border-0">
                                        <td className="p-4">
                                            <div className="font-medium">{post.title}</div>
                                            <div className="text-sm text-[var(--foreground)]/60">
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
                                        <td className="p-4 text-sm text-[var(--foreground)]/60">
                                            {formatDate(post.created_at)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/editor/${post.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-[var(--foreground)]/50">
                                        No posts yet. Create your first post!
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
