module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '17kG2Hr7mgSxaRKfvzXJ2g=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', '17kG2Hr7mgSxaRKfvzXJ2g=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
