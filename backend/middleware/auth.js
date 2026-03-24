const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }
     try{
    req.admin = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  }catch {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
}

module.exports = adminAuth;
