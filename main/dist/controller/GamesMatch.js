"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesMatch = void 0;
const GamesMatch = (req, res) => {
    //@ts-ignore
    return res.json({ TotalPoint: req.point });
};
exports.GamesMatch = GamesMatch;
