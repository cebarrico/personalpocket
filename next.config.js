/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Configurações para imagens
    domains: [],
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [],
  },
  // Resolver problemas com props não reconhecidos
  compiler: {
    // Suprimir avisos de propriedades desconhecidas
    reactRemoveProperties: { properties: ["^fetchPriority$"] },
  },
};

module.exports = nextConfig;
