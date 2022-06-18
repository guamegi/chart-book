const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  // 주식 종목 시세 호출
  app.use(
    createProxyMiddleware("/api", {
      target: "https://polling.finance.naver.com",
      changeOrigin: true,
    })
  );

  // kospi 데이터 갯수 부족. 아래로 대체.
  app.use(
    createProxyMiddleware("/chart", {
      target: "https://api.stock.naver.com",
      changeOrigin: true,
    })
  );

  // kospi 시세 호출
  app.use(
    createProxyMiddleware("/siseJson.naver", {
      target: "https://api.finance.naver.com",
      changeOrigin: true,
    })
  );
};
