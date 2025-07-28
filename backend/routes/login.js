import express from "express";
import Login from "../models/Login.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { domain, loginMethod, credential } = req.body;
  const existing = await Login.findOne({ domain, credential });

  if (existing) {
    existing.loginCount += 1;
    existing.lastUsed = new Date();
    await existing.save();
    return res.status(200).json(existing);
  }

  const newLogin = await Login.create({ domain, loginMethod, credential });
  res.status(201).json(newLogin);
});

router.get("/:domain", async (req, res) => {
  const logins = await Login.find({ domain: req.params.domain });
  res.json(logins);
});

export default router;
