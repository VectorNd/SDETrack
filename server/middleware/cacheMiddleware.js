// middlewares/cacheMiddleware.js
const redisClient = require("../redisClient");

const cacheMiddlewareSearch = async (req, res, next) => {
  try {
    let cacheKey = req.originalUrl;

    if (req.method === "POST") {
      cacheKey = `${req.originalUrl}_${JSON.stringify(req.body)}`;
    }

    console.log(cacheKey, "redis :", redisClient)

    const cachedData = await redisClient.get(cacheKey);
    console.log("dataCachedSearch", cachedData);
    if (cachedData) {
      return res
        .status(200)
        .json({ status: "SUCCESS", data: JSON.parse(cachedData) });
    }

    next();
  } catch (error) {
    console.error("Cache middleware error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const cacheMiddlewareHistory = async (req, res, next) => {
  try {
    let cacheKey = req.originalUrl;

    if (req.method === "POST") {
      cacheKey = `${req.originalUrl}_${JSON.stringify(req.body)}`;
    }

    if (req.userId) {
        cacheKey = `${req.originalUrl}_${JSON.stringify(req.body)}_${JSON.stringify(req.userId)}`;
      }

    const cachedData = await redisClient.get(cacheKey);
    console.log("dataCached", cachedData);
    if (cachedData) {
      return res
        .status(200)
        .json({ status: "SUCCESS", data: JSON.parse(cachedData) });
    }

    next();
  } catch (error) {
    console.error("Cache middleware error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { cacheMiddlewareSearch, cacheMiddlewareHistory };
