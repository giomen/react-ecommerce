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

const Product = () => {
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

    dispatch(addItemToCart({ ...item, quantity }));
  };

  return (
    <div className="bg-white">
      {Object.keys(product).length > 0 ? (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
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
                {activeCollection?.name}
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
            <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={product.image.src}
                alt={product.image.alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {product.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">
                {product.variants[0].price}
              </p>

              <div className="mt-10">
                <button
                  onClick={() => handleAddItemToCart(product)}
                  className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add to cart
                </button>
              </div>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
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

                <div className="mt-4 space-y-6">
                  {product.tags.split(', ').map((tag) => (
                    <p key={tag} className="text-sm text-gray-600">
                      {tag}
                    </p>
                  ))}
                </div>
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
