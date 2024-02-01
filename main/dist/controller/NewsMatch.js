"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsMach = void 0;
const NewsMach = (req, res) => {
    //@ts-ignores
    return res.json({ TotalPoint: req.point });
};
exports.NewsMach = NewsMach;
