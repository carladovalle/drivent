import { prisma } from "@/config";
import { TicketType } from "@prisma/client";

async function findMany() {
  return prisma.ticketType.findMany();
}

export { findMany };
