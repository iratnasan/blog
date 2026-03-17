# 🚀 Deployment & CI/CD

Proses "terbangnya" kode dari komputermu sampai ke internet dilakukan secara otomatis.

---

## 🚢 Vercel (Hosting)

Website utama `iratnasan.my.id` di-host di Vercel dengan custom domain. 
- **Auto-build**: Setiap kali ada perubahan masuk ke branch `main`, Vercel otomatis masak ulang websitenya.
- **Edge Network**: Tulisanmu disimpan di server terdekat dengan pembaca agar loading-nya cepat.

## 🤖 GitHub Actions (Robot Otomatis)

Ada dua robot yang bekerja di balik layar:

1.  **CI (Build & Test)**: Setiap kamu kirim kode ke GitHub, robot ini akan cek apakah kodenya rusak atau tidak. Sekarang sudah pakai **pnpm** dan **Node 24** agar super kencang.
2.  **Supabase Keep-Alive**: Karena Supabase versi gratis bisa "tidur" kalau tidak dipakai selama seminggu, robot ini akan menyapa database setiap 2 hari sekali agar tetap bangun.

## 📝 GitHub Pages (Dokumentasi)

Dokumentasi yang sedang kamu baca ini di-host di GitHub Pages. Dia akan otomatis terupdate setiap kali ada perubahan di folder `docs/`.

## 🔐 Setup Rahasia (GitHub Secrets)

Agar robot bisa bekerja, pastikan kunci-kunci ini ada di **Settings -> Secrets** di GitHub-mu:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `CRON_SECRET`
- `SEED_AUTH_TOKEN`
