import { notFound } from "next/navigation";
import { createStaticClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { ReadingProgress } from "@/components/shared/reading-progress";
import Image from "next/image";

export const revalidate = 60;

export async function generateStaticParams() {
    const supabase = await createStaticClient();
    const { data: posts } = await supabase
        .from("posts")
        .select("slug")
        .eq("is_published", true);

    return posts?.map((post) => ({ slug: post.slug })) || [];
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const supabase = await createStaticClient();

    const { data: post } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (!post) {
        notFound();
    }

    return (
        <>
            <ReadingProgress />
            <article className="max-w-3xl mx-auto px-6 py-12">
                <header className="mb-12 text-center">
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm text-(--foreground)/60">
                        <time>
                            {post.published_at && formatDate(post.published_at)}
                        </time>
                        <span>•</span>
                        <span>{Math.ceil((post.content?.length || 0) / 1000)} min read</span>
                    </div>

                    <h1 className="text-5xl font-serif font-bold mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {post.cover_image && (
                        <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src={post.cover_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                <div
                    className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-semibold
            prose-p:text-[var(--foreground)] prose-p:leading-relaxed
            prose-a:text-[var(--accent)] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-[var(--accent)]
            prose-blockquote:pl-6 prose-blockquote:italic
            prose-img:rounded-lg prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </>
    );
}
