# 🚀 Getting Started

Selamat datang di dapur pengembangan **Intan's Journal**! Dokumen ini membantumu menyiapkan lingkungan kerja kalau kamu ingin melakukan perubahan besar atau tes fitur baru di komputermu sendiri.

---

## 📋 Persiapan Awal

Pastikan alat-alat ini sudah terpasang:
- **Node.js**: Gunakan versi terbaru (rekomendasi: v24).
- **pnpm**: Manager paket yang lebih cepat dan efisien.
- **Git**: Untuk menyimpan riwayat perubahan.

## ⚙️ Menyiapkan Kunci (Environment)

1.  Cari file bernama `.env.local.example` di folder utama.
2.  Duplikat dan ganti namanya menjadi `.env.local`.
3.  Isi kunci-kunci berikut yang bisa diambil dari dashboard **Supabase**:
    - `NEXT_PUBLIC_SUPABASE_URL`: Alamat rumah databasemu.
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Kunci akses publik.
    - `SECRET_SUPABASE_KEY`: Kunci admin (jangan dibagikan!).

## 🏃‍♂️ Menjalankan Proyek

Buka terminal di folder proyek, lalu jalankan:

```bash
# 1. Pasang semua bahan (dependensi)
pnpm install

# 2. Jalankan server lokal
pnpm dev
```

Sekarang, buka [http://localhost:3000](http://localhost:3000) di browser. Selesai! ✨

## 🧪 Pemeriksaan Kualitas

Sebelum simpan perubahan (commit), baiknya cek dulu:
- `pnpm lint`: Cek apakah ada penulisan yang salah.
- `pnpm build`: Pastikan semuanya bisa "dimasak" jadi website utuh tanpa error.
