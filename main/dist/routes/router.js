"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ResController_1 = require("../controller/ResController");
const middleware_1 = require("../middleware/middleware");
require("../middleware/middleware");
const route = express_1.default.Router();
route.get("/", middleware_1.MainFunction, ResController_1.ResController);
exports.default = route;
