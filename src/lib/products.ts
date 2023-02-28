import { Product, PrismaClient } from '@prisma/client'

interface CreateProduct {
  name: string,
  description: string,
  link: string,
  image_url: string,
  room_id: string
}

const prisma = new PrismaClient()

export async function getProducts() {
  const products = await prisma.product.findMany()

  return products;
}

export async function createProduct(Product: CreateProduct): Promise<Product> {
  const product = await prisma.product.create({
    data: Product
  })

  return product
}