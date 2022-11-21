import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { Ticket } from "@prisma/client";

async function getTicketsType() {
  const result = await ticketsRepository.findMany();
  
  return result;
}

async function verifyUserEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment.id;
}

async function getTicket(userId: number) {
  const enrollmentId: number = await verifyUserEnrollment(userId);

  const ticket = await ticketsRepository.findTickets(enrollmentId);

  if (!ticket) {
    throw notFoundError();
  }
    
  return ticket;
}

async function postTicket(userId: number, ticketTypeId: number) {
  const enrollmentId: number = await verifyUserEnrollment(userId);

  const newTicket: Omit<Ticket, "id" | "createdAt"> = {
    ticketTypeId,
    enrollmentId,
    status: "RESERVED",
    updatedAt: new Date(),
  };
    
  return await ticketsRepository.insertTickets(newTicket);
}

const ticketsService = {
  getTicketsType,
  getTicket,
  postTicket
};

export default ticketsService;
