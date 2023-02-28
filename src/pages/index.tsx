import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getProducts } from '../lib/products'
import { Product, Room } from '@prisma/client'
import { MagnifyingGlass, Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';

import { getRooms } from '@/lib/rooms'
import { useEffect, useState } from 'react'
import { NewProduct } from '@/components/newProduct'
import { toast } from 'react-toastify'

type ProductsProps = {
  products: Product[]
  rooms: Room[]
}

export default function Home({ products, rooms }: ProductsProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>('0');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(products)
  const [searchProduct, setSearchProduct] = useState<string>('')

  useEffect(() => {
    let filteredProducts = products;

    if (selectedRoom !== '0') {
      filteredProducts = filteredProducts.filter(
        product => product.room_id === selectedRoom
      );
    }

    if (searchProduct !== '') {
      filteredProducts = filteredProducts.filter(
        product => product.name.toLowerCase().indexOf(searchProduct.toLowerCase()) > -1
      )
    }

    setSelectedProducts(filteredProducts);

  }, [selectedRoom, searchProduct])


  return (
    <>
      <Head>
        <title>BellWell</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='container bg-zinc-50'>
        <header className='p-4 bg-zinc-100'>
          <div className='flex items-center justify-between'>

            <h1 className='font-bold text-3xl p-2'>BellWell</h1>

            <Dialog.Root>
              <Dialog.Trigger className='flex items-center gap-1 h-10 p-2 text-sm font-bold border-2 border-slate-900 rounded-lg'>
                <Plus size={20} />
                Novo Item
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className='w-screen h-screen bg-zinc-800/70 fixed inset-0' />
                <Dialog.Content className='absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-xs bg-white rounded-xl p-2'>
                  <Dialog.Close className='absolute right-3 top-3 text-zinc-800 hover:text-zinc-600 transition-all'>
                    <X size={24} aria-label='Fechar' />
                  </Dialog.Close>

                  <div className='px-2'>
                    <Dialog.Title className='text-3xl leading-tight font-bold mt-6 mb-4'>
                      Adicionar Produto
                    </Dialog.Title>
                    <NewProduct rooms={rooms} />
                  </div>

                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>


          </div>
          <div className="w-full my-4">
            <form>
              <div className="flex">
                <select
                  className="py-1 px-1 text-sm font-medium text-gray-900 bg-gray-50 rounded-l-xl border border-gray-300   "
                  onChange={e => setSelectedRoom(e.target.value)}
                  value={selectedRoom}
                >
                  <option selected value='0'>Comodos</option>
                  {rooms.map(room => {
                    return (
                      <option
                        key={room.id}
                        value={room.id}
                      >
                        {room.name}
                      </option>
                    )
                  })}
                </select>
                <div className="relative w-full">
                  <input
                    type="search"
                    className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-xl border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Procurar produtos..."
                    value={searchProduct}
                    onChange={e => setSearchProduct(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-emerald-600 rounded-r-xl border border-gray-300 focus:outline-none">
                    <MagnifyingGlass className='w-5 h-5' />
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </header>

        <main className='grid grid-cols-12 gap-3 mt-5'>

          {selectedProducts.map(product => {
            return (
              <div key={product.id} className='col-span-12 flex justify-center'>
                <div className='w-[80%] border border-gray-200 rounded-lg shadow p-2'>
                  <img src={product.image_url} alt={`Imagem do produto ${product.name}`} className='shadow-lg' />

                  <h3 className='font-bold text-lg mt-4'>{product.name}</h3>

                  <p className='font-light text-sm'>Este item pode ser adquirido no {product.description}</p>
                  <div className='w-full text-center my-4 '>
                    <a href={product.link} rel="noopener noreferrer" target="_blank" className='bg-emerald-600 h-10 p-2 rounded-lg text-white'>Compre Agora</a>
                  </div>
                </div>
              </div>
            )
          })}
        </main>
      </div >

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProducts()
  const rooms = await getRooms()

  return {
    props: {
      products,
      rooms
    }
  }
}