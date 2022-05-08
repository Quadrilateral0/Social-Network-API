const connection = require('../config/connection');
const { thought, user } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thought
  await thought.deleteMany({});

  // Drop existing user
  await user.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  // Add user to the collection and await the results
  await user.collection.insertOne({
    username: "lernantino",
    email: "lernantino@gmail.com"
  });

  // Add thought to the collection and await the results
  await thought.collection.insertOne({
    thoughtText: "Here's a cool thought...",
    username: "lernantino",
    // thoughtId: "5edff358a0fcb779aa7b118b"
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
