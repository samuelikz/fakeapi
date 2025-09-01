module.exports = function logger(req, res, next) {
    const started = Date.now();
    res.on('finish', () => {
      const ms = Date.now() - started;
      console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
    });
    next();
  };
  