export default () => ({
  port: parseInt(process.env.PORT),
  TMDB: {
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL || '',
  },
});
