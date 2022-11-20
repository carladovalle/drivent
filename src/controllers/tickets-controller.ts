import { AuthenticatedRequest } from "@/middlewares";
import getTicketsType from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await getTicketsType();
  
    return res.send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
