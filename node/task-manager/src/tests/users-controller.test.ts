import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("UsersController", () => {
  let user_id: number

  afterAll(async() => {
    await prisma.user.delete({ where: { id: user_id } })
  })

  it('should be able to create a new user successfully', async () => {
    const response = await request(app).post("/users").send({
      name: 'Test user',
      email: 'testUser@example.com',
      password: '123456'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    expect(response.body.name).toBe('Test user')

    user_id = response.body.id
  })

  it('should throw an error if user with same email already exists', async () => {
    const response = await request(app).post("/users").send({
      name: 'Duplicate user',
      email: 'testUser@example.com',
      password: '123456'
    })
    
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User with same email already exists.')
    
  })

  it('should throw a validation error if email is invalid', async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "invalid-email",
      password: "password123"
    })

    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Validation error.")
  })
})