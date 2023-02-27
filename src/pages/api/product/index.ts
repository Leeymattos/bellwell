// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { createProduct, getProducts } from '@/lib/products';
import { Product } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
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
    const product: Product = req.body;
    const createeProduct = await createProduct(product)

    return res.status(201).json({
      data: product
    })
  }
}
