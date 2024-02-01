"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./routes/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(router_1.default);
// //*called GamesMatch function
// await GamesMatch(responseJSON, formateJSON, FormateId)
app.listen(5000, () => console.log(`server is running on port 5000`));
