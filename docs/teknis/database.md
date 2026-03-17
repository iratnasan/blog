# 🗄️ Database & Keamanan

Bagian ini menjelaskan bagaimana data dijaga agar tetap aman di Supabase.

---

## 📊 Struktur Tabel

| Tabel | Kegunaan |
| :--- | :--- |
| `posts` | Menyimpan semua artikel, slug, konten, dan status publikasi. |
| `profiles` | Menyimpan data penulis, nama blog, dan pengaturan setting. |

## 🛡️ Row Level Security (RLS)

Keamanan utama kita ada di sini. RLS memastikan:
- **Membaca**: Siapapun bisa baca artikel yang statusnya `is_published = true`.
- **Menulis/Ubah**: Hanya **Esklusif** untuk kamu yang sudah login sebagai admin.
- **Privasi**: Draft artikel tidak akan bocor ke publik sebelum kamu menekan tombol publish.

## 🔒 Hardening Keamanan (Terbaru)

Kami baru saja memperkuat sistem dengan:
- **Search Path Protection**: Mengunci fungsi database agar tidak bisa di-manipulasi oleh pihak luar.
- **HSTS Header**: Memaksa browser selalu pakai HTTPS agar koneksimu terenkripsi.
- **CSP (Content Security Policy)**: Membatasi dari mana gambar dan script boleh dijalankan, mencegah serangan XSS.

> [!IMPORTANT]
> Jangan pernah membagikan **Service Role Key** kepada siapapun. Kunci itu punya "kekuatan penuh" untuk bypass semua keamanan di atas.
