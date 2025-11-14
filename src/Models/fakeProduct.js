import { fakerPT_BR as faker } from "@faker-js/faker";

export default function fakeProduct() {
  return {
    code: faker.string.numeric({length: 4}),
    type: faker.helpers.arrayElement(["BN", 'DN']),
  }
}
