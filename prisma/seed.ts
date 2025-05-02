import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.sample.deleteMany({});
  await prisma.protocol.deleteMany({});
  await prisma.reagent.deleteMany({});
  await prisma.device.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Database cleared');

  // Create users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@labtrack.edu',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  const teacher = await prisma.user.create({
    data: {
      name: 'Teacher User',
      email: 'teacher@labtrack.edu',
      password: teacherPassword,
      role: Role.TEACHER,
    },
  });

  const student = await prisma.user.create({
    data: {
      name: 'Student User',
      email: 'student@labtrack.edu',
      password: studentPassword,
      role: Role.STUDENT,
    },
  });

  console.log('Users created:', { admin, teacher, student });

  // Create reagents
  const reagents = await Promise.all([
    prisma.reagent.create({
      data: {
        name: 'Sodium Chloride',
        casNumber: '7647-14-5',
        quantity: 500,
        unit: 'g',
        location: 'Shelf A1',
        storageTemp: 'Room Temperature',
        expiryDate: new Date('2025-12-31'),
        batchNumber: 'NACL-2024-001',
      },
    }),
    prisma.reagent.create({
      data: {
        name: 'Ethanol',
        casNumber: '64-17-5',
        quantity: 2000,
        unit: 'ml',
        location: 'Cabinet B3',
        storageTemp: 'Room Temperature',
        expiryDate: new Date('2025-08-15'),
        batchNumber: 'ETH-2024-002',
      },
    }),
    prisma.reagent.create({
      data: {
        name: 'Hydrochloric Acid',
        casNumber: '7647-01-0',
        quantity: 1000,
        unit: 'ml',
        location: 'Cabinet C2',
        storageTemp: 'Room Temperature',
        expiryDate: new Date('2025-11-20'),
        batchNumber: 'HCL-2024-003',
      },
    }),
    prisma.reagent.create({
      data: {
        name: 'Glucose',
        casNumber: '50-99-7',
        quantity: 250,
        unit: 'g',
        location: 'Shelf A2',
        storageTemp: 'Room Temperature',
        expiryDate: new Date('2025-06-30'),
        batchNumber: 'GLU-2024-001',
      },
    }),
    prisma.reagent.create({
      data: {
        name: 'Methylene Blue',
        casNumber: '61-73-4',
        quantity: 100,
        unit: 'g',
        location: 'Shelf B1',
        storageTemp: 'Room Temperature',
        expiryDate: new Date('2025-05-15'),
        batchNumber: 'MB-2024-001',
      },
    }),
  ]);

  console.log('Reagents created:', reagents);

  // Create devices
  const devices = await Promise.all([
    prisma.device.create({
      data: {
        name: 'Microscope Olympus CX23',
        type: 'Microscope',
        status: 'Available',
        lastMaintenance: new Date('2024-03-15'),
        nextMaintenance: new Date('2025-03-15'),
      },
    }),
    prisma.device.create({
      data: {
        name: 'Centrifuge Eppendorf 5430',
        type: 'Centrifuge',
        status: 'Available',
        lastMaintenance: new Date('2024-04-10'),
        nextMaintenance: new Date('2024-10-10'),
      },
    }),
    prisma.device.create({
      data: {
        name: 'PCR Thermocycler',
        type: 'Thermocycler',
        status: 'Maintenance Required',
        lastMaintenance: new Date('2023-11-20'),
        nextMaintenance: new Date('2024-05-20'),
      },
    }),
    prisma.device.create({
      data: {
        name: 'Analytical Balance',
        type: 'Balance',
        status: 'Available',
        lastMaintenance: new Date('2024-01-05'),
        nextMaintenance: new Date('2024-07-05'),
      },
    }),
  ]);

  console.log('Devices created:', devices);

  // Create protocols
  const protocols = await Promise.all([
    prisma.protocol.create({
      data: {
        title: 'Gram Staining Protocol',
        steps: `
# Gram Staining Protocol

## Materials
- Crystal violet solution
- Iodine solution
- Ethanol (95%)
- Safranin solution
- Microscope slides
- Bunsen burner
- Immersion oil
- Microscope

## Procedure
1. Prepare a bacterial smear on a clean glass slide
2. Allow the smear to air dry
3. Heat fix the smear by passing it through a Bunsen burner flame 2-3 times
4. Flood the slide with crystal violet and let stand for 1 minute
5. Rinse gently with water
6. Flood the slide with iodine solution and let stand for 1 minute
7. Rinse gently with water
8. Decolorize with 95% ethanol until the solvent flows colorlessly
9. Rinse gently with water
10. Counterstain with safranin for 30 seconds
11. Rinse gently with water and blot dry
12. Observe under oil immersion (1000x)

## Expected Results
- Gram-positive bacteria: Purple/blue
- Gram-negative bacteria: Pink/red

## Safety Notes
- Wear gloves and lab coat
- Dispose of stains in appropriate waste containers
- Avoid prolonged skin contact with stains
`,
        category: 'Microbiology',
        createdById: teacher.id,
      },
    }),
    prisma.protocol.create({
      data: {
        title: 'DNA Extraction Protocol',
        steps: `
# DNA Extraction Protocol

## Materials
- Lysis buffer
- Proteinase K
- RNase A
- Phenol:chloroform:isoamyl alcohol (25:24:1)
- Isopropanol
- 70% ethanol
- TE buffer
- Microcentrifuge tubes
- Microcentrifuge
- Water bath or heat block

## Procedure
1. Add 500 μl of lysis buffer to a microcentrifuge tube containing the sample
2. Add 10 μl of Proteinase K and mix gently
3. Incubate at 56°C for 1 hour
4. Add 5 μl of RNase A and incubate at 37°C for 30 minutes
5. Add 500 μl of phenol:chloroform:isoamyl alcohol and mix by inverting
6. Centrifuge at 12,000 rpm for 10 minutes
7. Transfer the aqueous phase to a new tube
8. Add equal volume of isopropanol and mix by inverting
9. Centrifuge at 12,000 rpm for 10 minutes
10. Discard the supernatant and wash the pellet with 70% ethanol
11. Centrifuge at 12,000 rpm for 5 minutes
12. Air dry the pellet and resuspend in 50 μl of TE buffer

## Expected Results
- Clear, viscous DNA solution
- DNA concentration: 50-500 ng/μl

## Safety Notes
- Wear gloves and lab coat
- Work in a fume hood when handling phenol:chloroform
- Dispose of waste in appropriate containers
`,
        category: 'Molecular Biology',
        createdById: teacher.id,
      },
    }),
  ]);

  console.log('Protocols created:', protocols);

  // Create samples
  const samples = await Promise.all([
    prisma.sample.create({
      data: {
        label: 'Sample-001',
        description: 'Blood sample from patient X',
        storedAt: 'Freezer F1 (-20°C)',
        relatedReagentId: reagents[0].id,
      },
    }),
    prisma.sample.create({
      data: {
        label: 'Sample-002',
        description: 'E. coli culture',
        storedAt: 'Refrigerator R2 (4°C)',
        relatedReagentId: reagents[2].id,
      },
    }),
    prisma.sample.create({
      data: {
        label: 'Sample-003',
        description: 'Extracted DNA from specimen Y',
        storedAt: 'Freezer F3 (-80°C)',
      },
    }),
  ]);

  console.log('Samples created:', samples);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
