import { Request, Response } from "express";

export const NewsMach = (req: Request, res: Response) => {

    //@ts-ignores
    return res.json({ TotalPoint: req.point })



}