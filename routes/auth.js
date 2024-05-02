import express from "express";
import { Admin } from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Student } from "../models/Student.js";

const router = express.Router();
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({
          message: "The Admin IS Not Registered",
        });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "The Password is Wrong",
        });
      }
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.Admin_key
      );
      res.status(200).json({
        message: "The Admin is Logged In",
        token,
        role: role,
      });
    } else if (role === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.status(400).json({
          message: "The Student IS Not Registered",
        });
      }
      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "The Password is Wrong",
        });
      }
      const token = jwt.sign(
        { username: student.username, role: "student" },
        process.env.Student_key
      );
      res.status(200).json({
        message: "The Student is Logged In",
        token,
        role: role,
      });
    } else {
    }
  } catch (err) {
    console.log("err", err);
  }
});
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: "The Admin is not Authenticated",
    });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "The Token Is Invalid",
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({
      message: "The User is not Authenticated",
    });
  } else {
    jwt.verify(token, process.env.Student_key, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "The Token Is Invalid",
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "The Admin is Logged Out",
  });
});

export { router as AdminRouter, verifyAdmin };
