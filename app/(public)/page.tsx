import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

const POSTS_PER_PAGE = 5;

interface SearchParams {
    page?: string;
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    // Await searchParams as required by Next.js 15+
    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const from = (page - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    const supabase = await createClient();

    // 1. Get Total Count
    const { count } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true);

    // 2. Get Data
    const { data: posts } = await supabase
        .from("posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .range(from, to);

    const totalPages = count ? Math.ceil(count / POSTS_PER_PAGE) : 1;
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <header className="mb-16 text-center">
                <h1 className="text-5xl font-serif font-bold mb-4">
                    Welcome to My Journal
                </h1>
                <p className="text-lg text-(--foreground)/70">
                    A space for thoughts, poetry, and reflections
                </p>
            </header>

            <div className="space-y-12">
                {posts && posts.length > 0 ? (
                    posts.map((post: Post) => (
                        <article
                            key={post.id}
                            className="border-b border-muted pb-8 last:border-0"
                        >
                            <Link href={`/read/${post.slug}`} className="group block">
                                {post.cover_image && (
                                    <div className="relative w-full h-[300px] mb-6 rounded-lg overflow-hidden bg-muted">
                                        <img
                                            src={post.cover_image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                )}
                                <h2 className="text-3xl font-serif font-semibold mb-3 group-hover:text-accent transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-(--foreground)/70 mb-3 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <time className="text-sm text-(--foreground)/50">
                                    {post.published_at && formatDate(post.published_at)}
                                </time>
                            </Link>
                        </article>
                    ))
                ) : (
                    <div className="text-center py-12 text-(--foreground)/50">
                        <p>No posts found on this page.</p>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {(hasPrev || hasNext) && (
                <div className="flex justify-center gap-4 mt-16 pt-8 border-t border-muted">
                    {hasPrev && (
                        <Link
                            href={`/?page=${page - 1}`}
                            className="px-4 py-2 border border-muted rounded hover:bg-(--muted)/50 transition-colors text-sm"
                        >
                            ← Previous
                        </Link>
                    )}
                    <span className="px-4 py-2 text-sm text-(--foreground)/50">
                        Page {page} of {totalPages}
                    </span>
                    {hasNext && (
                        <Link
                            href={`/?page=${page + 1}`}
                            className="px-4 py-2 border border-muted rounded hover:bg-(--muted)/50 transition-colors text-sm"
                        >
                            Next →
                        </Link>
                    )}
                </div>
            )}
        </main>
    );
}
