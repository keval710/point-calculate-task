"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionMatch = void 0;
const SectionMatch = (req, res) => {
    //@ts-ignore
    return res.json({ TotalPoint: req.point });
};
exports.SectionMatch = SectionMatch;
