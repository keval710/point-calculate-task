import express from "express";
import { ResController } from "../controller/ResController";
import { MainFunction } from "../middleware/middleware";
import "../middleware/middleware"


const route = express.Router();


route.get("/", MainFunction, ResController)


export default route;