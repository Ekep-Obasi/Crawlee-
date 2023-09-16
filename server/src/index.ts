import express, { Express } from "express";
import { PORT_NUMBER } from "./constants";
import App from "./services/ExpressApp";

const app: Express = express();

(async () => {
  await App(app);

  app.listen(PORT_NUMBER, () => {
    console.log(`server is running on PORT: ${PORT_NUMBER}`);
  });
})();
