import { Request, Response } from "express";
import testIni, { } from "../services/testIni";

export const getTestBora = async (req: Request, res: Response) => {
    const testes = await testIni.getTest();
    res.send(testes);
}