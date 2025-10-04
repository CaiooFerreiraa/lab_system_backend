import { faker } from '@faker-js/faker';

// Gera uma matrícula como string única
const registration = faker.string.alphanumeric(10).toUpperCase(); 

// Nome e sobrenome reais
const name = faker.person.firstName();

const lastName = faker.person.lastName();

// Turno escolhido entre 3 opções
const shift = faker.helpers.arrayElement(['Turno A', 'Turno B', 'Turno C']);

// Telefone no formato brasileiro
const phoneNumber = faker.phone.number('+55 (##) #####-####');

export const employeeData = {
  registration,
  name,
  lastName,
  shift,
  phoneNumber
};