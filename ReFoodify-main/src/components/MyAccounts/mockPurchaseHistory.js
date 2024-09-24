import { faker } from "@faker-js/faker";

const generateItems = (count) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price({ min: 3, max: 10, dec: 2 })),
    amount: faker.number.int({ min: 1, max: 5 }),
    supermarket: faker.company.name(),
    image: faker.image.url(),
  }));
};

export const mockPurchaseHistory = Array.from({ length: 9 }, () => {
  const items = generateItems(faker.number.int({ min: 1, max: 5 }));
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return {
    id: faker.string.uuid(),
    date: faker.date.past(),
    items: items,
    totalPrice: totalPrice,
    image: faker.image.url(),
  };
});
