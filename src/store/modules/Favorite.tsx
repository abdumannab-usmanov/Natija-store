import create from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreType, } from './Products';


export type FavoriteProducts = {
	liked: StoreType[];
	addFavorite: (data: StoreType) => void;
  deleteFovorite:(id:number) => void
};


const FavoriteProducts = create<FavoriteProducts>()(
	persist(
		(set, get) => ({
			liked: [],
			addFavorite: (data: StoreType) => {
				set(() => ({ liked: [...get().liked, data] }));
			},
      deleteFovorite:((id) => {
        set(() => ({
          liked: get().liked.filter((item) => item.id !== id)
        }))
      })
		}),
		{ name: 'Favorite' }
	)
);

export default FavoriteProducts;
