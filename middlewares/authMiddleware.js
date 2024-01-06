import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "auth failed",
          success: false,
        });
      } else {
        
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    res.status(400).send({
      message: "error in middleware",
    });
  }
};
