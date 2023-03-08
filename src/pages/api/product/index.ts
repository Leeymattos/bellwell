// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createProduct, getProducts } from '@/lib/products';
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

  if (method === "GET") {
    try {
      const products = await getProducts()

      return res.status(200).json({
        data: products,
      })
    } catch (error) {
      return res.status(400).json({ error: error })
    }
  } else if (method === "POST") {
    try {
      const createProductSchema = z.object({
        name: z.string({ required_error: "Name is required" }).min(4),
        description: z.string().min(5),
        link: z.string().min(5).max(1000),
        image_url: z.string().min(5),
        room_id: z.string().min(2)
      })

      const product = createProductSchema.parse(req.body);

      const createdProduct = await createProduct(product);

      return res.status(201).send({ createdProduct })

    } catch (e) {
      res.status(404).send({ e })
    }

  }
}
