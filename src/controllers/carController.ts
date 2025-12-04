import { prisma } from '../prisma.js';
import { Request, Response } from 'express';
import { generatePrice, generateYear } from '../utils/generateRandom.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.car.findMany({
      include: {
        brand: true,
        fueltype: true,
      },
    });
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send(`DB Fejl: Kunne ikke hente liste af biler`);
  }
};
export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { category, brand, model, year, price, fueltype } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'No ID' });
  }

  try {
    const data = await prisma.car.findUnique({
      where: { id },
      select: {
        id: true,
        category: true,
        model: true,
        year: true,
        price,
        fueltype: {
          select: {
            name: true,
          },
        },
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json(data);
  } catch (error) {}
};

export const createRecord = async (req: Request, res: Response) => {
  console.log(req.body);
  const { category, brand, model, year, price, fueltype } = req.body;

  if (!category || !brand || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'peepee' });
  }

  try {
    const data = await prisma.car.create({
      data: {
        category,
        brandId: Number(brand),
        model,
        year: generateYear(),
        price: generatePrice(),
        fuelId: Number(fueltype),
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

  const { category, brand, model, year, price, fueltype } = req.body;

  if (!category || !brand || !model || !year || !price || !fueltype) {
    return res.status(400).json({ error: 'peepee' });
  }

  try {
    const data = await prisma.car.update({
      where: { id },
      data: {
        category,
        brand,
        model,
        year: Number(year),
        price,
        fueltype,
      },
    });

    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).json({ error: 'Server error!' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({ error: 'ID missing' });
  }

  try {
    const data = await prisma.car.delete({
      where: { id },
    });
    return res.status(200).json({ message: 'Car record deleted', deletedId: id });
  } catch (error) {
    return res.status(500).json({ error: 'Server error!' });
  }
};
