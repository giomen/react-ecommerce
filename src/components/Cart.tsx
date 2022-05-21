import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import { ProductModel } from '../shared/models/products.model';
import {
  addItemToCart,
  removeItemFromCart,
} from '../store/features/cart/cartSlice';

const Cart = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const calculatePrice = (item: ProductModel) =>
    item.quantity! * parseFloat(item.variants[0].price);

  const cartTotal = useAppSelector((state) => {
    let partialTotal = 0;
    state.cart.items.forEach((item) => {
      partialTotal += calculatePrice(item);
    });
    return partialTotal;
  });

  const handleRemoveItemFromCart = (id: number) =>
    dispatch(removeItemFromCart(id));

  const maxSelItems = useAppSelector((state) => state.cart.maxSelectableItems);

  const handleChangeQuantity = (item: ProductModel, q: string) => {
    const quantity = parseInt(q);
    return dispatch(addItemToCart({ ...item, quantity }));
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Carrello</h1>
              <h2 className="font-semibold text-2xl">
                {items.length} Prodotti
              </h2>
            </div>
            <div>
              {items.length > 0 ? (
                <div>
                  <div className="flex mt-10 mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Dettaglio prodotto
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Quantità
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Prezzo
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Totale
                    </h3>
                  </div>
                  {items.map((item: ProductModel) => (
                    <div
                      key={item.id}
                      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    >
                      <div className="flex w-2/5">
                        <div className="w-20 h-full lg:w-20 lg:h-full">
                          <img
                            className="h-24 object-cover"
                            src={item.image.src}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {item.title}
                          </span>
                          <span className="text-red-500 text-xs">
                            {item.vendor}
                          </span>
                          <span
                            onClick={() => handleRemoveItemFromCart(item.id)}
                            className="cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs"
                          >
                            Rimuovi
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <select
                          className="mx-2 border text-center w-15"
                          value={item.quantity}
                          onChange={(e) =>
                            handleChangeQuantity(item, e.target.value)
                          }
                        >
                          {[...Array(maxSelItems)].map((_, i) => (
                            <option key={i}>{i + 1}</option>
                          ))}
                        </select>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        €{item.variants[0].price}
                      </span>
                      quantità{item.quantity}
                      <span className="text-center w-1/5 font-semibold text-sm">
                        (x {item.quantity}) €{calculatePrice(item)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <Link
              to="'/"
              className="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continua con gli acquisti
            </Link>
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Riepilogo Ordine
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {items.length} Prodotti
              </span>
              <span className="font-semibold text-sm">€{cartTotal}</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                spedizione
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Corriere Standard - €0,00</option>
                <option>Corriere Espresso - €10,00</option>
              </select>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>€{cartTotal}</span>
              </div>
              <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
