import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PTV Alert",
    short_name: "PTV Alert",
    description: "Keep up to date with the latest activities from inspectors.",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/logo-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/logo-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  }
}