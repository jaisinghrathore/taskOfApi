const axios = require("axios");

const apicall = async () => {
    const response = await axios("https://dummyjson.com/products");

    const data = response.data.products;
    const sortedData = data.slice(0, 10);
    // for sorting
    for (let i = 0; i < sortedData.length; i++) {
        for (let j = i + 1; j < sortedData.length; j++) {
            if (sortedData[j].price < sortedData[i].price) {
                let max = sortedData[i];
                sortedData[i] = sortedData[j];
                sortedData[j] = max;
            }
        }
    }

    //First and sexond Task
    const firstSecondTask = sortedData.map((val) => {
        return { title: val.title, price: val.price };
    });
    //console.log(firstSecondTask);

    //third task
    const thirdTask = data.filter((val) => {
        return val.stock >= 50;
    });
    //console.log(thirdTask);

    //homework bonus task
    const homework = data.filter((val) => {
        return val.rating >= 4.5 && val.brand.toLowerCase() === "apple";
    });
    console.log(homework);
};

apicall();
