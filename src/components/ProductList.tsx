import { useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  DOMAIN,
  PARTIAL_ROUTE_PATHS,
  ROUTE_PATHS,
} from '../shared/app-constants';
import { Product } from '../shared/models/products.model';
import { getProductsInCollection } from '../store/features/products/productsSlice';

const ProductList = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('products in collection');
    dispatch(
      getProductsInCollection(
        `${DOMAIN}/${PARTIAL_ROUTE_PATHS.COLLECTIONS}/${id}/${ROUTE_PATHS.PRODUCTS}`
      )
    );
  }, [id, dispatch]);

  const products = useAppSelector((state) => state.products.products);
  const activeCollection = useAppSelector(
    (state) => state.collections?.activeCollection
  );

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-0 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {activeCollection?.name}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <div key={product.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.image.src}
                  alt={product.image.alt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/products/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-left text-sm text-gray-500">
                    {product.vendor}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.product_type}
                </p>
                {product.tags.split(', ').map((tag: string) => (
                  <p key={tag} className="text-xs text-sky-600">
                    {tag}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProductList;
