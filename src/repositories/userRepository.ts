import { prisma } from '@/lib/prisma';

export const userRepository = {
  findAll: async () => {
    return await prisma.user.findMany({
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
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  },

  findByIdWithBorrows: async (id: number) => {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        borrows: {
          select: {
            id: true,
            borrowedAt: true,
            returnedAt: true,
            score: true,
            book: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            borrowedAt: 'desc',
          },
        },
      }
    });
  },

  create: async (name: string) => {
    return await prisma.user.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  },
};