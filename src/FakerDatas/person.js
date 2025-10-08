import { faker } from '@faker-js/faker';
import DataBase from '../controllers/ControllerDataBase.js'
const dataBase = new DataBase()

// Gera uma matrícula como string única
const matricula = faker.string.alphanumeric(10).toUpperCase(); 

// Nome e sobrenome reais
const nome = faker.person.firstName();
const sobrenome = faker.person.lastName();

// Turno escolhido entre 3 opções
const turno = faker.helpers.arrayElement(['Turno A', 'Turno B', 'Turno C']);

dataBase.registrarFuncionario(matricula, nome, sobrenome, turno, 2);