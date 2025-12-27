import jwt from "jsonwebtoken";
import prisma from "../models/prisma.js";

export const requireAuth = async (req, res, next) => {
  try {
    // 1. Read token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission",
      });
    }
    next();
  };
};
