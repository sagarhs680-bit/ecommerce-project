import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    console.log("Header token received:", token);

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Not Authorized! Login again.",
      });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", token_decode);

    const expected = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    console.log("Expected value:", expected);

    if (token_decode !== expected) {
      console.log("Mismatch! Token does not equal expected value.");
      return res.status(403).json({
        success: false,
        message: "Not Authorized! Login again.",
      });
    }

    // ✅ If everything matches, allow request to continue
    return next();
  } catch (e) {
    console.log("Error in adminAuth middleware:", e);
    return res.status(403).json({
      success: false,
      message: "Not Authorized! Login again.",
    });
  }
};

export default adminAuth;
