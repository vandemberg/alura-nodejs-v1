import { Router } from "express";

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello, world!' })
});

export default router;
