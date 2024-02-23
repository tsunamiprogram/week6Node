const request = require("supertest")
const app = require('../app')
const Category = require('../models/Product')
const Product = require("../models/Product")

//get publicos y los demas son privados

const URL_BASE_USER = '/users/login'
const URL_BASE = ''
let TOKEN
let category
let product

beforeAll(async() => {

    const user = {
        email: "fernando@gmail.com",
        password: '1234'
    }

    const res = await request(app)
    .post(URL_BASE_USER)
    .send(user)

    TOKEN =res.doby.token

category = await category.create({ name: "tecnologia"})

Product = {
    title: "pendrive 64gb",
    description: 'lorem20',
    price: 11.29,
    categotyId: category.id
}
})

test("Post -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.title === product.title", async () => {
    const res = await request(app)
    .post(URL_BASE)
    .send(product)
    .set('Authorization', `Berare ${TOKEN}`)
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
})

test("GET -> 'URL_BASE', should return status code 200, res.body to be defined and res.body.length === 1, res.body[0].category.id === category.id", 
async() => {

})