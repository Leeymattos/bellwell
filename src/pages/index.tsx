import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getProducts } from '../lib/products'
import { Product, Room } from '@prisma/client'
import { MagnifyingGlass, Plus, SignIn, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';
import { getRooms } from '@/lib/rooms'
import { useEffect, useState } from 'react'
import { NewProduct } from '@/components/newProduct'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { api } from '@/services/api'
import { Flip, toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../assets/1 (1).png'
import Nav from '@/components/navbar'

type ProductsProps = {
  products: Product[]
  rooms: Room[]
}

export default function Home({ products, rooms }: ProductsProps) {

  const [deletingProductId, setDeletingProductId] = useState('')
  const [selectedRoom, setSelectedRoom] = useState<string>('0');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(products);
  const [searchProduct, setSearchProduct] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    let filteredProducts = products

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
    setDeletingProductId('');

  }, [selectedRoom, searchProduct, products])

  async function handleDeleteProduct(id: string) {
    try {
      const res = await api.delete(`/product/${id}`);

      router.replace(router.asPath);
      setDeletingProductId(id);

      toast.success('Produto excluído com sucesso!', {
        transition: Flip,
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });

    } catch (error) {
      toast.error(`Produto não excluído, tente novamente!`, {
        transition: Flip,
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      console.log(error);
    }
  }
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
          <Nav />
          <div className='flex items-center justify-between'>

            {/* <Dialog.Root>
              <Dialog.Trigger className='flex items-center gap-1 h-10 p-2 text-sm font-bold border-2 border-slate-900 rounded-lg focus:outline-slate-500 '>
                <Plus size={20} />
                Novo Item
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className='bg-zinc-800/70 data-[state=open]:animate-overlayShow fixed inset-0' />
                <Dialog.Content className='data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
                  <Dialog.Close asChild className='absolute right-3 top-3 text-zinc-800 hover:text-zinc-600 transition-all'>
                    <X size={24} aria-label='Fechar' />
                  </Dialog.Close>

                  <Dialog.Title className='text-3xl leading-tight font-bold mt-6 mb-4'>
                    Adicionar Produto
                  </Dialog.Title>
                  <NewProduct rooms={rooms} />

                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root> */}

          </div>
          <div className="w-full my-4">
            <form>
              <div className="flex">
                <select
                  className="py-1 px-1 text-sm font-medium text-gray-900 bg-gray-50 rounded-l-xl border-2 border-gray-300 focus:border-slate-900 focus:outline-none"
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
                    className="block p-2.5 w-full z-20 text-sm font-medium text-gray-900 bg-gray-50 rounded-r-xl border-2 border-gray-300 focus:border-gray-900 focus:outline-none"
                    placeholder="Procurar produtos..."
                    value={searchProduct}
                    onChange={e => setSearchProduct(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute top-[2px] right-[1px] p-[9px] text-sm font-medium text-white bg-emerald-600 rounded-r-xl border border-gray-300 focus:outline-none">
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
              <div key={product.id} className={`col-span-12 flex justify-center ${deletingProductId === product.id ? "opacity-40" : ""}`}>
                <div className='w-[80%] border border-gray-200 rounded-lg shadow p-2'>
                  <img src={product.image_url} alt={`Imagem do produto ${product.name}`} className='shadow-lg' />

                  <h3 className='font-bold text-lg mt-4'>{product.name}</h3>

                  <p className='font-light text-sm'>Este item pode ser adquirido no {product.description}</p>
                  <div className='w-full my-4 flex justify-between'>
                    <a href={product.link} rel="noopener noreferrer" target="_blank" className='bg-emerald-600 h-10 p-2 rounded-lg text-white'>Compre agora</a>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger asChild>
                        <button className='bg-red-500 h-10 p-2 rounded-lg text-white'>Excluir</button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Portal>
                        <AlertDialog.Overlay className="bg-zinc-800/70 data-[state=open]:animate-overlayShow fixed inset-0" />
                        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                          <AlertDialog.Title className='text-2xl leading-tight font-bold mt-1 mb-4'>
                            Tem certeza absoluta?
                          </AlertDialog.Title>

                          <AlertDialog.Description className='text-zinc-500'>
                            Esta ação não pode ser desfeita. Isso excluirá permanentemente esse produto e removerá todos os dados.
                          </AlertDialog.Description>

                          <div className='flex justify-between mt-5'>
                            <AlertDialog.Cancel asChild>
                              <button className='bg-zinc-300 h-10 p-2 rounded-lg text-zinc-500 font-bold'>
                                Cancelar
                              </button>
                            </AlertDialog.Cancel>

                            <AlertDialog.Action asChild>
                              <button
                                className='bg-red-300 h-10 p-2 rounded-lg text-red-700 font-bold'
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Sim, exluir porduto
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Portal>
                    </AlertDialog.Root>
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