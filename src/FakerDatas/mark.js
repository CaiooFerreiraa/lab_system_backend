import { fakerPT_BR as faker } from "@faker-js/faker";

export function markRandom() {
  const arrayMarks = ['Nike', 'Adidas', 'New Balance', 'Veja', 'Fila', 'Umbro', 'Asics', 'Osklen'];

  const marks = [];
  arrayMarks.forEach((name, index) => {
    let cod_marca = ++index;
    marks.push({
      cod_marca,
      name
    })
  })

  return faker.helpers.arrayElement(marks);
}
