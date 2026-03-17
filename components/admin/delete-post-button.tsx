"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

import { useToast } from "@/components/ui/toast";

interface DeletePostButtonProps {
    postId: string;
    postTitle: string;
}

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const supabase = createClient();

            const { error, data } = await supabase
                .from("posts")
                .update({ deleted_at: new Date().toISOString() })
                .eq("id", postId)
                .select("id");

            if (error) {
                showToast(`Error: ${error.message}`, "error");
                setIsDeleting(false);
            } else if (!data || data.length === 0) {
                showToast("Failed to delete: you may not have permission", "error");
                setIsDeleting(false);
            } else {
                showToast("Post deleted successfully!");
                setTimeout(() => {
                    router.refresh();
                    setIsDeleting(false);
                }, 500);
            }
        } catch (err) {
            console.error("Delete error:", err);
            showToast("An unexpected error occurred", "error");
            setIsDeleting(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="hover:bg-red-50 dark:hover:bg-red-950/30"
        >
            {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-600" />
            ) : (
                <Trash2 className="h-4 w-4 text-red-600" />
            )}
        </Button>
    );
}
