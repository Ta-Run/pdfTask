/** @type {import('next').NextConfig} */
const nextConfig = {
          env:{
              MONGODB_URI:"mongodb://127.0.0.1:27017"

          },
         webpack: (config) => {
           config.resolve.alias.canvas = false;

           return config;
         },
         reactStrictMode:true
}

module.exports = nextConfig
