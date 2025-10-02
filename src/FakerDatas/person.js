import { faker } from "@faker-js/faker";

const randomName = faker.person.firstName();
const randomLastName = faker.person.lastName();
const randomMatricula = faker.number.int({min: 8000, max:10000}).toString();

console.log(randomName, randomLastName, randomMatricula);
