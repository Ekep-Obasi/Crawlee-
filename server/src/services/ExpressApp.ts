import express, { Express } from "express"
import cors from 'cors';
import path from 'path';
import { dataRouter } from "../routes";

export default function App(app: Express) {
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(express.static(path.join(process.cwd(), '../',  'public')));
  app.use('/api/v1', dataRouter)
}