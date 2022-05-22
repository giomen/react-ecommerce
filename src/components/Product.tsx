import DOMPurify from 'dompurify';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  DOMAIN,
  PARTIAL_ROUTE_PATHS,
  ROUTE_PATHS,
} from '../shared/app-constants';
import { ProductModel } from '../shared/models/products.model';
import { addItemToCart } from '../store/features/cart/cartSlice';
import { getProduct } from '../store/features/product/productSlice';
import Loader from './Loader/Loader';
import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation();
  const { collectionId }: any = location.state;
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getProduct(
        `${DOMAIN}/${PARTIAL_ROUTE_PATHS.PRODUCTS}/${id}${ROUTE_PATHS.PRODUCT}`
      )
    );
  }, [id, dispatch]);

  const product = useAppSelector((state) => state.product.product);
  const itemsInCart = useAppSelector((state) => state.cart.items);
  const activeCollection = useAppSelector(
    (state) => state.collections.activeCollection
  );

  const handleAddItemToCart = (item: ProductModel) => {
    const existingItem = itemsInCart.find(
      (cartItem) => cartItem.id === item.id
    );

    const quantity = existingItem ? existingItem.quantity! + 1 : 1;

    dispatch(addItemToCart({ ...item, quantity, collectionId }));
  };

  return (
    <div className="bg-white">
      {Object.keys(product).length > 0 ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl">
              <li>
                <div className="flex items-center">
                  <NavLink
                    to={`/collections/${activeCollection?.id}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {activeCollection?.name}
                  </NavLink>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="tmr-2 text-sm font-medium text-gray-900">
                {product.title}
              </li>
            </ol>
          </nav>

          <div className="mt-6 max-w-2xl mx-auto sm:px-6 md:max-w-7xl md:px-8 md:grid md:grid-cols-2 md:gap-x-8  md:px-8 md:grid-rows-[auto,1fr]">
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={product.image.src}
                alt={product.image.alt}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* Product info */}
            <div className="max-w-2xl mx-auto sm:pt-10 md:pt-0 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8">
              <div className="lg:col-span-2 lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product.title}
                </h1>
              </div>

              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p
                      className="text-base text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(product.body_html),
                      }}
                    ></p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Tags</h2>

                  <div className="flex items-center py-4">
                    {product.tags.split(', ').map((tag) => (
                      <NavLink
                        key={tag}
                        to="#"
                        className="text-sm mr-4 text-indigo-500 hover:text-indigo-700"
                      >
                        {tag}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              {/* Options */}
              <div className="flex justify-between items-center mt-4 lg:mt-0 lg:row-span-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-2xl text-gray-900 mr-4">
                  €{product.variants[0].price}
                </p>
                <button
                  onClick={() => handleAddItemToCart(product)}
                  className="bg-indigo-500 border border-transparent py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Product;
