import { ReactNode } from 'react';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { SoldType } from './SoldProducts';
import { message } from 'antd';

export type StoreType = {
	count: number;
	key: React.Key;
	title: string;
	img: ReactNode;
	id: number;
	quantity: number;
	price: number;
	checked: boolean;
};

export type UseProducts = {
	product: StoreType[];
	addProduct: (data: StoreType) => void;
	delete: (id: number) => void;
	deleteMultipleData: (arr: StoreType[]) => void;
	editHandler: (obj: StoreType) => void;
	substractProducts: (data: SoldType) => void;
};

const error = () => {
	message.error('This is an error message');
};

const UseProducts = create<UseProducts>()(
	persist(
		(set, get) => ({
			product: [],
			deleteMultipleData: (arr: StoreType[]) => {
				set(() => ({ product: arr }));
			},
			addProduct: (data: StoreType) => {
				set(() => ({ product: [...get().product, data] }));
			},
			delete: (id: number) => {
				set(() => ({
					product: get().product.filter((item) => item.id !== id),
				}));
			},
			editHandler: (obj) => {
				set(() => ({
					product: get().product.map((item) =>
						item.id === obj.id
							? {
									quantity: obj.quantity,
									img: obj.img,
									price: obj.price,
									title: obj.title,
									key: item.key,
									count: item.count,
									id: item.id,
									checked: obj.checked,
							  }
							: item
					),
				}));
			},
			substractProducts: (soldItems: SoldType) => {
				const changedProducts = get().product.map((item) => {
					if (item.id === soldItems.id && item.quantity > 0) {
						return {
							...item,
							quantity: item.quantity - soldItems.count,
						};
					}
					return item ;
				});

				set({ product: changedProducts });
			},
		}),
		{ name: 'Product' }
	)
);

export default UseProducts;
