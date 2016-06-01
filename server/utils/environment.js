'use strict';

const env = process.env.NODE_ENV || 'development';
const hasSSREnabled = (process.env.SSR || process.argv[2] === 'ssr') || false;

export default {
  name: env,
  isProduction: env === 'production',
  isDevelopment: env === 'development',
  ssrEnabled: hasSSREnabled
};
