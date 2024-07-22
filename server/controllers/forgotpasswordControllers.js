const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
// const host = "http://localhost:5000";
const host = "https://lnm-q-v1-3.onrender.com";

const forgot = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, msg: "User not exist" });
    }
    const secret = process.env.SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });
    const link = `${host}/api/password/reset/${user._id}/${token}`;
    const msg = `
        <html>
          <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <p>Dear ${user.username},</p>
              <p>We received a request to reset your password for your account. Please use the link below to reset your password:</p>
              <p><strong>Link:</strong> <span style="font-weight: bold; color: #007bff;">${link}</span></p>
              <p><strong>Note:</strong> This link will expire in 5 minutes.</p>
              <p>If you did not request a password reset, please ignore this email. If you have any concerns, please contact our support team immediately.</p>
              <p>Thanks,</p>
              <p>The LNMQ Development Team</p>
            </div>
          </body>
        </html>`;
    // console.log(link);
    await sendEmail(email, "Password Reset Request", msg);
    return res.json({ status: true });
  } catch (e) {
    return res.json({
      status: false,
      msg: "Servers having huge traffic, Try again later.",
    });
  }
};

const verifyJwt = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    // console.log(yahan1);
    // console.log(id);
    // console.log(yahan1);
    // console.log(token);
    // console.log("yahan1");
    const user = await User.findOne({ _id: id });
    if (!user) {
      // console.log("yahan2");
      return res.json({ status: false, msg: "User not exist" });
    }
    // console.log(JWT_SECRET);
    // console.log("yahan3");
    const secret = process.env.SECRET + user.password;
    // console.log(secret);
    const verify = jwt.verify(token, secret);
    const encryptedId = crypto.AES.encrypt(id, process.env.KEY).toString();
    res.redirect(
      `https://lnm-q-v1-3.vercel.app/newpassword?data=${encodeURIComponent(
        encryptedId
      )}`
    );
  } catch (error) {
    return res.json({ status: false, msg: "Failed to Modify Password" });
  }
};

const update = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      { _id: id },
      { $set: { password: encryptedPassword } }
    );
    res.json({ status: true, msg: "Password Updated Successfully" });
  } catch (e) {
    res.json({ status: false, msg: "Error While Updating" });
  }
};

module.exports = { forgot, verifyJwt, update };
