import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { List, X } from 'phosphor-react'
import logo from '../assets/Frame 1.png'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Contato', href: '/contact', current: false },
  { name: 'Login', href: '/api/auth/login', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '/' },
  { name: 'Settings', href: '/' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {

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
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-zinc-600 text-white' : 'text-zinc-800 hover:bg-zinc-100 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                {/* <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div> */}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  )
}