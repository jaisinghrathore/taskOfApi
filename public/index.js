let table = document.querySelector(".table");
let tableBody = document.querySelector(".tableBody");
let tableHead = document.querySelector(".tableHead");
let caption = document.querySelector("caption");

function removeStaleData() {
    tableHead.childNodes[1].innerHTML = "";
    tableBody.innerHTML = "";
}

function dom(val, callback) {
    val = callback ? [...callback()] : val;
    // This is for t-Head
    for (let key in val[0]) {
        const element = document.createElement("td");
        const textnode = document.createTextNode(key);
        element.appendChild(textnode);
        tableHead.childNodes[1].appendChild(element);
    }

    //This is for T-Body
    val.forEach((val) => {
        const element = document.createElement("tr");
        const values = Object.values(val);
        values.forEach((items) => {
            const elements = document.createElement("td");
            const textnodes = document.createTextNode(
                items.toString().slice(0, 10)
            );
            elements.appendChild(textnodes);
            element.appendChild(elements);
        });

        tableBody.appendChild(element);
    });
}

async function api(rmStaleData) {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    rmStaleData();
    return data;
}

function apicall() {
    this.first_second = function (response) {
        response(removeStaleData)
            .then((data) => {
                return data;
            })
            .then(({ products }) => {
                products = products.slice(0, 10);
                // for sorting
                for (let i = 0; i < products.length; i++) {
                    for (let j = i + 1; j < products.length; j++) {
                        if (products[j].price > products[i].price) {
                            let max = products[i];
                            products[i] = products[j];
                            products[j] = max;
                        }
                    }
                }

                caption.innerText = "First 10 array with sorted price...";

                // DOM MANIPULATION
                dom(products, () => {
                    return products.map((val) => {
                        return { title: val.title, price: val.price };
                    });
                });
            })
            .catch((err) => {
                console.log();
            });
    };

    this.third = function (response) {
        response(removeStaleData)
            .then((data) => {
                return data;
            })
            .then(({ products }) => {
                caption.innerText = "Stock greater than 50...";
                // DOM MANIPULATION
                dom(products, () => {
                    return products.filter((val) => {
                        //Filtering the Data (Stock is >=50)
                        return val.stock >= 50;
                    });
                });
            });
    };

    this.Homework = function (response) {
        response(removeStaleData)
            .then((data) => {
                return data;
            })
            .then(({ products }) => {
                caption.innerText = "rating is >= 4.5 and of apple brand...";
                // DOM MANIPULATION
                dom(products, function () {
                    return products.filter((val) => {
                        //Filtering the Data (rating is >=4.5 and of apple brans(HOMEWORK))
                        return (
                            val.rating >= 4.5 &&
                            val.brand.toLowerCase() === "apple"
                        );
                    });
                });
            });
    };
}

const one = new apicall();
