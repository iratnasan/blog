# 🖼️ Mengelola Gambar

Gambar adalah elemen penting untuk mempercantik ceritamu. Berikut aturan mainnya.

---

## 📸 Tipe Gambar

1.  **Cover Image**: Gambar utama yang muncul di bagian atas artikel dan jadi preview saat dibagikan ke media sosial.
2.  **Inline Image**: Gambar pendukung yang dimasukkan di tengah-tengah tulisan lewat editor.

## 📏 Batasan & Validasi (Keamanan)

Untuk menjaga performa dan keamanan website, sistem akan mengecek:
- **Ukuran**: Maksimal **5MB** per gambar. Jika lebih besar, sistem akan menolak otomatis untuk menjaga kuota storage.
- **Format**: Hanya file gambar asli (`.jpg`, `.png`, `.webp`, `.gif`, `.svg`).
- **MIME Check**: Sistem tidak cuma cek nama file, tapi beneran cek "identitas" file tersebut biar aman dari virus.

## 📁 Penyimpanan (Supabase Storage)

Semua gambar disimpan di folder `posts/` di dalam *bucket* `images` di Supabase. Nama file akan di-acak otomatis (sanitize) untuk menghindari tabrakan nama file jika kamu upload gambar dengan nama yang sama.

> [!NOTE]
> Menghapus artikel **tidak otomatis** menghapus gambarnya di storage (untuk alasan integritas data). Jika ingin bersih-bersih gambar lama, bisa dilakukan lewat Dashboard Supabase langsung.
