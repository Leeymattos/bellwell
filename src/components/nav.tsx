import { Fragment, useContext, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bell, Book, House, List, Plus, SignIn, SignOut, X } from 'phosphor-react'
import logo from '../assets/Frame 1.png'
import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import { GetServerSideProps } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import * as Dialog from '@radix-ui/react-dialog';
import { NewProduct } from './newProduct'
import { Room } from '@prisma/client'

let navigation = [
  { name: 'Home', href: '/', current: true, icon: (<House />) },
  { name: 'Contato', href: '/contact', current: false, icon: (<Book />) },
  { name: 'Login', href: '/api/auth/login', current: false, icon: (<SignIn />) },
]
const userNavigation = [
  { name: 'Sair', href: '/api/auth/logout', icon: (<SignOut />) },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface navProps {
  pageNow: string
  isAdmin: boolean
  rooms: Room[]
}

export default function Nav({ pageNow, isAdmin, rooms }: navProps) {
  const { user } = useUser()

  useEffect(() => {
    navigation = navigation.map(link => {
      if (link.current)
        link.current = false
      if (link.href === pageNow)
        link.current = true

      return link
    })
  }, [pageNow])

  return (
    <>
      <div>
        <Disclosure as="nav" className="bg-zinc-100 mb-2 text-zinc-800">
          {({ open }: any) => (
            <>
              <div className="max-w-7xl mr-4">
                <div className="flex h-16 items-center justify-between">

                  {/* logo e menu desktop */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src={logo}
                        alt='logo'
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className='text-zinc-800'
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-zinc-400 p-2 text-zinc-900 border border-zinc-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <X className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <List className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 mt-2 sm:px-3">
                  {navigation.map((item) => {
                    if (item.name === "Login" && user) {
                      return (
                        <></>
                      )
                    } else {
                      return (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-zinc-600 text-white' : 'text-zinc-800 hover:bg-zinc-100 hover:text-white',
                            'flex items-center gap-1 px-3 py-2 rounded-md text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.icon}
                          {item.name}
                        </Disclosure.Button>
                      )
                    }
                  })}
                </div>
                {user && (
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      {user.picture && (
                        <div className="flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={user.picture} alt="avatar" />
                        </div>
                      )
                      }
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-zinc-800">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-zinc-800">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {user && isAdmin ? (
                        <Dialog.Root>
                          <Dialog.Trigger className='flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-zinc-800 hover:bg-gray-700 hover:text-white'>
                            <Plus />
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
                        </Dialog.Root>
                      ) : (<></>)}

                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="flex items-center gap-1 rounded-md px-3 py-2 text-base font-medium text-zinc-800 hover:bg-gray-700 hover:text-white"
                        >
                          {item.icon}
                          {item.name}
                        </Disclosure.Button>
                      ))}

                    </div>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}

