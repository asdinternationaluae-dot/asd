// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

const products = [
  {
    name: 'ASD IRON',
    slug: 'asd-iron',
    description: 'ASD IRON is an advanced food supplement designed to help manage various types of anemia, utilizing a unique liposomal and nanotechnology delivery system.',
    longDescription: 'ASD IRON is an advanced food supplement designed to help manage various types of anemia, utilizing a unique liposomal and nanotechnology delivery system. This innovative technology enhances iron absorption, bioavailability, and overall efficacy. ASD IRON offers a gentle and well-tolerated experience, free from the common side effects of traditional iron supplements such as constipation, metallic taste, or gastric discomfort. Available in capsule form — 30 capsules per pack.',
    category: 'Iron Supplement',
    benefits: JSON.stringify([
      'Supports normal cognitive function and normal transport of oxygen in the body',
      'Contributes to normal formation of hemoglobin and red blood cells (together with Vitamin B12)',
      'Supports normal function of blood vessels and protects cells from oxidative stress (Vitamin C)',
      'Supports normal function of the immune system and cell division process (Vitamin C, B12, and Folate)',
      'Free from common side effects: no constipation, no metallic taste, no gastric discomfort'
    ]),
    ingredients: JSON.stringify(['Iron 30 mg', 'Folic Acid 200 mcg', 'Vitamin B12 200 mcg', 'Vitamin C 80 mg']),
    dosage: 'As directed by a healthcare professional. Available in a pack of 30 capsules.',
    imageUrl: '/img/ASDIron.png',
    featured: false,
    order: 1,
  },
  {
    name: 'ASD MAGNESIUM',
    slug: 'asd-magnesium',
    description: 'ASD Magnesium is the first liposomal magnesium supplement in the UAE, delivering a high dose of 400 mg of magnesium per tablet.',
    longDescription: 'ASD Magnesium is the first liposomal magnesium supplement in the UAE, delivering a high dose of 400 mg of magnesium per tablet. Formulated with premium-quality liposomal technology, it ensures superior absorption, enhanced efficacy, and optimal support for overall health and wellness.',
    category: 'Minerals',
    benefits: JSON.stringify([
      'Helps stabilize mood and sleep; plays an ideal role in managing anxiety and insomnia',
      'Reduces muscle cramps and spasms; supports smooth muscle relaxation',
      'Helps with mood swings, irritability, and headaches associated with PMS',
      'Aids calcium and vitamin D metabolism, improving bone strength and healing',
      'Plays an important role in migraine management by stabilizing neuronal membranes'
    ]),
    ingredients: JSON.stringify(['Liposomal Magnesium Oxide 400 mg']),
    dosage: 'As directed by a healthcare professional.',
    imageUrl: '/img/ASDMagnesium.png',
    featured: false,
    order: 2,
  },
  {
    name: 'ASD SUSTAINED VIT',
    slug: 'asd-sustained-vit',
    description: 'Comprehensive formula containing 20 essential vitamins and minerals with patented sustained-release technology.',
    longDescription: 'ASD SUSTAINED VIT is a comprehensive formula containing 20 essential vitamins and minerals, carefully designed to support overall health, vitality, and daily performance. Developed with a patented sustained-release technology, it provides a gradual and consistent release of nutrients throughout the day, helping maintain steady energy levels, enhanced focus, and long-lasting wellness support.',
    category: 'Vitamins & Minerals',
    benefits: JSON.stringify([
      'Supports healthy pregnancy',
      'Improves bone health',
      'Provides continuous energy and supports metabolism throughout the day',
      'Supports immunity and vision',
      'Enhances hormonal balance and thyroid function',
      'Protects from anemia and enhances focus'
    ]),
    ingredients: JSON.stringify([
      'Calcium 155.5 mg', 'Phosphorous 120 mg', 'Magnesium 120 mg', 'Vitamin C 36 mg', 'Iron 21 mg',
      'Beta-Carotene 7.5 mg', 'Vitamin B3 7.25 mg', 'Vitamin B5 4.81 mg', 'Vitamin E 4.41 mg', 'Zinc 3.6 mg',
      'Vitamin B6 1.2 mg', 'Vitamin B1 0.6 mg', 'Vitamin B2 0.6 mg', 'Manganese 0.6 mg', 'Copper 0.48 mg',
      'Folic Acid 400 μg', 'Iodine 48 μg', 'Selenium 30 mcg', 'Vitamin D3 400 IU / 10 μg', 'Vitamin B12 1.2 μg'
    ]),
    dosage: 'As directed by a healthcare professional.',
    imageUrl: '/img/ASDSustainedVit.png',
    featured: true,
    order: 3,
  },
  {
    name: 'Zinco Q10',
    slug: 'zinco-q10',
    description: 'Patent formula combining Zinc with Coenzyme Q10, providing dual antioxidant defense power.',
    longDescription: 'Zinco Q10 is a patent formula combining Zinc with Coenzyme Q10, providing dual antioxidant defense power for the best cellular energy and overall wellness. Available in capsules — 30 capsules per pack.',
    category: 'Antioxidants & Minerals',
    benefits: JSON.stringify([
      'Immunity booster',
      'Supports male and female fertility',
      'Hormone level regulation without side effects',
      'Supports heart health and diabetes management',
      'Promotes healthy skin aging, wound healing, and reduces headaches',
      'Supports exercise performance'
    ]),
    ingredients: JSON.stringify(['Zinc Citrate 25 mg', 'Coenzyme Q10 100 mg']),
    dosage: 'One tablet twice daily or as directed by doctor.',
    imageUrl: '/img/ZincoQ10_v2.png',
    featured: true,
    order: 4,
  },
  {
    name: 'ASD CARNIPLEX',
    slug: 'asd-carniplex',
    description: 'Premium supplement featuring 600 mg of L-Carnitine per capsule for energy and metabolism.',
    longDescription: 'ASD CARNIPLEX is a premium supplement featuring 600 mg of L-Carnitine per capsule. This powerful compound is renowned for its role in energy production and metabolism, supporting the patient\'s overall health.',
    category: 'Specialty Supplement',
    benefits: JSON.stringify([
      'Supports fertility in men by increasing sperm motility and morphology',
      'Supports fertility in women by improving oocyte (ova) quality',
      'Helps manage chronic fatigue and improve overall wellness',
      'Improves post-viral fatigue',
      'Supports weight management',
      'Enhances lipid profile for hyperlipidemic patients',
      'Boosts stamina and reduces post-exercise fatigue'
    ]),
    ingredients: JSON.stringify(['L-Carnitine 600 mg']),
    dosage: 'As directed by a healthcare professional.',
    imageUrl: '/img/ASDCarneplex.png',
    featured: false,
    order: 5,
  },
  {
    name: 'INPRO',
    slug: 'inpro',
    description: 'Rectal suppository combining Lactoferrin and Hyaluronic Acid with antibacterial and anti-inflammatory action.',
    longDescription: 'INPRO is a rectal suppository combining Lactoferrin and Hyaluronic Acid. Its systemic antibacterial and anti-inflammatory action makes it an ideal choice for both males and females across a range of anorectal and pelvic conditions. Available in two pack sizes: 10 and 20 suppositories.',
    category: 'Specialty Supplement',
    benefits: JSON.stringify([
      'Best choice for hemorrhoids, anorectal diseases, and constipation',
      'For Males: Chronic prostatitis, chronic pelvic pain syndrome, bacterial infections',
      'For Females: Chronic pelvic pain syndrome, cystitis, vaginitis, and other infectious diseases',
      'Dual antibacterial and anti-inflammatory systemic action',
      'Suitable for both male and female patients'
    ]),
    ingredients: JSON.stringify(['Lactoferrin Rectal suppository', 'Hyaluronic Acid Rectal suppository']),
    dosage: '1 to 2 suppositories daily, or as directed by a doctor.',
    imageUrl: '/img/Inpro.png',
    featured: true,
    order: 6,
  },
  {
    name: 'ASD Semifer 10 mg',
    slug: 'asd-semifer-10mg',
    description: '10 mg liposomal iron for preterm infants, infants, and young children below 3 years old.',
    longDescription: 'Target Population: Preterm infants, infants, and young children below 3 years old. Indications: Treatment and prevention of iron deficiency anemia in preterm infants, exclusively breastfed babies, infants during rapid growth phases, and children with low dietary iron intake.',
    category: 'Iron Supplement',
    benefits: JSON.stringify([
      'Reduction of tiredness and fatigue',
      'Support of normal immune system function',
      'Normal formation of red blood cells and hemoglobin',
      'Support of normal cognitive development',
      'Contribution to normal energy-yielding metabolism'
    ]),
    ingredients: JSON.stringify(['Liposomal Iron 10 mg per 8 ml vial']),
    dosage: 'Infants 6m-1y: 1 vial daily; Children 1-3y: 1-2 vials daily.',
    imageUrl: '/img/ASDSemifer10.png',
    featured: false,
    order: 7,
  },
  {
    name: 'ASD Semifer 14 mg',
    slug: 'asd-semifer-14mg',
    description: '14 mg liposomal iron for children from 3 years old and adolescents.',
    longDescription: 'Target Population: Children from 3 years old and adolescents. Indications: Treatment and prevention of iron deficiency and iron deficiency anemia in children and adolescents.',
    category: 'Iron Supplement',
    benefits: JSON.stringify([
      'Reduction of tiredness and fatigue',
      'Support of normal immune system function',
      'Formation of red blood cells and hemoglobin',
      'Support of normal cognitive function',
      'Contribution to normal energy-yielding metabolism'
    ]),
    ingredients: JSON.stringify(['Liposomal Iron 14 mg per 10 ml vial']),
    dosage: '1 to 2 vials daily depending on individual needs.',
    imageUrl: '/img/ASDSemifer14.png',
    featured: false,
    order: 8,
  },
  {
    name: 'ASD Semifer 40 mg',
    slug: 'asd-semifer-40mg',
    description: '40 mg liposomal iron for adults, including pregnant women and athletes.',
    longDescription: 'Target Population: Adults. Indications: Prevention and treatment of iron deficiency anemia in adults, especially those with increased iron needs (pregnancy, athletes) or low iron intake (vegetarians).',
    category: 'Iron Supplement',
    benefits: JSON.stringify([
      'Reduction of tiredness and fatigue',
      'Normal immune system function',
      'Formation of red blood cells and hemoglobin',
      'Support of normal cognitive and metabolic function'
    ]),
    ingredients: JSON.stringify(['Liposomal Iron 40 mg per 10 ml vial']),
    dosage: '1 to 2 vials daily for adults.',
    imageUrl: '/img/ASDSemifer40.png',
    featured: false,
    order: 9,
  },
  {
    name: 'ASD CHELAZEN',
    slug: 'asd-chelazen',
    description: 'Premium iron bisglycinate supplement designed to effectively combat anemia using Nano-Technology.',
    longDescription: 'ASD Chelazen is a premium iron bisglycinate supplement designed to effectively combat anemia. Unlike traditional iron supplements, iron bisglycinate is a chelated form of iron known for its superior absorption and gentle impact on the digestive system. Using iron chelation and Nano-Technology, ASD Chelazen maximizes bioavailability while minimizing GI side effects. Each capsule contains 20 mg of iron bisglycinate. Specially crafted for individuals seeking a reliable and well-tolerated solution to iron deficiency anemia without experiencing stomach upset, nausea, or constipation.',
    category: 'Chelated Minerals',
    benefits: JSON.stringify([
      'Maximizes bioavailability and efficacy via iron chelation and Nano-Technology',
      'Enhances tolerability — ideal for gastric-sensitive patients',
      'Reduces side effects of nausea, gastric upset, and constipation',
      'Bisglycinate protects iron from gastric food interaction',
      'Supports immunity and reduces fatigue caused by iron deficiency anemia (IDA)'
    ]),
    ingredients: JSON.stringify(['Iron Bisglycinate (as Iron) 20 mg']),
    dosage: '1 capsule twice daily, or as recommended by a physician.',
    imageUrl: '/img/ASDChelazen.png',
    featured: false,
    order: 11,
  },
  {
    name: 'ASD MAGNEFLEX',
    slug: 'asd-magneflex',
    description: 'The only magnesium supplement in the UAE providing 4 mmol (97 mg) of elemental magnesium per capsule as magnesium glycerophosphate.',
    longDescription: 'ASD Magneflex is the only magnesium supplement in the UAE providing 4 mmol (97 mg) of elemental magnesium per capsule in the form of magnesium glycerophosphate — a gentle and well-absorbed magnesium salt. Magnesium glycerophosphate achieves high absorption within 2–3 hours with high bioavailability and efficacy. ASD Magneflex provides a flexible dose suitable for both children and adults. Free from artificial colors and gluten.',
    category: 'Minerals',
    benefits: JSON.stringify([
      'Muscle: reduces cramps, spasms, and muscle twitching',
      'Energy: supports energy levels and reduces tiredness',
      'Bones: supports bone health by assisting proper calcium utilization',
      'Migraine: helps reduce migraine frequency',
      'Sleep & Anxiety: helps enhance quality of sleep and reduce anxiety',
      'Safe: free from artificial colors and gluten'
    ]),
    ingredients: JSON.stringify(['Magnesium Glycerophosphate 97 mg elemental Mg (4 mmol)']),
    dosage: 'Adults: 1 cap 3x daily; Children: 1 cap 2x daily.',
    imageUrl: '/img/ASDMagneflex.png',
    featured: false,
    order: 12,
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.product.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.user.deleteMany();

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`✅ Seeded ${products.length} products`);

  const adminPassword = hashSync('changeme', 10);
  await prisma.user.create({
    data: {
      email: 'admin@asd-intl.com',
      passwordHash: adminPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  console.log('✅ Seeded admin user (admin@asd-intl.com / changeme)');

  await prisma.inquiry.createMany({
    data: [
      {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.j@hospital.com',
        phone: '+971 50 123 4567',
        subject: 'Product Inquiry',
        message: 'I would like to learn more about ASD IRON for my patients. Can you provide clinical data?',
        status: 'NEW',
      },
    ],
  });
  console.log('✅ Seeded sample inquiry');

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
