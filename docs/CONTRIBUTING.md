# 🤝 Panduan Kontribusi

Terima kasih atas minat Anda untuk berkontribusi pada **Intan Blog**! 🎉 Dokumen ini akan memandu Anda melalui proses kontribusi agar berjalan lancar dan efektif.

## 🚀 Memulai

1.  **Fork Repository**: Klik tombol 'Fork' di pojok kanan atas halaman repository ini.
2.  **Clone Repository**:
    ```bash
    git clone https://github.com/username-anda/blog.git
    cd blog/my-blog
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```

## 🛠️ Pengembangan

Kamic menggunakan **Next.js** dan **Supabase**. Pastikan Anda telah membaca `docs/DEVELOPMENT.md` untuk setup environment lokal Anda.

### Branching Strategy
*   `main`: Branch utama yang stabil (Production).
*   `develop`: Branch pengembangan (jika ada).
*   `feature/nama-fitur`: Untuk fitur baru.
*   `fix/nama-bug`: Untuk perbaikan bug.

### Standar Kode
*   Gunakan **TypeScript** dengan tipe yang jelas.
*   Pastikan tidak ada error linting: `npm run lint`.
*   Tulis kode yang bersih dan mudah dibaca (Clean Code).

## 📝 Commit Message

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

*   `feat: tambahkan fitur dark mode`
*   `fix: perbaiki typo di navbar`
*   `docs: update panduan setup`
*   `style: format ulang css`
*   `refactor: optimasi fungsi login`

## 📮 Mengirim Pull Request (PR)

1.  Push branch Anda ke fork Anda.
2.  Buka Pull Request ke branch `main` dari repository asli.
3.  Jelaskan apa yang Anda ubah dan mengapa.
4.  Tunggu review dari tim kami! ☕

---
> [!NOTE]
> Kami menghargai setiap kontribusi, sekecil apapun itu! Jangan ragu untuk membuka Issue jika Anda menemukan masalah.
