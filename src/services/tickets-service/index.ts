import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";

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
    
  return ticket;
}

const ticketsService = {
  getTicketsType,
  getTicket
};

export default ticketsService;
