// next.config.mjs

// /** @type {import('next').NextConfig} */
// // 2 ภาษา
// import createNextIntlPlugin from "next-intl/plugin";
// const withNextIntl = createNextIntlPlugin("./i18n.ts");

// const nextConfig = {
//   images: {
//     domains: ["courses-online-api.devsriwararak.com"],
//   },
// };

// export default withNextIntl(nextConfig);


// next.config.mjs

import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["courses-online-api.devsriwararak.com", "courses-online.sgp1.cdn.digitaloceanspaces.com"],
  },
};
 
export default withNextIntl(nextConfig);
