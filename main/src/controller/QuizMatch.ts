import { Request, Response } from "express";

export const QuizMatch = (req: Request, res: Response) => {

    //@ts-ignore
    return res.json({ TotalPoint: req.point })
}


