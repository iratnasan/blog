import { createClient } from "./client";

export async function uploadImage(file: File): Promise<string | null> {
    try {
        const supabase = createClient();

        // Validate file size (5MB limit)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            console.error('File is too large. Maximum size is 5MB.');
            return null;
        }

        // Validate file extension
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        
        if (!fileExt || !allowedExtensions.includes(fileExt)) {
            console.error('Invalid file type. Allowed types:', allowedExtensions.join(', '));
            return null;
        }

        // Validate MIME type
        if (!file.type.startsWith('image/')) {
            console.error('Invalid MIME type. Only images are allowed.');
            return null;
        }

        // Generate sanitized random filename
        const randomStr = Math.random().toString(36).substring(2, 15);
        const fileName = `${randomStr}_${Date.now()}.${fileExt}`.replace(/[^a-zA-Z0-9._-]/g, '');
        const filePath = `posts/${fileName}`;

        // Upload to 'images' bucket
        const { error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Error uploading image:', error.message);
            return null;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Unexpected error during upload:', error);
        return null;
    }
}
