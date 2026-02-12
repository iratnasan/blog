"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, User } from "lucide-react";
import type { Profile } from "@/lib/types";

export default function SettingsPage() {
    const [profile, setProfile] = useState<Partial<Profile>>({
        name: "",
        site_name: "",
        tagline: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();

                if (data) {
                    setProfile(data);
                } else {
                    // Initialize profile if not exists
                    setProfile({
                        id: user.id,
                        name: "Intan",
                        site_name: "Intan's Journal",
                        tagline: "A space for thoughts, poetry, and reflections",
                        bio: "Passionate writer and dreamer.",
                    });
                }
            }
            setLoading(false);
        };

        loadProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const { error } = await supabase
            .from("profiles")
            .upsert({
                id: user.id,
                ...profile,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            alert(`Error: ${error.message}`);
        } else {
            alert("Settings saved successfully!");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-serif font-bold flex items-center gap-3">
                    <User className="h-8 w-8 text-accent" />
                    Site Settings
                </h1>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    Save Changes
                </Button>
            </div>

            <div className="grid gap-8">
                <section className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-muted shadow-sm space-y-6">
                    <h2 className="text-xl font-serif font-semibold border-b border-muted pb-4">Branding</h2>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Site Name</label>
                            <Input
                                value={profile.site_name || ""}
                                onChange={(e) => setProfile({ ...profile, site_name: e.target.value })}
                                placeholder="e.g. Intan's Journal"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Author Name</label>
                            <Input
                                value={profile.name || ""}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tagline</label>
                        <Input
                            value={profile.tagline || ""}
                            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                            placeholder="A brief description of your site"
                        />
                    </div>
                </section>

                <section className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-muted shadow-sm space-y-6">
                    <h2 className="text-xl font-serif font-semibold border-b border-muted pb-4">Author Profile</h2>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Author Bio</label>
                        <Textarea
                            value={profile.bio || ""}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            placeholder="Tell the world about yourself..."
                            rows={4}
                        />
                    </div>

                    {/* Future: Avatar Upload and Social Links */}
                </section>
            </div>
        </div>
    );
}
