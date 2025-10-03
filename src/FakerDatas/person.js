import { faker } from '@faker-js/faker';

// Gera uma matrícula como string única
const matricula = faker.string.alphanumeric(10).toUpperCase(); 

// Nome e sobrenome reais
const nome = faker.person.firstName();
const sobrenome = faker.person.lastName();

// Turno escolhido entre 3 opções
const turno = faker.helpers.arrayElement(['Turno A', 'Turno B', 'Turno C']);

// Telefone no formato brasileiro
const telefone = faker.phone.number('+55 (##) #####-####');

export const funcionario = {
  matricula,
  nome,
  sobrenome,
  turno,
  telefone
};