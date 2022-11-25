import { Moment } from 'moment';
import create from 'zustand';
import { persist } from 'zustand/middleware';
export type SoldType = {
	title: string;
	id: number;
	count: number;
	price: number;
	quantity: number;
	date: string | Moment;
};

export type SoldProductsType = {
	sold: SoldType[];
	addSoldProducts: (data: SoldType) => void;
};

export const SoldProducts = create<SoldProductsType>()(
	persist(
		(set, get) => ({
			sold: [],
			addSoldProducts: (buy: SoldType) => {
				const haveProduct = get().sold.find((item) => item.id === buy.id);

				if (haveProduct) {
					const changedProducts = get().sold.map((item) => {
						if (item.id === buy.id) {
							return {
								...item,
								count: item.count + buy.count,
							};
						}
						return item;
					});
					set({ sold: changedProducts });
				} else {
					set({
						sold: [...get().sold, buy],
					});
				}
			},
		}),
		{ name: 'sold' }
	)
);

// export const SoldProducts = create<SoldProductsType>((set, get) => ({
// 	sold: [],
// 	addSoldProducts: (buy: SoldType) => {
// 		const haveProduct = get().sold.find((item) => item.id === buy.id);

// 		if (haveProduct) {
// 			const changedProducts = get().sold.map((item) => {
// 				if (item.id === buy.id) {
// 					return {
// 						...item,
// 						count: item.count + buy.count,
// 					};
// 				}
// 				return item;
// 			});
// 			set({ sold: changedProducts });
// 		} else {
// 			set({
// 				sold: [...get().sold, buy],
// 			});
// 		}
// 	},
// }));
