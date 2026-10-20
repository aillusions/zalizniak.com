// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://zalizniak.com',
	redirects: {
		// The content used to live under /archive/; keep the old URLs working.
		'/archive/[...slug]': '/[...slug]',
	},
	markdown: {
		// Open every off-site link in a new tab; rel guards against tabnabbing.
		rehypePlugins: [
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	integrations: [
		starlight({
			title: 'Oleksandr Zalizniak',
			// Site-wide CSS tweaks (smaller in-content headings, etc.).
			customCss: ['./src/styles/custom.css'],
			components: {
				// Make header social icons open in a new tab.
				SocialIcons: './src/components/SocialIcons.astro',
				// On mobile, show the current page title in the sticky header
				// instead of the site name (which is just noise there).
				SiteTitle: './src/components/SiteTitle.astro',
				// Add click-to-enlarge (lightbox) for diagram images.
				Head: './src/components/Head.astro',
				// Start first-time visitors on the light theme instead of the system one.
				ThemeProvider: './src/components/ThemeProvider.astro',
				// A single sun/moon toggle instead of the Dark/Light/Auto dropdown.
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			description:
				'Oleksandr Zalizniak. Founder & Systems Engineer. Twenty years building backend systems at scale. Now building the tools that make them reliable.',
			favicon: '/favicon.ico',
			head: [
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' } },
				// Google Tag Manager — injected as high in <head> as Starlight allows.
				{
					tag: 'script',
					content:
						"(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':" +
						"new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0]," +
						"j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=" +
						"'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);" +
						"})(window,document,'script','dataLayer','GTM-TPLZX8VZ');",
				},
			],
			social: [
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ozalizniak/' },
			],
			// Show a git-based "Last updated" date in the footer of every page;
			// per-page `lastUpdated` frontmatter can pin/override it.
			lastUpdated: true,
			// No right-hand "On this page" table of contents on any page.
			tableOfContents: false,
			// No site search: hides the header search bar and skips the Pagefind index.
			pagefind: false,
			sidebar: [
				{ label: 'Home', link: '/' },
				// The products I build, newest/most active first. External brand
				// sites, so these are plain links rather than pages in this repo.
				{
					label: 'What I Build',
					items: [
						{ label: 'Signus.ai', link: 'https://signus.ai/', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
