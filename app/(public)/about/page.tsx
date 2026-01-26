export default function AboutPage() {
    return (
        <main className="max-w-3xl mx-auto px-6 py-12">
            <article className="prose prose-lg max-w-none">
                <h1 className="text-5xl font-serif font-bold mb-8 text-center">
                    About
                </h1>

                <div className="space-y-6 text-(--foreground)/80 leading-relaxed">
                    <p>
                        Welcome to my personal journal—a quiet corner of the internet where
                        I share my thoughts, poetry, and reflections on life.
                    </p>

                    <p>
                        This space is dedicated to the art of writing and the beauty of
                        words. Here, you&apos;ll find pieces that explore the depths of human
                        experience, from the mundane to the profound.
                    </p>

                    <p>
                        Thank you for taking the time to read. I hope these words resonate
                        with you in some way.
                    </p>

                    <p className="text-right italic mt-12">— Intan Ratna</p>
                </div>
            </article>
        </main>
    );
}
