import { Product, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getProducts() {
  const products = await prisma.product.findMany()

  return products;
}

export async function createProduct(Product: Product): Promise<Product> {
  const product = await prisma.product.create({
    data: Product
  })

  return product
}