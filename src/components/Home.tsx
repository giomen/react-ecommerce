import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { DOMAIN, ROUTE_PATHS } from '../shared/app-constants';
import { CollectionListing } from '../shared/models/collectionListing.model';
import {
  getCollections,
  setActiveCollection,
} from '../store/features/collections/collectionsSlice';
import Loader from './Loader/Loader';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCollections(`${DOMAIN}/${ROUTE_PATHS.COLLECTION_LISTING}`));
  }, [dispatch]);

  const collections = useAppSelector((state) => state.collections.collections);

  const handleClickCollection = (id: number) =>
    dispatch(setActiveCollection(id));

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-0 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-center">Scopri</span>{' '}
            <span className="block text-indigo-600 text-center">
              le nostre nuove collezioni
            </span>
          </h1>
        </div>
        <div className="mt-6 grid place-items-center grid-flow-col sm:gap-4 xl:gap-x-8">
          {collections.length > 0 ? (
            collections.map((item: CollectionListing) => (
              <div key={item.collection_id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={item.default_product_image.src}
                    alt={item.handle}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-6 text-base font-semibold text-gray-900">
                  <Link
                    to={`/collections/${item.collection_id}`}
                    onClick={() => handleClickCollection(item.collection_id)}
                  >
                    <span aria-hidden="true" className="absolute inset-0" />
                    {item.title}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
