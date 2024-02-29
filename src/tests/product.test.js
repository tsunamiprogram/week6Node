require("../models")
const request = require("supertest")
const app = require('../app')
const Category = require('../models/Category')
const Product = require("../models/Product")


//get publico y los demas son privados

const URL_BASE_USER = '/users/login'
const URL_BASE = '/products'
let TOKEN
let category
let product
// let productId

beforeAll(async() => {

    const user = {
        email: "fernando@gmail.com",
        password: '1234'
    }

    const res = await request(app)
    .post(URL_BASE_USER)
    .send(user)

    TOKEN = res.body.token

//primera instancia
category = await Category.create({name: "pantallas"})

product = {
    title: 'LG curve 90',
    description: 'lorem20',
    price: 111.28,
    categoryId: category.id
}
})

test("Post -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.title === product.title", async () => {
    const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("GET -> 'URL_BASE', should return status code 200, res.body to be defined and res.body.length === 1, res.body[0].category.id === category.id", 
async() => {
    const res = await request(app)
    .get(URL_BASE)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)

    await category.destroy()

})