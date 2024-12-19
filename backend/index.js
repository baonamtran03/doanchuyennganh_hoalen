const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// API
const authentication = require('./src/authentication');
const product = require('./src/product');
const category = require('./src/category');
const warehouse = require('./src/warehouse');
const order = require('./src/order');
const orderItem = require('./src/order_item')

const app = express();
const port = 3333;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'flower_shop'
});

db.connect((err) => {
    if (err) {
        console.error('Kết nối cơ sở dữ liệu không thành công: ' + err.stack);
        return;
    }
    console.log('Đã kết nối với cơ sở dữ liệu.');
});

// Middleware to verify JWT token
const middleware = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(403).json({ message: 'Không có mã thông báo nào được cung cấp' });
    }
    // Get token from header, remove Bearer word and space
    const token = req.headers['authorization'].split(' ')[1];

    jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Không thể xác thực mã thông báo' });
        }
        req.userId = decoded.iduser;
        next();
    });
};

// Đăng nhập và đăng ký
app.post('/login', (req, res) => {
    return authentication.login(req, res, db);
});

app.post('/signup', (req, res) => {
    return authentication.signup(req, res, db);
});

// Sản phẩm
//tạo
app.post('/products', middleware, (req, res) => {
    return product.createProduct(req, res, db);
});

//cập nhật
app.put('/products/:id', middleware, (req, res) => {
    return product.editProduct(req, res, db);
});

app.delete('/products/:id', middleware, (req, res) => {
    return product.deleteProduct(req, res, db);
});
//lấy
app.get('/products', (req, res) => {
    return product.getProducts(req, res, db);
});



//DANH MỤC
app.post('/categories', middleware, (req, res) => {
    return category.createCategory(req, res, db);
});

app.put('/categories/:id', middleware, (req, res) => {
    return category.editCategory(req, res, db);
});

app.delete('/categories/:id', middleware, (req, res) => {
    return category.deleteCategory(req, res, db);
});

app.get('/categories', middleware, (req, res) => {
    return category.getCategories(req, res, db);
});

// KHO
app.post('/warehouses', middleware, (req, res) => {
    return warehouse.createWarehouse(req, res, db);
});

app.put('/warehouses/:id', middleware, (req, res) => {
    return warehouse.editWarehouse(req, res, db);
});

app.delete('/warehouses/:id', middleware, (req, res) => {
    return warehouse.deleteWarehouse(req, res, db);
});

app.get('/warehouses', middleware, (req, res) => {
    return warehouse.getWarehouses(req, res, db);
});

// Đơn hàng
app.post('/orders', middleware, (req, res) => {
    return order.createOrder(req, res, db);
});

app.put('/orders/:id', middleware, (req, res) => {
    return order.editOrder(req, res, db);
});

app.delete('/orders/:id', middleware, (req, res) => {
    return order.deleteOrder(req, res, db);
});

app.get('/orders', middleware, (req, res) => {
    return order.getOrders(req, res, db);
});

// Chi tiết đơn hàng
app.post('/order_items', middleware, (req, res) => {
    return orderItem.createOrderItem(req, res, db);
});

app.put('/order_items/:id', middleware, (req, res) => {
    return orderItem.editOrderItem(req, res, db);
});

app.delete('/order_items/:id', middleware, (req, res) => {
    return orderItem.deleteOrderItem(req, res, db);
});

app.get('/order_items', middleware, (req, res) => {
    return orderItem.getOrderItems(req, res, db);
});
//Khởi động server
app.listen(port, () => {
    console.log(`Máy chủ chạy trên cổng ${port}`);
});