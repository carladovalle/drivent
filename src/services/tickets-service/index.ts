import { findMany } from "@/repositories/tickets-repository";
import { exclude } from "@/utils/prisma-utils";

async function getTicketsType() {
  const result = await findMany();
  
  return result;
}

export default getTicketsType;
