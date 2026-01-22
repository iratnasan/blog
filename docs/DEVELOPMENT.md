# 💻 Panduan Pengembangan Lokal

Selamat datang di dapur pengembangan **Intan Blog**! 🍳 Ikuti langkah-langkah ini untuk menjalankan proyek di mesin lokal Anda.

## 📋 Prasyarat

Pastikan Anda memiliki tools berikut:
*   [Node.js](https://nodejs.org/) (v20 atau lebih baru)
*   [Git](https://git-scm.com/)
*   [Supabase CLI](https://supabase.com/docs/guides/cli) (Opsional, tapi disarankan)

## ⚙️ Setup Environment

1.  **Duplikat file env**:
    Salin file contoh `.env.local.example` menjadi `.env.local`.
    ```bash
    cp .env.local.example .env.local
    ```

2.  **Isi Variabel**:
    Buka `.env.local` dan isi kunci yang diperlukan:
    *   `NEXT_PUBLIC_SUPABASE_URL`: URL proyek Supabase Anda.
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Kunci publik (anon) Supabase Anda.

## 🏃‍♂️ Menjalankan Aplikasi

1.  **Install Paket**:
    ```bash
    npm install
    ```

2.  **Jalankan Server Dev**:
    ```bash
    npm run dev
    ```

3.  **Buka Browser**:
    Kunjungi [http://localhost:3000](http://localhost:3000).

## 🗄️ Database & Migrations

Jika Anda mengubah skema database:

1.  Buat migrasi baru (jika menggunakan CLI):
    ```bash
    supabase migration new nama_perubahan
    ```
2.  Edit file SQL yang terbentuk di `supabase/migrations`.
3.  Apply ke remote (hati-hati untuk production!):
    ```bash
    supabase db push
    ```

## 🧪 Testing

Sebelum commit, pastikan semuanya hijau:

```bash
npm run lint  # Cek kode style
npm run build # Cek apakah bisa di-build
```

Happy Hacking! 🚀
