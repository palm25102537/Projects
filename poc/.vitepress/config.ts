import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    sidebar: [{ text: "TEST", link: "/" }],
  },

  markdown: {
    theme: { light: "material-theme-ocean", dark: "one-dark-pro" },
    anchor: {
      slugify(str) {
        return encodeURIComponent(str);
      },
    },
    attrs: {
      disable: false,
      allowedAttributes: [],
    },
    headers: {
      format(str) {
        console.log(str);
        return "#" + str;
      },
    },
  },
});
// src: string;
// env: any;
// tokens: Token[];
// inlineMode: boolean;
