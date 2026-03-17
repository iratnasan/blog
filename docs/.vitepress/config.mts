import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: "Intan's Journal",
    description: "Panduan lengkap untuk mengelola sudut kecilmu di internet.",
    base: '/blog/',
    ignoreDeadLinks: true,
    head: [
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
      ['meta', { name: 'theme-color', content: '#1e1e2e' }],
    ],
    themeConfig: {
      siteTitle: "📖 Intan's Journal",
      nav: [
        { text: '🏠 Home', link: '/' },
        { text: '📝 Panduan', link: '/panduan/menulis-post' },
        { text: '⚙️ Teknis', link: '/teknis/arsitektur' },
        { text: '🌐 Website', link: 'https://iratnasan.my.id/' }
      ],
      sidebar: [
        {
          text: '🚀 Memulai',
          items: [
            { text: 'Getting Started', link: '/getting-started' },
          ]
        },
        {
          text: '📝 Panduan Owner',
          items: [
            { text: 'Menulis & Publish Post', link: '/panduan/menulis-post' },
            { text: 'Admin Panel Tour', link: '/panduan/admin-panel' },
            { text: 'Mengelola Gambar', link: '/panduan/mengelola-gambar' },
            { text: 'Kustomisasi Profil', link: '/panduan/kustomisasi' },
          ]
        },
        {
          text: '⚙️ Detail Teknis',
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
        message: 'Dirangkai dengan logika dan rasa oleh <a href="https://rizkiye.anartha.com" target="_blank" rel="noopener">rizkiye</a>',
        copyright: `© ${new Date().getFullYear()} Intan's Journal`
      },
      search: {
        provider: 'local'
      },
      outline: {
        level: [2, 3],
        label: 'Di Halaman Ini'
      },
      docFooter: {
        prev: '← Sebelumnya',
        next: 'Selanjutnya →'
      },
      lastUpdated: {
        text: 'Terakhir diperbarui'
      },
      returnToTopLabel: 'Kembali ke atas',
    },
    lastUpdated: true,
  })
)
