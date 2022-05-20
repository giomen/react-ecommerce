import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login';

export interface HeaderProps {
  title: string;
  description: string;
}

const Header = (props: HeaderProps) => {
  const { title, description } = props;

  return (
    <header>
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1 align-middle">
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
            <div className="flex justify-start lg:w-0 lg:flex-1 align-middle">
              <NavLink
                to="/"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Home
              </NavLink>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <NavLink
                to="/cart"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Carrello
              </NavLink>
              <Login />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
