import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const vitePWA = VitePWA(
	{
		registerType: 'autoUpdate',
		outDir: 'build',
		manifest: {
			name: 'Habit tracker',
			short_name: 'HabitTracker',
			description: 'StreveSuksess habit tracker',
			theme_color: '#ffffff',
			icons: [
				{
					src: 'favicon/android-chrome-192x192.png',
					sizes: '192x192',
					type: 'image/png'
				},
				{
					src: 'favicon/android-chrome-512x512.png',
					sizes: '512x512',
					type: 'image/png'

				}]
		}
	}
)
export default defineConfig({
	base: '/HabitTracker',
	plugins: [
		react(),
		vitePWA
	]
})
