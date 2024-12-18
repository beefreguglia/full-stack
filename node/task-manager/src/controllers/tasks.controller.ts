import { prisma } from '@/database/prisma';
import { Request, Response } from 'express'
import { z } from 'zod'

class TasksController {
  async index(request: Request, response: Response) {
    const taskParamsSchema = z.object({
      teamId: z.coerce.number(),
    });
    
    const { teamId } = taskParamsSchema.parse(request.params);
    
    const tasks = await prisma.task.findMany({
      where: { teamId }
    })

    console.log(tasks)

    return response.json({ tasks })
  }

  async create(request: Request, response: Response) {
    const taskBodySchema = z.object({
      assignedTo: z.coerce.number(),
      title: z.string(),
      description: z.string().optional(),
      status: z.enum(['pending', 'in_progress', 'completed']).optional().default('pending'),
      priority: z.enum(['low', 'medium', 'high']).optional().default('low'),
    });

    const { 
      title, 
      assignedTo,
      description,
      priority, 
      status,
    } = taskBodySchema.parse(request.body);

    const taskParamsSchema = z.object({
      teamId: z.coerce.number(),
    });
    
    const { teamId } = taskParamsSchema.parse(request.params);

    const task = await prisma.task.create({
      data: {
        title,
        teamId,
        assignedTo,
        description,
        priority,
        status,
      }
    });

    return response.status(201).json({ task });
  }


  get() {}

  update() {}

  delete() {}
}

export { TasksController }