import { prisma } from '../prisma.js';
import { Request, Response } from 'express';

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, logo } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ingen id' });
  }

  try {
    const data = await prisma.brand.findUnique({
      where: { id },
      select: {
        name,
        logo,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'server spazzed' });
  }
};

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.brand.findMany();
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af brands`);
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const { name, logo } = req.body;

  if (!name || !logo) {
    return res.status(400).json({ error: 'peepee' });
  }

  try {
    const data = await prisma.brand.create({
      data: {
        name,
        logo,
      },
    });
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Stuff went bad!' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, logo } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ingen id' });
  }
  if (!name || !logo) {
    return res.status(400).json({ error: 'All data is required' });
  }

  try {
    const data = await prisma.brand.update({
      where: { id },
      data: {
        name,
        logo,
      },
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'server fejl' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'no id' });
  }

  try {
    const data = await prisma.brand.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Record deleted', deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: 'Server problem' });
  }
};
