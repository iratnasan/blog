import { createClient } from "./client";

export async function uploadImage(file: File): Promise<string | null> {
    try {
        const supabase = createClient();

        // Create a unique file name
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `posts/${fileName}`;

        // Upload to 'images' bucket
        const { error, data } = await supabase.storage
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
