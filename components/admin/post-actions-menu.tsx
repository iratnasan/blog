"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MoreVertical, Eye, Edit, Trash2, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast";

interface PostActionsMenuProps {
  postId: string;
  postTitle: string;
  postSlug: string;
}

export function PostActionsMenu({ postId, postTitle, postSlug }: PostActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm(`Are you sure you want to delete "${postTitle}"? This action cannot be undone.`)) {
      setIsOpen(false);
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
        setIsOpen(false);
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
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-muted rounded-full transition-all duration-200 active:scale-90"
        aria-label="Actions"
      >
        <MoreVertical className="h-5 w-5 text-foreground/60" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-card border border-muted rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="py-1">
              <Link
                href={`/read/${postSlug}`}
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Eye className="h-4 w-4 text-sky-500" />
                <span>View Post</span>
              </Link>
              <Link
                href={`/admin/editor/${postId}`}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Edit className="h-4 w-4 text-emerald-500" />
                <span>Edit Post</span>
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-3 px-4 py-3 text-sm w-full text-left hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                <span>{isDeleting ? "Deleting..." : "Delete Post"}</span>
              </button>
            </div>
            <div className="border-t border-muted px-4 py-2 sm:hidden">
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-foreground/40 hover:text-foreground transition-colors"
              >
                <X className="h-3 w-3" />
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
