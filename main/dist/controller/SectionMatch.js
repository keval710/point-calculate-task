"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionMatch = void 0;
const SectionMatch = (req, res) => {
    //@ts-ignore
    let Point = req.point;
    return res.json({ TotalPoint: Point });
};
exports.SectionMatch = SectionMatch;
