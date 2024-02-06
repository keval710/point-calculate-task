import express, { Router } from "express";
import { ResController } from "../controller/ResController";


const route: Router = express.Router();


route.post("/", ResController)


export default route;