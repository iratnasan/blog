"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

interface DeletePostButtonProps {
    postId: string;
    postTitle: string;
}

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
            return;
        }

        setIsDeleting(true);
        const supabase = createClient();

        const { error } = await supabase
            .from("posts")
            .delete()
            .eq("id", postId);

        if (error) {
            alert(`Error: ${error.message}`);
            setIsDeleting(false);
        } else {
            router.refresh();
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
