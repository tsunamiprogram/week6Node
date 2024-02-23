const request = require("supertest")
const app = require("../app")

const URL_BASE = '/users'
let TOKEN

const user = {
  firstName: 'Rene',
  lastName: 'Rivera',
  email: 'rene@gmail.com',
  password: 'rene1234',
  phone: '+231321'
}

beforeAll(async () => {
    const user = {
        email: "fernando@gmail.com",
        password: '123'
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(user)

    TOKEN = res.body.TOKEN


})

test("Get -> 'URL_BASE', should return status code 200, res.body to be defined and res.boy.length === 1 ", 
async() => {
    const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("POST -> 'URL_BASE', should return status code 201, res.body to be defined and res.body.firstName === user.firstName ", async () => {

  const res = await request(app)
    .post(URL_BASE)
    .send(user)

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.firstName).toBe(user.firstName)
})

test("Put -> 'URL_BASE/:id', should return status code 200, res.body to be defined and res.body.firstname firstName = 'frednerys'", 
async() => {
    const res = await request(app)
    .post(`${URL_BASE}/${userId}`)
    .send(user)
    .send({firstName: "frednerys"})
    .set("Authorization", `bearer ${TOKEN}`)
})

test("Post -> 'URL_BASE/login', should return status code 200, res.body to be defined, res.body.user.email ==== user.email, and res.body.token to be defined", 
async() => {
    const userLogin = {
        email: "",
        password: ""
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(userLogin)

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.user.email).toBe(userLogin.email)
expect(res.body.token).toBeDefined()
})

test("Post -> 'URL_BASE/login', should return status code 401", 
async() => {
    const userLogin = {
        email: "rene@gmail",
        password: "1234"
    }
    const res = await request(app)
    .post(`${URL_BASE}/login`)
    .send(userLogin)

expect(res.statusCode).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.user.email).toBe(userLogin.email)
expect(res.body.token).toBeDefined()
})
test("Delete -> 'URL_BASE/:id', should return status code 204", 
async () => {
    const res = await request(app)
    .delete()
    .set('Authorization' `Bearer ${TOKEN}`)

    EXPECT(res.statusCode).toBe(204)
})