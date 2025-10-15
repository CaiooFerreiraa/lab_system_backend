import DatabaseMark from "../Models/DatabaseMark.js";
import { fakerPT_BR as faker } from "@faker-js/faker";

const dbMark = new DatabaseMark();

async function seedFakeMark() {
  const fakeMark = {
    name: faker.company.name(), // Ex: "Farmacêutica São Jorge"
    methodName: faker.commerce.productName(), // Ex: "Análise de Pureza"
    methodDescription: faker.lorem.sentence(), // Ex: "Método utilizado para determinar a pureza da amostra."
  };

  console.log("Inserindo:", fakeMark);

  await dbMark.createMark(fakeMark); // se o método for privado, mude pra público
}

seedFakeMark();
