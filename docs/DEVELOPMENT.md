# 💻 Panduan Pengembangan Lokal

[![Development](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](docs/DEVELOPMENT.md)
[![Environment](https://img.shields.io/badge/Environment-Node.js_20+-blue?style=for-the-badge)](https://nodejs.org/)

Selamat datang di dapur pengembangan **Intan's Journal**! 🍳 Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan di mesin lokal Anda.

---

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstal tools berikut:

- **Node.js**: Versi 20 atau yang lebih baru.
- **Git**: Untuk manajemen versi.
- **Supabase CLI**: (Opsional) Sangat direkomendasikan untuk manajemen database lokal. [Instalasi CLI](https://supabase.com/docs/guides/cli/getting-started).

## ⚙️ Konfigurasi Environment

1.  **Inisialisasi File Env**:
    Duplikat file contoh `.env.local.example` menjadi `.env.local`.
    ```bash
    cp .env.local.example .env.local
    ```

2.  **Konfigurasi Variabel**:
    Buka file `.env.local` dan lengkapi kredensial berikut dari Dashboard Supabase Anda:
    - `NEXT_PUBLIC_SUPABASE_URL`: API Endpoint proyek Anda.
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Kunci publik untuk akses klien.
    - `SECRET_SUPABASE_KEY`: (Hanya untuk server-side) Kunci layanan admin.

## 🏃‍♂️ Menjalankan Aplikasi

Ikuti alur standar untuk menjalankan proyek:

```bash
# 1. Instalasi dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev
```

Aplikasi Anda sekarang dapat diakses di [http://localhost:3000](http://localhost:3000) 🚀.

## 🗄️ Manajemen Database

Proyek ini menggunakan migrasi Supabase untuk menjaga konsistensi skema database.

- **Membuat Migrasi Baru**:
  ```bash
  supabase migration new deskripsi_perubahan
  ```
- **Mendorong Perubahan ke Remote**:
  ```bash
  supabase db push
  ```

> [!CAUTION]
> Jangan pernah menjalankan perintah `db push --force` pada lingkungan production kecuali jika Anda sangat yakin.

## 🧪 Kontrol Kualitas

Selalu jalankan pemeriksaan ini sebelum melakukan commit untuk menjaga kualitas kode:

| Perintah | Fungsi |
| :--- | :--- |
| `npm run lint` | Memeriksa gaya dan potensi error kode (ESLint). |
| `npm run build` | Memastikan aplikasi dapat dikompilasi dengan sukses. |
| `npm run type-check` | Memverifikasi konsistensi tipe TypeScript. |

---

<div align="center">

Happy Hacking! ✨

</div>
