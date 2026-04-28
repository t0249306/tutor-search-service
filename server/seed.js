const { sequelize, Tutor, Review } = require('./models');
const fs = require('fs');

async function seed() {
  await sequelize.sync({ force: true });
  const data = JSON.parse(fs.readFileSync('./mockData.json', 'utf8'));
  const tutors = await Tutor.bulkCreate(data);
  
  // пару мок-отзывов первому репетитору
  if (tutors.length > 0) {
    await Review.create({ author: 'Алексей', text: 'Отличный преподаватель!', TutorId: tutors[0].id });
    await Review.create({ author: 'Ольга', text: 'Все понятно объясняет.', TutorId: tutors[0].id });
  }

  console.log('Database seeded successfully!');
  process.exit();
}

seed();