"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizMatch = void 0;
const QuizMatch = (req, res) => {
    //@ts-ignore
    return res.json({ TotalPoint: req.point });
};
exports.QuizMatch = QuizMatch;
