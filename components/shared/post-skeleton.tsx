import { cn } from "@/lib/utils";

export function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-(--muted)/50", className)}
            {...props}
        />
    );
}

export function PostSkeleton() {
    return (
        <div className="space-y-4 py-8 border-b border-muted">
            {/* Title */}
            <Skeleton className="h-8 w-3/4" />

            {/* Excerpt */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Date */}
            <Skeleton className="h-3 w-32" />
        </div>
    );
}
