const express = require("express");

const request = require("request-promise");
const envd = require("dotenv").config();
const env = require("dotenv");
const PORT = process.env.PORT || 1000;

const app = express();


// const s_api = "e77b66583089269b1854a0dc5e7d972f";

// const targeturl = "https://openai.com/blog/chatgpt"

const getbaseurl = (api_key) => {
    const url = `http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;
    return url;

}

app.use(express.json())
app.get("/", (req, res) => {
    res.json({
        "message": "Hello Guys Welcome to amazon scrapper",
        "description": "you can use this api in your projects for getting amazon product details and more information ",
        "developer": "shivam rawat",
        "get product info URL ": "products/<productId>?api_key=<yourapikey>",
        "get product reviews URL ": "products/<productId>/reviews?api_key=<yourapikey>",
        "search products URL ": "products/search/<searchquery>?api_key=<yourapikey>"
    }).status(200)

})

// api for product info/
// demo url :http://localhost:1000/products/B08CZT64VP?api_key=e77b66583089269b1854a0dc5e7d972f

app.get("/products/:productId", async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;



    try {


        const respo = await request(`${getbaseurl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        const result = JSON.parse(respo);
        res.json(result)


    } catch (error) {
        res.json("error ").status(404)

    }
}






)

// demo url:http://localhost:1000/products/search/mac?api_key=e77b66583089269b1854a0dc5e7d972f

app.get("/products/search/:searchquery", async (req, res) => {
    const { searchquery } = req.params
    const { api_key } = req.query;




    try {


        const respo = await request(`${getbaseurl(api_key)}&url=https://www.amazon.com/s?k=${searchquery}`)
        const result = JSON.parse(respo);
        res.json(result)


    } catch (error) {
        res.json("error ").status(404)

    }
}






)

// api for product reviews 
// demo url :http://localhost:1000/products/B08CZT64VP/reviews?api_key=e77b66583089269b1854a0dc5e7d972f

app.get("/products/:productId/reviews", async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query

    try {
        const response = await request(`${getbaseurl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`);
        const result = JSON.parse(response)
        res.json(result)
    } catch (error) {
        res.json("error while showing reviews")

    }
})
app.listen((PORT), () => {
    console.log(`http://localhost:${PORT}`)
})