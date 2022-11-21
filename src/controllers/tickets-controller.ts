import { notFoundError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const result = await ticketsService.getTicketsType();
  
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req as AuthenticatedRequest;

  try {
    const userTicket = await ticketsService.getTicket(userId);
  
    return res.status(httpStatus.OK).send(userTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTickets(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;
  const ticketTypeId: number = req.body;

  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const ticket = await ticketsService.postTicket(ticketTypeId, userId);
  
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
