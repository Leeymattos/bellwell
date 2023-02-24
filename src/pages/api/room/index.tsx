// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import { createRoom, getRooms } from '@/lib/rooms';
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
    const products = await getRooms()

    return res.status(200).json({
      data: products,
    })
  } else if (method === "POST") {
    const product = req.body;
    const createeProduct = await createRoom(product)

    return res.status(201).json({
      data: product
    })
  }
}
