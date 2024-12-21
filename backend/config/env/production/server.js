// path: /config/env/production/server.js
module.exports = ({ env }) => ({
    proxy: true,
    // NOTE: Make sure APP_URL is just the domain, like "https://bosca-9sijs.ondigitalocean.app"
    // Then we append '/bosca-landingpage-backend' so Strapi knows its real subpath
    url: env('APP_URL') + '/bosca-landingpage-backend',
    app: {
      keys: env.array('APP_KEYS'),
    },
  });
  