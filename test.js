const axios = require("axios");

function callback(val) {
    console.log(val);
}

async function api() {
    const data = await axios("https://dummyjson.com/products");
    callback(data?.data?.products);
}

api();
