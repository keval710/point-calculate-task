import { Request, Response } from "express";

export const SectionMatch = (req: Request, res: Response) => {

    //@ts-ignore
    let Point = req.point;


    return res.json({ TotalPoint: Point })

}