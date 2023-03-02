// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createProduct, getProducts } from '@/lib/products';
import { Product } from '@prisma/client';
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
        description: z.string(),
        link: z.string(),
        image_url: z.string(),
        room_id: z.string()
      })


      console.log(req.body)
      const result = await createProductSchema.parse(req.body);

      console.log(result)


      return res.status(201).send({ result })
    } catch (e) {
      console.log(e)
      res.status(404).send({ error: e })
    }

  }
}
