export interface Post {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover_image: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    user_id: string;
}
