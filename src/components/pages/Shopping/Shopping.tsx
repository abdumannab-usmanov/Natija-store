import { UseProducts } from '../../../store';
import { Badge, Button, Card, Divider, message } from 'antd';
import { StoreType } from '../../../store/modules/Products';
import { Col, Row } from 'antd';
import { Typography } from 'antd';
import 'antd/dist/antd.css';
import './shopping.scss';
import {
	HeartFilled,
	HeartOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import FavoriteProducts from '../../../store/modules/Favorite';
import { Link } from 'react-router-dom';
import BasketProducts from '../../../store/modules/Basket';

const { Title, Paragraph } = Typography;

export const Shopping = () => {
	const products = UseProducts((state) => state.product);

	const likedProducts = FavoriteProducts((state) => state.liked);
	const deleteFovorite = FavoriteProducts((state) => state.deleteFovorite);
	const addLikes = FavoriteProducts((state) => state.addFavorite);

	const basketProducts = BasketProducts((state) => state.basket);
	const deleteBasket = BasketProducts((state) => state.deleteBasket);
	const addBasket = BasketProducts((state) => state.addBasket);

	const successBasket = () => {
		message.success('This is added to the card');
	};

	const warningBasket = () => {
		message.warning('This is removed removed from the card');
	};
	const BasketFunc = (el: StoreType) => {
		let result;
		const element = { ...el, count: 1 };

		basketProducts.length > 0 &&
			(result = basketProducts.find((x) => x.id === el.id));

		if (result) {
			deleteBasket(element.id);
			warningBasket();
		} else if (element.quantity > 0) {
			addBasket(element);
			successBasket();
		}
	};

	const success = () => {
		message.success('This is added to Featured Products');
	};

	const warning = () => {
		message.warning('This is removed removed from Featured Products');
	};

	const FavoriteFunc = (el: StoreType) => {
		let result;

		likedProducts.length > 0 &&
			(result = likedProducts.find((x) => x.id === el.id));

		if (result) {
			deleteFovorite(el.id);
			warning();
		} else {
			addLikes(el);
			success();
		}
	};

	console.log();

	return (
		<>
			<Paragraph
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<Title style={{ margin: 0 }}>New Collection</Title>
				<div>
					<Link style={{ marginRight: '25px' }} to={'/Favorite'}>
						<Badge color='lime' size='small' count={likedProducts.length}>
							<HeartOutlined className='shop__icon' shape='square' />
						</Badge>
					</Link>
					<Link to={'/basket'}>
						<Badge color='lime' size='small' count={basketProducts.length}>
							<ShoppingCartOutlined className='shop__icon' shape='square' />
						</Badge>
					</Link>
				</div>
			</Paragraph>
			<Row gutter={[16, 48]}>
				{products.map((item: StoreType) => (
					<Col key={item.key} span={6}>
						<Card
							hoverable
							cover={
								<img
									className='shop__img'
									alt={item.title}
									src={item.img as string}
								/>
							}>
							<Title className='shop__title' level={3}>
								{item.title}
							</Title>
							<Title type={'secondary'} className='shop__quantity' level={5}>
								Quantity: {item.quantity}
							</Title>
							<Title type={'secondary'} className='shop__price' level={5}>
								Price: {item.price}
							</Title>
							<Paragraph className='shop__wrapper-btn'>
								<Button
									onClick={() => FavoriteFunc(item)}
									className='shop__btn-favorite'
									style={{
										color:
											likedProducts.filter((el) => el.id === item.id).length > 0
												? 'red'
												: 'gray',
									}}
									shape='circle'>
									<HeartFilled className='shop__icon' />
								</Button>
								<Button
									onClick={() => BasketFunc(item)}
									className='shop__btn-favorite'
									shape='circle'>
									<ShoppingCartOutlined
										className='shop__icon'
										style={{
											color:
												basketProducts.filter((el) => el.id === item.id)
													.length > 0
													? 'red'
													: 'gray',
										}}
									/>
								</Button>
							</Paragraph>
						</Card>
					</Col>
				))}
			</Row>
		</>
	);
};
