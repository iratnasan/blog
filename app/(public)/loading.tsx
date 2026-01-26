import { PostSkeleton } from "@/components/shared/post-skeleton";

export default function Loading() {
    return (
        <main className="max-w-4xl mx-auto px-6 py-12">
            <div className="mb-16 text-center animate-pulse">
                {/* Header Skeleton */}
                <div className="h-12 w-64 bg-(--muted)/50 rounded-lg mx-auto mb-4" />
                <div className="h-4 w-96 bg-(--muted)/50 rounded-lg mx-auto" />
            </div>

            <div className="space-y-12">
                {Array.from({ length: 3 }).map((_, i) => (
                    <PostSkeleton key={i} />
                ))}
            </div>
        </main>
    );
}
