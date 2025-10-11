import { fakerPT_BR as faker } from '@faker-js/faker';

export function employeeDataRandom() {
  const registration = faker.string.alphanumeric(10).toUpperCase(); 
  const name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const shift = faker.helpers.arrayElement(['Turno A', 'Turno B', 'Turno C']);
  const phoneNumber = faker.phone.number('+55 (##) #####-####');
  return {
    registration,
    name,
    lastName,
    shift,
    phoneNumber
  }
};

export function employeeDataTesteUpdateDelete() {
  const name = faker.person.firstName();
  const lastName = faker.person.lastName();
  const shift = faker.helpers.arrayElement(['Turno A', 'Turno B', 'Turno C']);
  const phoneNumber = faker.phone.number('+55 (##) #####-####');
  return {
    registration: 'FUNC001',
    name,
    lastName,
    shift,
    phoneNumber
  }
};