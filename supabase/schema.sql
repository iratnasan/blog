-- 1. Table untuk menyimpan tulisan
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  content text, -- Isinya HTML dari Tiptap editor
  excerpt text, -- Cuplikan pendek
  cover_image text, -- URL gambar dari Supabase Storage
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) -- Biar cuma admin yg bisa edit
);

-- 2. Storage Bucket (Buat upload foto cover)
insert into storage.buckets (id, name, public) 
values ('images', 'images', true)
on conflict (id) do nothing;

-- 3. Row Level Security (RLS) - PENTING!
alter table posts enable row level security;

-- Policy: Siapapun boleh BACA data yang is_published = true
create policy "Public can view published posts" 
on posts for select 
using (is_published = true);

-- Policy: Cuma user yang login (Intan) yang bisa INSERT/UPDATE/DELETE
create policy "Admin can do everything" 
on posts for all 
using (auth.uid() = user_id);

-- 4. Storage Policies (Supaya bisa upload gambar)
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'images' );

create policy "Auth User Upload"
on storage.objects for insert
with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Auth User Update"
on storage.objects for update
using ( bucket_id = 'images' and auth.role() = 'authenticated' );

create policy "Auth User Delete"
on storage.objects for delete
using ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- 5. Mock Data (Data Dummi)
-- Jalankan ini SETELAH Anda sign up di aplikasi (supaya punya user_id)
-- Atau biarkan user_id NULL jika hanya untuk display awal
INSERT INTO posts (title, slug, excerpt, content, is_published, published_at, user_id)
VALUES 
(
    'The Art of Minimalism', 
    'the-art-of-minimalism', 
    'Exploring why less is often more in design and life.', 
    '<p>Minimalism is not just about having fewer things; it is about making room for more: more time, more peace, and more creativity.</p><blockquote>"Simplicity is the ultimate sophistication." - Leonardo da Vinci</blockquote><p>In a world of noise, silence is a luxury. We strive to create spaces that breathe.</p>', 
    true, 
    NOW(),
    NULL -- Ganti dengan User ID Anda jika ingin bisa diedit!
),
(
    'Morning Coffee Routines', 
    'morning-coffee-routines', 
    'How a simple brew can set the tone for the entire day.', 
    '<p>The aroma of freshly ground beans. The slow pour of hot water. It is a ritual that grounds us before the chaos begins.</p><ul><li>Grind beans</li><li>Heat water to 93°C</li><li>Pour slowly</li><li>Enjoy</li></ul>', 
    true, 
    NOW(),
    NULL
),
(
    'A Letter to My Future Self', 
    'a-letter-to-my-future-self', 
    'Reflections on growth, change, and staying true to oneself.', 
    '<p>Dear Me,</p><p>I hope you are still curious. I hope you still find joy in small rainy days. Remember that growth is not linear.</p>', 
    true, 
    NOW() - interval '1 day',
    NULL
);
