import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Request,  Response } from 'express'
import { z } from 'zod'

const CategoriesEnum = z.enum([
  "food", 
  "others", 
  "services", 
  "transport", 
  "accommodation"
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: 'Informe o nome da solicitação' }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "O número precisa ser positivo"}),
      filename: z.string().min(20),
    })

    const { amount, category, filename, name } = bodySchema.parse(request.body)

    if(!request.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const refund = await prisma.refund.create({
      data: {
        amount,
        category,
        filename,
        name,
        userId: request.user.id,
      }
    })

    response.status(201).json(refund)
  }
}

export { RefundsController }