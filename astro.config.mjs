// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://zalizniak.com',
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
			// Add an "Edit page" link in each doc footer, pointing at the file
			// in the public repo (PR-based contribution).
			editLink: { baseUrl: 'https://github.com/aillusions/zalizniak.com/edit/main/' },
			components: {
				// Make header social icons open in a new tab.
				SocialIcons: './src/components/SocialIcons.astro',
				// On mobile, show the current page title in the sticky header
				// instead of the site name (which is just noise there).
				SiteTitle: './src/components/SiteTitle.astro',
				// Add click-to-enlarge (lightbox) for diagram images.
				Head: './src/components/Head.astro',
			},
			description:
				'Oleksandr Zalizniak — Product Engineer & Backend Architect building AI-native products, and Applied AI Teardowns: architecture teardowns of applied-AI startups reconstructed from public signals.',
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
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/aillusions/zalizniak.com' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ozalizniak/' },
			],
			// Show a git-based "Last updated" date in the footer of every page;
			// per-page `lastUpdated` frontmatter can pin/override it.
			lastUpdated: true,
			sidebar: [
				{ label: 'Home', link: '/' },
				// Personal study notes for system design interview prep — a
				// general (not AI-specific) reference: the prep method, the
				// in-room delivery framework, and worked question breakdowns.
				{
					label: 'System Design',
					items: [{ autogenerate: { directory: 'system-design' } }],
				},
				// About (the teardowns methodology) first, then one entry per
				// teardown, generated from the files in src/content/docs/teardowns/.
				{
					label: 'Notes',
					items: [{ autogenerate: { directory: 'notes' } }],
				},
				// Cross-company synthesis: the recurring hard problems of applied
				// AI and how teams across the teardowns solve them.
				{
					label: 'Applied AI Playbook',
					items: [{ autogenerate: { directory: 'playbook' } }],
				},
				// Forward-looking companion to the teardowns: industries and
				// workflows where an AI agent could own high-value pain nobody
				// has built for yet — each scored on profit, pain, and whitespace.
				{
					label: 'Opportunities',
					items: [{ autogenerate: { directory: 'opportunities' } }],
				},
				{
					label: 'Teardowns',
					items: [{ autogenerate: { directory: 'teardowns' } }],
				},
			],
		}),
	],
});
