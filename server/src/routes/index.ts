import express, { Request, Response } from "express";
import getData from "../services/Puppeteer";
import { CategoryGroups } from "../types";

const router = express.Router();

router.get(
  "/data",
  async (req: Request<{}, {}, {}, {category: CategoryGroups}>, res: Response) => {
    const { category } = req.query;
    console.time('scrapping')
    try {
      const data = await getData(category);

      res.status(200).send(data);
    } catch (err) {
      res
        .status(500)
        .send({ message: "Oops Something went wrong!", statusCode: 500, err });
    }
    console.timeEnd('scrapping')
  }
);

export { router as dataRouter };
