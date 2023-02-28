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
        name: z.string({ required_error: "Name is required" }),
        description: z.string(),
        link: z.string(),
        image_url: z.string(),
        room_id: z.string()
      })

      const result = createProductSchema.parse(req.body);

      const product = createProduct(result);

      return res.status(201).send({ product })
    } catch (e) {
      res.status(400).send({ error: e })
    }

  }
}
