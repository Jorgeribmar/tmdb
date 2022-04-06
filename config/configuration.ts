export default () => ({
  port: parseInt(process.env.PORT),
  api_key: process.env.API_KEY,
  base_url: process.env.BASE_URL,
});
