import { WineTypeEnum } from '@/feature/wines/schema/wine.schema';
import {
  DEFAULT_WINE_FILTER_VALUES,
  WineFilterFormValues,
} from '@/feature/wines/schema/wine-filter.schema';
import { getWines } from '@/feature/wines/services/wine.service';

import WinesClientView from './WinesClientView';

const WinesPage = async () => {
  const initialFilters: WineFilterFormValues = DEFAULT_WINE_FILTER_VALUES;

  const initialWines = await getWines({
    limit: 5,
    type: initialFilters.wineType.toUpperCase() as WineTypeEnum,
    minPrice: initialFilters.priceRange[0],
    maxPrice: initialFilters.priceRange[1],
    rating: initialFilters.rating > 0 ? initialFilters.rating : undefined,
    name: initialFilters.name,
  });

  return (
    <WinesClientView
      initialWines={initialWines}
      initialFilters={initialFilters}
    />
  );
};

export default WinesPage;
