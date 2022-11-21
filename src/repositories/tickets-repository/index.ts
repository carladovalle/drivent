import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findMany() {
  return prisma.ticketType.findMany();
}

async function findTickets(enrollmentId: number) {
  return prisma.ticket.findMany({
    where: {
      enrollmentId
    },
    include: {
      TicketType: true,
    }
  });
}

async function insertTickets(newTicket: Omit<Ticket, "id" | "createdAt">) {
  return prisma.ticket.create({
    data: newTicket,
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findMany,
  findTickets,
  insertTickets
};

export default ticketsRepository;
