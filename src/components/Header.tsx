import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import Login from './Login';
import { MenuIcon, ShoppingCartIcon, XIcon } from '@heroicons/react/outline';
import { Disclosure } from '@headlessui/react';

export interface HeaderProps {
  title: string;
  description: string;
}

const Header = (props: HeaderProps) => {
  const { title, description } = props;
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Apri menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <div className="flex justify-start lg:flex-1 align-middle">
                    <NavLink to="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt=""
                      />
                    </NavLink>
                    <div className="px-2 flex items-center whitespace-nowrap text-base font-medium text-gray-500">
                      {title ? `${title} - Shop` : 'Shop'}
                    </div>
                    {description && (
                      <meta name="description" content={description}></meta>
                    )}
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <NavLink
                        to="/"
                        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                      >
                        Collezioni
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavLink
                  to="/cart"
                  className="p-1 text-gray-400 hover:text-gray-900"
                >
                  <span className="sr-only">Carrello</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </NavLink>
                {cartItems.length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {cartItems.length}
                  </span>
                )}
                <Login />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Disclosure.Button as="a" href="/" aria-current="page">
                Collezioni
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
