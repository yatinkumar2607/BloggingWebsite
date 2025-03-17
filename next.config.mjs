/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    // If you need to handle images in static export
    images: {
      unoptimized: true,
    },
    experimental: {
      webpackBuildWorker: true,
      parallelServerBuildTraces: true,
      parallelServerCompiles: true,
    },
  };
  
  export default nextConfig;
  
  