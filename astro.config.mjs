// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://zalizniak.com',
	integrations: [
		starlight({
			title: 'Oleksandr Zalizniak',
			description:
				'Oleksandr Zalizniak — Product Engineer & Backend Architect building AI-native products, and Applied AI Teardowns: architecture teardowns of applied-AI startups reconstructed from public signals.',
			favicon: '/favicon.ico',
			head: [
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' } },
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/aillusions?tab=repositories' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/ozalizniak/' },
			],
			// Show a git-based "Last updated" date in the footer of every page;
			// per-page `lastUpdated` frontmatter can pin/override it.
			lastUpdated: true,
			sidebar: [
				{ label: 'Home', link: '/' },
				// One entry per teardown, generated from the files in src/content/docs/teardowns/.
				{ label: 'Teardowns', items: [{ autogenerate: { directory: 'teardowns' } }] },
				{ label: 'About', items: [{ label: 'About', slug: 'about' }] },
			],
		}),
	],
});
