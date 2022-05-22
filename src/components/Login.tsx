import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { LockClosedIcon } from '@heroicons/react/solid';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen((oldState) => !oldState)}
        className="ml-8 whitespace-nowrap text-base font-medium text-indigo-500 hover:text-indigo-600 cursor-pointer"
      >
        Login
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                          <div className="max-w-md w-full space-y-8">
                            <div>
                              <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                              />
                              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Sign in to your account
                              </h2>
                              <p className="mt-2 text-center text-sm text-gray-600">
                                Or{' '}
                                <a
                                  href="#"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  start your 14-day free trial
                                </a>
                              </p>
                            </div>
                            <form
                              className="mt-8 space-y-6"
                              action="#"
                              method="POST"
                            >
                              <input
                                type="hidden"
                                name="remember"
                                defaultValue="true"
                              />
                              <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                  <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                  >
                                    Email address
                                  </label>
                                  <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="password" className="sr-only">
                                    Password
                                  </label>
                                  <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                  <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-900"
                                  >
                                    Remember me
                                  </label>
                                </div>

                                <div className="text-sm">
                                  <NavLink
                                    to="#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Forgot your password?
                                  </NavLink>
                                </div>
                              </div>

                              <div>
                                <button
                                  type="submit"
                                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon
                                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  Sign in
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Login;
