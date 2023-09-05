const generateProductErrorInfo = (product) => {
  return `
    One or more of the following fields are missing or invalid:
    * title: Needs to be a string, recieved ${product.title}
    * description: Needs to be a string, recieved ${product.description}
    * code: Needs to be a string, recieved ${product.code}
    * price: Needs to be a number, recieved ${product.price}
    * stock: Needs to be a number, recieved ${product.stock}
    * category: Needs to be a string, recieved ${product.category}
    `;
};

const generateUserErrorInfo = (user) => {
  return `
    One or more of the following fields are missing or invalid:
    * first_name: Needs to be a string, recieved ${user.first_name}
    * last_name: Needs to be a string, recieved ${user.last_name}
    * email: Needs to be a string, recieved ${user.email}
    * age: Needs to be a number, recieved ${user.age}
    `;
};

export { generateProductErrorInfo, generateUserErrorInfo };
