/** @type {import('next').NextConfig} */
const nextConfig = {
          env:{
              MONGODB_URI:"mongodb://localhost:27017"

          },
         webpack: (config) => {
           config.resolve.alias.canvas = false;

           return config;
         },
         reactStrictMode:true
}

module.exports = nextConfig
