"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TiptapEditor } from "@/components/editor/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { use, useRef } from "react";
import { uploadImage } from "@/lib/supabase/storage";
import Image from "next/image";
import { useToast } from "@/components/ui/toast";

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
    const [coverImage, setCoverImage] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { showToast } = useToast();

    const generateSlug = (val: string) => {
        return val
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-")
            .replace(/(^-|-$)/g, "");
    };

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
                setCoverImage(post.cover_image || "");
                setIsPublished(post.is_published);
            }
            setLoading(false);
        };

        loadPost();
    }, [id]);

    const handleSave = async (publish: boolean) => {
        setSaving(true);
        try {
            const supabase = createClient();

            const postData = {
                title,
                slug,
                excerpt,
                content,
                cover_image: coverImage,
                is_published: publish,
                published_at: publish && !isPublished ? new Date().toISOString() : undefined,
            };

            const { error } = await supabase
                .from("posts")
                .update(postData)
                .eq("id", id);

            if (error) {
                showToast(`Error: ${error.message}`, "error");
                setSaving(false);
            } else {
                showToast("Post updated successfully!");
                router.push("/admin/dashboard");
                router.refresh();
                // We keep saving true during redirect to avoid double clicks, 
                // but technically if the redirect is slow, it might be better to reset.
                // However, in success branch we usually want to prevent further edits.
                // Added a safety timeout just in case redirect fails.
                setTimeout(() => setSaving(false), 2000);
            }
        } catch (err) {
            console.error("Save error:", err);
            showToast("An unexpected error occurred", "error");
            setSaving(false);
        }
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const url = await uploadImage(file);
        setUploading(false);

        if (url) {
            setCoverImage(url);
            showToast("Image uploaded successfully!");
        } else {
            showToast("Failed to upload image.", "error");
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
        <div className="min-h-screen max-w-5xl mx-auto px-4 md:px-6 py-12">
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
                        onChange={(e) => {
                            const newTitle = e.target.value;
                            setTitle(newTitle);
                            // Only auto-generate slug if it's currently empty or strictly matches the old title
                            // but for simplicity in blog, we often just want a manual edit or a copy button.
                            // Here we just fix the manual input below.
                        }}
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
                        onChange={(e) => setSlug(generateSlug(e.target.value))}
                        placeholder="post-url-slug"
                    />
                </div>

                <div>
                    <label htmlFor="cover_image" className="block text-sm font-medium mb-2">
                        Cover Image
                    </label>
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                id="cover_image"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                placeholder="Paste image URL or upload..."
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleCoverUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <ImageIcon className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {coverImage && (
                            <div className="relative w-full h-[200px] rounded-lg overflow-hidden border border-muted bg-muted/20">
                                <Image
                                    src={coverImage}
                                    alt="Cover preview"
                                    fill
                                    className="object-cover"
                                />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2"
                                    onClick={() => setCoverImage("")}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
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
