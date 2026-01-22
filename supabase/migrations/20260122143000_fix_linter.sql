-- Fix: Unindexed foreign keys
-- Linter: matches foreign key 'posts_user_id_fkey'
CREATE INDEX IF NOT EXISTS posts_user_id_idx ON public.posts(user_id);

-- Fix: Multiple Permissive Policies & Auth RLS Initialization Plan
-- Dropping existing policies to replace them with optimized ones
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
DROP POLICY IF EXISTS "Admin can do everything" ON public.posts;

-- Combined SELECT policy to avoid "Multiple Permissive Policies" warning
-- Using (select auth.uid()) to fix "Auth RLS Initialization Plan" warning
CREATE POLICY "view_posts"
ON public.posts
FOR SELECT
USING (
  (is_published = true) OR 
  ((select auth.uid()) = user_id)
);

-- Separate modification policies for Admin
-- "Admin can do everything" previously covered these. 
-- Splitting insures no overlap with the SELECT policy and allows precise control.

CREATE POLICY "admin_insert_posts"
ON public.posts
FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "admin_update_posts"
ON public.posts
FOR UPDATE
USING ((select auth.uid()) = user_id);

CREATE POLICY "admin_delete_posts"
ON public.posts
FOR DELETE
USING ((select auth.uid()) = user_id);
