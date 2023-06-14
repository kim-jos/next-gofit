/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "fqblipxxlrrcngcnqcoy.supabase.co",
      "search.pstatic.net",
      "ldb-phinf.pstatic.net",
      "pup-review-phinf.pstatic.net",
    ],
  },
};

module.exports = nextConfig;
