import { createStaticClient } from "./server";
import type { Profile } from "@/lib/types";

export async function getProfile(): Promise<Partial<Profile> | null> {
    try {
        const supabase = await createStaticClient();
        const { data } = await supabase
            .from("profiles")
            .select("*")
            .limit(1)
            .single();

        return data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}
