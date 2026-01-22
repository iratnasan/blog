"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { use } from "react";

export default function EditPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadPost = async () => {
            const supabase = createClient();
            const { data: post } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (post) {
                setTitle(post.title);
                setSlug(post.slug);
                setExcerpt(post.excerpt || "");
                setContent(post.content || "");
                setIsPublished(post.is_published);
            }
            setLoading(false);
        };

        loadPost();
    }, [id]);

    const handleSave = async (publish: boolean) => {
        setSaving(true);
        const supabase = createClient();

        const postData = {
            title,
            slug,
            excerpt,
            content,
            is_published: publish,
            published_at: publish && !isPublished ? new Date().toISOString() : undefined,
        };

        const { error } = await supabase
            .from("posts")
            .update(postData)
            .eq("id", id);

        if (error) {
            alert(`Error: ${error.message}`);
            setSaving(false);
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-5xl mx-auto px-6 py-12">
            <div className="mb-8 flex items-center justify-between">
                <Link href="/admin/dashboard">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleSave(false)}
                        disabled={saving || !title || !slug}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                    </Button>
                    <Button
                        onClick={() => handleSave(true)}
                        disabled={saving || !title || !slug}
                    >
                        {isPublished ? "Update" : "Publish"}
                    </Button>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        Title
                    </label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title..."
                        className="text-2xl font-serif"
                    />
                </div>

                <div>
                    <label htmlFor="slug" className="block text-sm font-medium mb-2">
                        Slug (URL)
                    </label>
                    <Input
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="post-url-slug"
                    />
                </div>

                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                        Excerpt
                    </label>
                    <Textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Brief summary of your post..."
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Content</label>
                    <TiptapEditor content={content} onChange={setContent} />
                </div>
            </div>
        </div>
    );
}
