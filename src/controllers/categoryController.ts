import { error } from 'console';
import { prisma } from '../prisma.js';
import { Request, Response } from 'express';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.category.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af kategorier`);
  }
};

export const createRecord = async (req: Request, res: Response) => {
  console.log(req.body);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Du er en nørd' });
  }

  try {
    const data = await prisma.category.create({
      data: {
        name,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'FUCK' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'No id' });
  }
  const { name } = req.body;
  try {
    const data = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'server error!' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'Manglende id' });
  }

  try {
    const data = await prisma.category.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'categoryDeleted', deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: 'server error!' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Manglende ID' });
  }

  try {
    const data = await prisma.category.findUnique({
      where: { id },
      select: {
        name: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Server fejl' });
  }
};
