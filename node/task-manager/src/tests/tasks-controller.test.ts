import request from "supertest"

import { app } from "@/app"
import { prisma } from "@/database/prisma"

describe("TasksController", () => {
  let user_id: number
  let team_id: number
  let task_id: number
  let task_id2: number
  let task_id3: number
  let task_id4: number

  afterAll(async() => {
    if(task_id) {
      await prisma.task.delete({ where: { id: task_id } })
    }
    if(task_id2) {
      await prisma.task.delete({ where: { id: task_id2 } })
    }
    if(task_id3) {
      await prisma.task.delete({ where: { id: task_id3 } })
    }
    if(task_id4) {
      await prisma.task.delete({ where: { id: task_id4 } })
    }
    if(user_id) {
      await prisma.user.delete({ where: { id: user_id } })
    }
    if(team_id) {
      await prisma.team.delete({ where: { id: team_id } })
    }
  })

  it('should be able to create a new task', async () => {
    const createdUserResponse = await request(app).post("/users").send({
      name: 'Auth Test User',
      email: 'authtestuser22@example.com',
      password: '123456'
    })
    
    const sessionResponse = await request(app).post("/sessions").send({
      email: 'authtestuser22@example.com',
      password: '123456'
    })
    
    user_id = createdUserResponse.body.id;

    const teamCreated = await request(app).post("/teams")
      .send({
        name: 'Team 1',
        description: 'description',
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);
    
    team_id = teamCreated.body.team.id;
    
    const taskCreated = await request(app).post(`/tasks/${teamCreated.body.team.id}`)
      .send({
        title: 'Task title 1',
        description: 'Task description',
        assignedTo:user_id,
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);

    task_id = taskCreated.body.task.id;

    expect(taskCreated.status).toBe(201);
    expect(taskCreated.body.task.title).toEqual('Task title 1');
    expect(taskCreated.body.task.description).toEqual('Task description');
  })
  
  it('should be able to create a new task', async () => {
    const createdUserResponse = await request(app).post("/users").send({
      name: 'Auth Test User',
      email: 'authtestuser22@example.com',
      password: '123456'
    })
    
    const sessionResponse = await request(app).post("/sessions").send({
      email: 'authtestuser22@example.com',
      password: '123456'
    })
    
    user_id = createdUserResponse.body.id;

    const teamCreated = await request(app).post("/teams")
      .send({
        name: 'Team 1',
        description: 'description',
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);
    
    team_id = teamCreated.body.team.id;
    
    const taskCreated2 = await request(app).post(`/tasks/${teamCreated.body.team.id}`)
      .send({
        title: 'Task title 1',
        description: 'Task description',
        assignedTo:user_id,
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);

    task_id2 = taskCreated2.body.task.id;

    const taskCreated3 = await request(app).post(`/tasks/${teamCreated.body.team.id}`)
      .send({
        title: 'Task title 1',
        description: 'Task description',
        assignedTo:user_id,
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);

    task_id3 = taskCreated3.body.task.id;

    const taskCreated4 = await request(app).post(`/tasks/${teamCreated.body.team.id}`)
      .send({
        title: 'Task title 1',
        description: 'Task description',
        assignedTo:user_id,
      })
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);

    task_id4 = taskCreated4.body.task.id;

    // expect(taskCreated.status).toBe(201);
    // expect(taskCreated.body.task.title).toEqual('Task title 1');
    // expect(taskCreated.body.task.description).toEqual('Task description');
  })
})