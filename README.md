<div align="center">

# ✨ Intan's Journal

[![Next.js 15](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

**Sebuah blog modern, estetik, dan performa tinggi yang dibangun untuk mengekspresikan pikiran, puisi, dan refleksi.**

[🌐 Kunjungi Website](https://iratnasan.vercel.app/) • [📝 Panduan Development](docs/DEVELOPMENT.md) • [🚀 Pipeline CI/CD](docs/CICD_SETUP.md)

</div>

## 📸 Preview

![Banner](https://images.unsplash.com/photo-1499750310159-52f0f913202c?q=80&w=3540&auto=format&fit=crop)
*Tampilan bersih dengan tipografi serif yang elegan dan transisi yang halus.*

## 🌟 Fitur Unggulan

- **⚡ Performa Next.js 15/16**: Kecepatan memuat halaman yang luar biasa dengan Server Components dan Static Generation.
- **🎨 Multi-Theme Support**: Berpindah antara mode **Light**, **Dark**, dan **Sepia** untuk pengalaman membaca yang nyaman.
- **🖼️ Dynamic OG Images**: Setiap artikel secara otomatis menghasilkan gambar preview media sosial yang cantik dengan judul dan tanggal.
- **🔐 Keamanan Tingkat Tinggi**: Autentikasi Supabase dengan Row Level Security (RLS) dan headers keamanan yang ketat.
- **�️ Admin Dashboard**: Kelola konten secara efisien dengan editor kaya fitur (Tiptap/Rich Text).
- **🤖 WhatsApp Bot Integration**: Terhubung langsung dengan pembaca melalui bot notifikasi.

## 🛠️ Stack Teknologi

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, Storage)
- **Deployment**: [Vercel](https://vercel.app/), [GitHub Actions](https://github.com/features/actions)
- **Integrasi**: [Baileys](https://github.com/WhiskeySockets/Baileys) (WA Bot)

## 🚀 Memulai Cepat

```bash
# Clone repositori
git clone https://github.com/iratnasan/my-blog.git

# Masuk ke direktori
cd my-blog

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
```

> [!TIP]
> Pastikan Anda telah mengonfigurasi variabel lingkungan di `.env.local` sebelum menjalankan proyek. Lihat [Panduan Development](docs/DEVELOPMENT.md) untuk detailnya.

## � Struktur Proyek

```text
├── app/              # Next.js App Router (Public, Admin, API)
├── components/       # UI Components (Shared, Shell, Editors)
├── lib/              # Utilitas, Supabase Clients, dan Types
├── public/           # Aset statis dan meta-files
├── scripts/          # Automatization scripts (Keep-alive)
└── wa-bot/           # Integrasi WhatsApp Bot
```

---

<div align="center">

Dibuat dengan ❤️ oleh [Intan Ratna](https://github.com/iratnasan)

</div>
