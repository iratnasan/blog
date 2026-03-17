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

export interface Profile {
    id: string;
    name: string | null;
    site_name: string | null;
    tagline: string | null;
    bio: string | null;
    avatar_url: string | null;
    social_links: Record<string, string>;
    updated_at: string;
}
