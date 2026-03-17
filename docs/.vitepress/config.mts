import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Intan's Journal",
  description: "Dokumentasi Lengkap Owner Guide",
  base: '/blog/', // Sesuaikan dengan nama repo GitHub
  ignoreDeadLinks: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Panduan', link: '/panduan/menulis-post' },
      { text: 'Teknis', link: '/teknis/arsitektur' }
    ],
    sidebar: [
      {
        text: 'Memulai',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
        ]
      },
      {
        text: 'Panduan Owner',
        items: [
          { text: 'Menulis & Publish Post', link: '/panduan/menulis-post' },
          { text: 'Admin Panel Tour', link: '/panduan/admin-panel' },
          { text: 'Mengelola Gambar', link: '/panduan/mengelola-gambar' },
          { text: 'Kustomisasi Profil', link: '/panduan/kustomisasi' },
        ]
      },
      {
        text: 'Detail Teknis',
        items: [
          { text: 'Arsitektur & Flow', link: '/teknis/arsitektur' },
          { text: 'Database & Keamanan', link: '/teknis/database' },
          { text: 'Deployment & CI/CD', link: '/teknis/deployment' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/iratnasan/blog' }
    ],
    footer: {
      message: 'Dibuat dengan ❤️ untuk Intan Ratna.',
      copyright: 'Copyright © 2026-present'
    }
  }
})
