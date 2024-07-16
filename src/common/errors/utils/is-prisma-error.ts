import { Prisma } from "@prisma/client";

// Função que verifica os tipos para saber se é um PrismaClientError
export const isPrismaError = (e: Prisma.PrismaClientKnownRequestError) => {
  return (
    typeof e.code === "string" &&
    typeof e.clientVersion == "string" &&
    (typeof e.meta === "undefined" || typeof e.meta === "object")
  );
};
