import { prisma } from "@/config";
import { TicketType, Ticket } from "@prisma/client";

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

const ticketsRepository = {
  findMany,
  findTickets
};

export default ticketsRepository;
