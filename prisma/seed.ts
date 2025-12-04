import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma';
import { generatePrice, generateYear } from '../src/utils/generateRandom';
// Asynkron main-funktion som kører vores seed-data
const main = async () => {
  // Sletter eksisterende data i bruger tabellen
  await prisma.user.deleteMany();
  await prisma.car.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.fueltypes.deleteMany();
  // Opretter en testbruger i databasen
  const user = await prisma.user.create({
    data: {
      firstname: 'Test',
      lastname: 'Bruger',
      email: 'test@example.com', // Login-email
      password: await bcrypt.hash('password', 10), // Password hash
      role: 'USER', // Bruger rolle
      isActive: true, // Brugeren er aktiv og må logge ind
    },
  });

  console.log('Seed completed for users:', user);

  const admin = await prisma.user.create({
    data: {
      firstname: 'Test',
      lastname: 'Bruger',
      email: 'admin@example.com', // Login-email
      password: await bcrypt.hash('password', 10), // Password hash
      role: 'ADMIN', // Bruger rolle
      isActive: true, // Brugeren er aktiv og må logge ind
    },
  });

  console.log('Seed completed for users:', admin);

  // Opretter mange drivmidler i databasen
  const typesoffuel = await prisma.fueltypes.createMany({
    data: [{ name: 'Benzin' }, { name: 'Diesel' }, { name: 'Hybrid' }, { name: 'Electricity' }, { name: 'Coffee' }],
  });
  // Udskriver i terminalen at drivmidler er oprettet
  console.log('Seed completed for fueltypes:', typesoffuel);

  const categories = await prisma.category.createMany({
    data: [{ name: 'Personbil' }, { name: 'Varevogn' }, { name: 'Bus' }, { name: 'Lastbil' }, { name: 'Autocamper' }],
  });
  console.log('Seed completed for categories:', categories);

  const brands = await prisma.brand.createMany({
    data: [
      { name: 'Volvo', logoUrl: 'volvo.com/logo' },
      { name: 'Mazda', logoUrl: 'mongo.com/logo' },
      { name: 'Ellert', logoUrl: 'ellert.com/logo' },
      { name: 'Ferrari', logoUrl: 'ferrari.com/logo' },
      { name: 'Jeep', logoUrl: 'jeep.com/logo' },
    ],
  });

  const cars = await prisma.car.createMany({
    data: [
      { category: 'Varevogn', brandId: 1, model: 'Focus', year: generateYear(), price: generatePrice(), fuelId: 1 },
      { category: 'Personbil', brandId: 2, model: 'V60', year: generateYear(), price: generatePrice(), fuelId: 2 },
      { category: 'Bus', brandId: 3, model: 'Model S', year: generateYear(), price: generatePrice(), fuelId: 3 },
      { category: 'Lastbil', brandId: 4, model: 'Civic', year: generateYear(), price: generatePrice(), fuelId: 4 },
      { category: 'Autocamper', brandId: 5, model: 'Corolla', year: generateYear(), price: generatePrice(), fuelId: 5 },
      { category: 'Personbil', brandId: 1, model: 'Passat', year: generateYear(), price: generatePrice(), fuelId: 2 },
      { category: 'Varevogn', brandId: 2, model: 'Safari', year: generateYear(), price: generatePrice(), fuelId: 3 },
      { category: 'Bus', brandId: 3, model: 'Transit', year: generateYear(), price: generatePrice(), fuelId: 4 },
      { category: 'Lastbil', brandId: 4, model: 'A4', year: generateYear(), price: generatePrice(), fuelId: 5 },
      { category: 'Autocamper', brandId: 5, model: 'Mustang', year: generateYear(), price: generatePrice(), fuelId: 1 },
    ],
  });
  console.log('generated cars', cars);
};

// Kør main-funktionen
main()
  .then(() => prisma.$disconnect()) // Lukker db forbindelsen når alt er ok
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
