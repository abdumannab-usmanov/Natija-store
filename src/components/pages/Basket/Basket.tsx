import {
	CloseOutlined,
	MinusCircleOutlined,
	PlusCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Image, List, Typography } from 'antd';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { BasketProducts, UseProducts } from '../../../store';
import { SoldType } from '../../../store/modules/SoldProducts';
import { SoldProducts } from '../../../store/modules/SoldProducts';
import moment from 'moment';
import './basket.scss';
import { StoreType } from '../../../store/modules/Products';

const { Paragraph, Text, Title } = Typography;

export const Basket = () => {
	const basketItems = BasketProducts((state) => state.basket);
	const increaseProduct = BasketProducts((state) => state.increaseProduct);
	const deleteBasket = BasketProducts((state) => state.deleteBasket);
	const zeroProduct = BasketProducts((state) => state.zeroProduct);
	const dicreaseProduct = BasketProducts((state) => state.dicreaseProducts);
	const deleteProduct = BasketProducts((state) => state.deleteBasket);
	const [total, setTotal] = useState(0);
	const addSold = SoldProducts((state) => state.addSoldProducts);
	const substractProducts = UseProducts((state) => state.substractProducts);
	const IncreaseFunc = (item_id: number) => {
		increaseProduct(item_id);
	};

	const DecreaseFunc = (item_id: number) => {
		dicreaseProduct(item_id);
	};

	const error = () => {
		message.error('This is deleted from card');
	};

	const DeleteFunc = (id: number) => {
		deleteProduct(id);
		error();
	};

	useEffect(() => {
		const result = basketItems
			.map((items) => items.count * items.price)
			.reduce((partialSum, a) => partialSum + a, 0);
		setTotal(result);

		basketItems.map((item) =>
			item.quantity === 0 ? deleteBasket(item.id) : ''
		);
	}, [basketItems]);

	//ask it

	const BuyProducts = (products: StoreType[]) => {
		products.map((items: StoreType) => {
			const _items: SoldType = {
				title: items.title,
				price: items.price,
				id: items.id,
				date: moment().format('dddd'),
				count: items.count,
				quantity: items.quantity,
			};
			console.log(_items);

			if (items.quantity > 0) {
				addSold(_items);
				substractProducts(_items);
			}
			zeroProduct(items.id);
		});
	};

	return (
		<>
			<Title style={{ textAlign: 'center', marginBottom: '50px' }}>
				There is {basketItems.length} item in the cart
			</Title>
			<Paragraph
				className='basket'
				style={{ display: 'flex', alignItems: 'center' }}>
				<List className='basket__list'>
					{basketItems.length > 0 &&
						basketItems.map((items) => (
							<List.Item className='basket__item' key={items.key}>
								<Avatar
									style={{ width: '40px', height: '40px' }}
									src={
										<Image
											src={items.img as string}
											style={{ width: 51, height: 40 }}
										/>
									}
								/>
								<p className='basket__title'>{items.title}</p>

								<div className='basket__wrapper'>
									<Button
										onClick={() => DecreaseFunc(items.id)}
										className='basket__btn'>
										<MinusCircleOutlined className='basket__icon ' />
									</Button>
									<Text className='basket__quantity'>{items.count}</Text>
									<Button
										onClick={() => IncreaseFunc(items.id)}
										className='basket__btn'>
										<PlusCircleOutlined className='basket__icon basket__icon-plus' />
									</Button>
								</div>
								<p style={{ margin: '0', fontSize: '18px', width: '50px' }}>
									$ {items.price}
								</p>
								<Button
									onClick={() => DeleteFunc(items.id)}
									className='basket__remove'>
									<CloseOutlined className='basket__remove-icon' />
								</Button>
							</List.Item>
						))}
				</List>

				<Paragraph className='basket__total'>
					<h3>Overall Price</h3>
					<p className='basket__total-price'>${total}</p>
					<Button onClick={() => BuyProducts(basketItems)}>Buy</Button>
				</Paragraph>
			</Paragraph>
		</>
	);
};
