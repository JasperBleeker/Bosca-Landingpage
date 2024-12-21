// path: /config/env/production/server.js
module.exports = ({ env }) => ({
    proxy: true,
    url: env('APP_URL') + '/api', // Sets the public URL of the application.
    app: { 
      keys: env.array('APP_KEYS')
    },
});