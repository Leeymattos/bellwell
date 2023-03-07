// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteProduct } from '@/lib/products';
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod';
/* 
type Data = {
  name: string    Aprender a utilizar desta forma
} */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method === "DELETE") {
    try {
      const deleteProductSchema = z.object({
        productId: z.string().uuid()
      })

      const deleteProductId = deleteProductSchema.parse(req.query)

      const response = await deleteProduct(deleteProductId)

      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
