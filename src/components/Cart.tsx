import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { ProductModel } from '../shared/models/products.model';
import {
  addItemToCart,
  clearCart,
  removeItemFromCart,
  setToggleLogin,
} from '../store/features/cart/cartSlice';
import ModalWrapper from './ModalWrapper';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const isLogged = useAppSelector((state) => state.cart.logged);

  const calculatePrice = (item: ProductModel) =>
    (item.quantity! * parseFloat(item.variants[0].price)).toFixed(2);

  const cartTotal = useAppSelector((state) => {
    let partialTotal = 0;
    state.cart.items.forEach((item) => {
      partialTotal += parseFloat(calculatePrice(item));
    });
    return partialTotal;
  });

  const handleRemoveItemModal = (id: number) => {
    dispatch(removeItemFromCart(id));
    setIsOpen((oldValue) => !oldValue);
  };

  const handleRemoveItemFromCart = () => {
    setIsOpen((oldValue) => !oldValue);
  };

  const handleProceed = () => {
    dispatch(setToggleLogin(isLogged ? false : true));
    console.log('isLogged: ', isLogged, isOpen);
    isLogged && setIsOpen((oldValue) => !oldValue);
  };

  const handleCheckoutModal = () => {
    dispatch(clearCart());
    setIsOpen((oldValue) => !oldValue);
  };

  const maxSelItems = useAppSelector((state) => state.cart.maxSelectableItems);

  const checkIfProceed = () =>
    items.length === 0
      ? 'pointer-events-none opacity-75 grayscale'
      : ' hover:bg-indigo-600';

  const handleChangeQuantity = (item: ProductModel, q: string) => {
    const quantity = parseInt(q);
    return dispatch(addItemToCart({ ...item, quantity }));
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto mt-10">
        <div className="grid xs:grid-cols-1 md:grid-cols-12 my-10">
          <div className="bg-white col-span-1 sm:col-span-1 md:col-span-9 px-5 py-5 md:px-10 md:py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Carrello</h1>
              <h2 className="font-semibold text-2xl">
                {items.length} Prodott{items.length === 1 ? 'o' : 'i'}
              </h2>
            </div>
            <div>
              {items.length > 0 ? (
                <div>
                  <div className="md:flex mt-10 mb-5 hidden">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Dettaglio prodotto
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Quantità
                    </h3>
                    <h3 className="font-semibold text-right text-gray-600 text-xs uppercase w-1/5 text-center">
                      Prezzo
                    </h3>
                    <h3 className="font-semibold text-right text-gray-600 text-xs uppercase w-1/5 text-center">
                      Totale
                    </h3>
                  </div>
                  {items.map((item: ProductModel) => (
                    <div
                      key={item.id}
                      className="sm:flex items-center hover:bg-gray-100 px-2 sm:px-0 py-2 sm:py-5"
                    >
                      <div className="flex sm:mb-0 mb-5 sm:w-2/5 xs:w-full">
                        <div className="w-20 h-full lg:w-20 lg:h-full">
                          <img
                            className="h-24 object-cover"
                            src={item.image.src}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <Link
                            to={`/products/${item.id}`}
                            state={{ collectionId: item.collectionId }}
                          >
                            {item.title}
                          </Link>
                          <span className="text-red-500 text-xs">
                            {item.vendor}
                          </span>
                          <span
                            onClick={() => handleRemoveItemFromCart()}
                            className="cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs"
                          >
                            Rimuovi
                          </span>
                        </div>
                      </div>
                      <div className="flex mb-5 sm:mb-0 sm:justify-center w-1/5">
                        <select
                          className="sm:mx-2 border text-center w-15"
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
                      <span className="flex sm:inline justify-end text-right w-1/5 font-semibold text-sm">
                        €{item.variants[0].price}
                      </span>
                      <span className="flex sm:inline justify-end text-right w-1/5 font-semibold text-sm">
                        (x {item.quantity}) €{calculatePrice(item)}
                      </span>
                      <ModalWrapper
                        isOpen={isOpen}
                        itemId={item.id}
                        setIsOpen={handleRemoveItemModal}
                        title="Rimuovi prodotto dal carrello"
                        description="Sei sicuro di voler rimuovere gli articoli?"
                        fullAction={true}
                        confirmBtnText="Rimuovi"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <Link
              to="/"
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
          <div
            id="summary"
            className="col-span-1 sm:col-span-1 md:col-span-3 px-8 py-10"
          >
            <h1 className="font-semibold text-2xl border-b pb-8">
              Riepilogo Ordine
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {items.length} Prodott{items.length === 1 ? 'o' : 'i'}
              </span>
              <span className="font-semibold text-sm">€{cartTotal}</span>
            </div>
            <div className="border-t mt-12">
              <button
                onClick={() => handleProceed()}
                className={`bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full ${checkIfProceed()}`}
              >
                Procedi al pagamento
              </button>
            </div>
            <ModalWrapper
              isOpen={isOpen}
              setIsOpen={handleCheckoutModal}
              title="Pagamento Effettuato"
              description="Grazie per l'acquisto"
              fullAction={false}
              confirmBtnText="chiudi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
