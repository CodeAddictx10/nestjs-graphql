export default () => ({
  port: parseInt(process.env.PORT!, 10) || 4444,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
  },
});
