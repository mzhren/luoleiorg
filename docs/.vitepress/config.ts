import { defineConfig, HeadConfig } from "vitepress";
import { RssPlugin, RSSOptions } from "vitepress-plugin-rss";
import { rss } from "./genFeed";
import svgLoader from "vite-svg-loader";
import markdownImagePlugin from "./markdownPlugin";

const RSS: RSSOptions = {
  title: "视频工具箱 - 为视频工作者和Vlog UP主精选的专业工具集",
  baseUrl: `https://v.i8k.tv`,
  copyright: "Copyright (c) 视频工具箱",
  filename: "rss.xml",
};

export default defineConfig({
  title: "视频工具箱",
  description: "涵盖前期策划、拍摄录制、剪辑后期、素材资源、发布运营等视频创作全流程的工具导航网站，帮助视频创作者提升效率",
  cleanUrls: true,
  appearance: false,
  ignoreDeadLinks: true,
  base: "/",
  buildEnd: async (config) => {
    await rss(config);
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(markdownImagePlugin);
    },
  },
  vite: {
    plugins: [svgLoader()],
  },
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "视频工具,剪辑软件,视频创作,Vlog,UP主,视频制作,视频编辑",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content:
          "涵盖前期策划、拍摄录制、剪辑后期、素材资源、发布运营等视频创作全流程的工具导航网站，帮助视频创作者提升效率",
      },
    ],
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-TG5VK8GPSG",
      },
    ],
    [
      "script",
      {},
      "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TG5VK8GPSG');",
    ],
  ],
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];
    const title = pageData?.frontmatter?.title || "视频创作工具导航 - 为视频工作者和Vlog UP主精选的专业工具集";
    const description = pageData?.frontmatter?.description || "涵盖前期策划、拍摄录制、剪辑后期、素材资源、发布运营等视频创作全流程的工具导航网站，帮助视频创作者提升效率";
    const cover = pageData?.frontmatter?.cover || "/logo.png";

    head.push(["meta", { property: "og:title", content: title }]);
    head.push(["meta", { property: "og:description", content: description }]);
    head.push(["meta", { property: "og:image", content: cover }]);

    return head;
  },
  themeConfig: {
    logo: "./logo.png",
    nav: [
      { text: "ZUOLUOTV™", link: "https://zuoluo.tv/youtube" },
      {
        text: "视频",
        items: [
          { text: "YouTube", link: "https://zuoluo.tv/youtube" },
          { text: "哔哩哔哩", link: "https://zuoluo.tv/bilibili" },
        ],
      },
      { text: "RSS", link: "https://v.i8k.tv/rss" },
      { text: "关于", link: "https://github.com/foru17" },
    ],
    socialLinks: [
      { icon: "twitter", link: "https://zuoluo.tv/twitter" },
      { icon: "github", link: "https://github.com/foru17" },
    ],

    outlineTitle: "本文导览",
    lastUpdatedText: "最后更新时间",
    footer: {
      message: `Powered By <a href="https://zuoluo.tv/vitepress">VitePress</a>`,
      copyright: `Copyright 2025 | <a href="https://v.i8k.tv/">LUOLEI.ORG</a><br/>
      <a href="http://beian.miit.gov.cn/" target="_blank" rel="nofollow" class="d-none d-lg-inline-block">粤ICP备14004235号</a>
      `,
    },
  },
});
