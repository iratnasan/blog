import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-4xl font-serif font-bold italic mb-6">"Dia Tidak Ditemukan"</h1>
            <p className="text-(--foreground)/60 max-w-md mx-auto mb-10 leading-relaxed">
                Maaf, dia yang Anda cari mungkin telah dihapus, dipindahkan, atau tidak pernah ada.
            </p>
            <Link
                href="/"
                className="text-sm font-medium border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
            >
                Kembali ke Beranda
            </Link>
        </div>
    );
}
