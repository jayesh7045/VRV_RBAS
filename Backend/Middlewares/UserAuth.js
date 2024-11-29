export const authorize = (roles = []) => {
    // Convert roles to an array if it's a single role
    if (typeof roles === "string") roles = [roles];
  
    return (req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
  
      if (!token) return res.status(401).json({ message: "Unauthorized" });
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
  
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: "Forbidden" });
        }
  
        next();
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    };
  };
  