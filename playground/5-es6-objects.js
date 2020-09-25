//Object Property Shorthand

const name = "David";
const userAge = 27;

const user = {
    name,
    age: userAge,
    location: 'Halifax'
};

console.log("User: ", user);

//Object destructuring
const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined,
};

//console.log("Product: ", product);

//label is renamed
//rating has a default value
// const { label: productLabel, stock, rating = 5 } = product;

// console.log(productLabel);
// console.log(stock);
// console.log(rating)

const transaction = (type, { label, price }) => {
    console.log(type);
    console.log(name);
    console.log(price);
}

transaction("order", product);