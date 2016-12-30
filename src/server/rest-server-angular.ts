import * as express from "express";
import * as path from "path";


const app = express();

app.use('/',             express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));


class Product {
    constructor(
        public id: number,
        public title: string,
        public price: number){}
}


const products = [
    new Product(0, "First Product", 24.99),
    new Product(1, "Second Product", 64.99),
    new Product(2, "Third Product", 74.99)
];


function getProducts(): Product[] {
    console.log("rest-server-angular:  getProducts()");
    return products;
}


app.get('/', (req, res) => {
    console.log("rest-server-angular:  getRoot()  sending file  client/main.html");
    res.sendFile(path.join(__dirname, '../client/main.html'));
});


app.get('/products', (req, res) => {
    console.log("rest-server-angular:  get Products()");
    res.json(getProducts());
});


function getProductById(productId: number): Product {
    console.log("rest-server-angular:  getProductsById() id="+productId);
    return products.find(p => p.id === productId);
}


app.get('/products/:id', (req, res) => {
    console.log("rest-server-angular:  getProduct() in JSON for id="+req.params.id);
    res.json(getProductById(parseInt(req.params.id)));
});


const server = app.listen(4200, "localhost", () => {
    const {address, port} = server.address();
    console.log('Listening on %s %s', address, port);
});
