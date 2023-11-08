import fs from "fs";
import { faker } from "@faker-js/faker";
// Function to generate a random image URL using Faker
const generateRandomImageURL = () => {
  // Using the 'lorempixel' image service from Faker.js
  return faker.image.url();
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function generateDummyData() {
  // Generate 100 dummy course objects
  const dummyCourses = Array.from({ length: 100 }, (_, index) => ({
    name: `Course ${index + 1}`,
    instructor: faker.person.fullName(),
    description: faker.lorem.sentence(),
    enrollmentStatus: "open",
    thumbnail: generateRandomImageURL(),
    duration: `${Math.floor(Math.random() * 10)} weeks`,
    schedule: `${days[Math.floor(Math.random() * 7)]}`,
    location: `${faker.location.streetAddress()}, ${faker.location.city()}`,
    prerequisites: [faker.lorem.word(), faker.lorem.word()],
    syllabus: Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      (_, week) => ({
        week: week + 1,
        topic: faker.lorem.words(3),
        content: faker.lorem.paragraph(),
      })
    ),
    students: Array.from({ length: Math.floor(Math.random() * 20) }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })),
  }));

  fs.writeFileSync(
    `${process.cwd()}/data.json`,
    JSON.stringify(dummyCourses, null, 2)
  );
}

export default generateDummyData;
