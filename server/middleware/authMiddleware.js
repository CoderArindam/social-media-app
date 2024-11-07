// import jwt from "jsonwebtoken";

// // Middleware to verify the JWT token from the cookies
// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Invalid token" });
//     }

//     req.user = decoded; // Attach the user data from the token
//     next();
//   });
// };
// Middleware to authenticate and set userId on the request
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Or from headers if sent that way

  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach userId to req
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
