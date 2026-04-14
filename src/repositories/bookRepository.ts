import { prisma } from '@/lib/prisma';

export const bookRepository = {
  findAll: async () => {
    return await prisma.book.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      }
    });
  },

  findById: async (id: number) => {
    return await prisma.book.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  },

  findByIdWithScores: async (id: number) => {
    return await prisma.book.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        borrows: {
          where: {
            score: {
              not: null,
            },
            returnedAt: {
              not: null,
            },
          },
          select: {
            score: true,
          },
        },
      }
    });
  },

  create: async (name: string) => {
    return await prisma.book.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  },
}