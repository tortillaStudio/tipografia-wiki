// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://tipografia.wiki",
  output: "static",
  integrations: [
    starlight({
      title: "Tipografia.wiki",
      defaultLocale: "root",
      locales: {
        root: {
          label: "Español",
          lang: "es",
        },
      },
      editLink: {
        baseUrl: "https://github.com/tortillaStudio/tipografia-wiki/edit/main/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/tortillaStudio/tipografia-wiki",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "Robofont",
          autogenerate: { directory: "robofont" },
        },
      ],
    }),
  ],
});
