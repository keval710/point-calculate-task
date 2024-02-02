"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsMach = void 0;
const response_json_1 = __importDefault(require("../../../data/response.json"));
const NewsMach = (req, res) => {
    //@ts-ignores
    let Point = req.point;
    response_json_1.default.find((val) => {
        if (val.section_type === "news") {
            //@ts-ignore
            val["TotalPoints"] = Point;
            return res.json(response_json_1.default);
        }
    });
};
exports.NewsMach = NewsMach;
