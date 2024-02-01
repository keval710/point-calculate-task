import { Request, Response } from "express";

export const GamesMatch = (req: Request, res: Response) => {
    //@ts-ignore
    return res.json({ TotalPoint: req.point })

}