import create from 'zustand';
import { persist } from 'zustand/middleware';
import { StoreType } from './Products';

export type BasketProducts = {
	basket: StoreType[];
	addBasket: (data: StoreType) => void;
	deleteBasket: (id: number) => void;
	increaseProduct: (id: number) => void;
	dicreaseProducts: (id: number) => void;
	zeroProduct: (id: number) => void;
};

const BasketProducts = create<BasketProducts>()(
	persist(
		(set, get) => ({
			basket: [],
			addBasket: (data: StoreType) => {
				set(() => ({ basket: [...get().basket, data] }));
			},
			deleteBasket: (id) => {
				set(() => ({
					basket: get().basket.filter((item) => item.id !== id),
				}));
			},
			increaseProduct: (id) => {
				set((state) => ({
					basket: state.basket.map((item) => {
						if (item.id === id && item?.count < item.quantity) {
							return {
								...item,
								count: item.count + 1,
							};
						}
						return item;
					}),
				}));
			},
			dicreaseProducts: (id) => {
				set((state) => ({
					basket: state.basket.map((el) => {
						if (el.id === id && el?.count >= 1) {
							return {
								...el,
								count: el.count - 1,
							};
						}
						return el;
					}),
				}));
			},
			zeroProduct: (id) => {
				set((state) => ({
					basket: state.basket.map((el) => {
						if (el.id === id && el?.count >= 1) {
							return {
								...el,
								quantity: el.quantity - el.count,
								count: 0,
							};
						}
						return el;
					}),
				}));
			},
		}),
		{ name: 'Basket' }
	)
);

export default BasketProducts;
