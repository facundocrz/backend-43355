import {faker} from '@faker-js/faker/locale/es';

export const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(5),
        price: faker.commerce.price(),
        stock: faker.number.int(100),
        category: faker.commerce.department(),
        thumbnails: [faker.image.url()],
        status: "true",
    };
}