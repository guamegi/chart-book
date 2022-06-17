const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://polling.finance.naver.com",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/chart", {
      target: "https://api.stock.naver.com",
      changeOrigin: true,
    })
  );
};
