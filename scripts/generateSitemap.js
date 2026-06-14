import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const links = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.8 },
  { url: "/contact", changefreq: "monthly", priority: 0.7 },
];

const stream = new SitemapStream({ hostname: "https://yourwebsite.com" });

links.forEach((link) => stream.write(link));
stream.end();

streamToPromise(stream).then((data) => {
  createWriteStream("./public/sitemap.xml").write(data);
  // console.log("✅ Sitemap generated successfully!");
});
