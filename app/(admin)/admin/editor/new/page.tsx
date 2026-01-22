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

export default function NewPostPage() {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    // Auto-generate slug from title
    useEffect(() => {
        if (title) {
            const generatedSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            setSlug(generatedSlug);
        }
    }, [title]);

    const handleSave = async (publish: boolean) => {
        setSaving(true);
        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert("You must be logged in to save posts");
            setSaving(false);
            return;
        }

        const postData = {
            title,
            slug,
            excerpt,
            content,
            is_published: publish,
            published_at: publish ? new Date().toISOString() : null,
            user_id: user.id,
        };

        const { error } = await supabase.from("posts").insert([postData]);

        if (error) {
            alert(`Error: ${error.message}`);
            setSaving(false);
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

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
                        Publish
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
