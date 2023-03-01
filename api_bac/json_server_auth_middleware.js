module.exports = (req, res, next) => {
  req.header("X-API-KEY") === "123456789"
    ? next()
    : res.status(401).json({ message: "Unauthorized Access", error: true });
};
