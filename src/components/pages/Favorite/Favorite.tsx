import { Empty, Typography } from 'antd';
import { FavoriteProducts } from '../../../store';
import { Button, Card } from 'antd';
import { StoreType } from '../../../store/modules/Products';
import { Col, Row } from 'antd';
import 'antd/dist/antd.css';
import { DeleteFilled, HeartFilled } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Favorite = () => {
	const likedItems = FavoriteProducts((state) => state.liked);
	const deleteItems = FavoriteProducts((state) => state.deleteFovorite);

	const RemoveFavorite = (id: number) => {
		if (likedItems) {
			deleteItems(id);
		}
	};

	return (
		<>
			{likedItems.length > 0 ? (
				<>
					<Title style={{ textAlign: 'center', marginBottom: '45px' }}>
						Featured Products
					</Title>
					<Row gutter={[16, 48]}>
						{likedItems.map((item: StoreType) => (
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
									<Title type={'secondary'} className='shop__price' level={5}>
										Price: {item.price}
									</Title>
									<Paragraph className='shop__wrapper-btn'>
										<Button
											className='shop__btn-favorite'
											style={{ color: 'red' }}
											shape='circle'>
											<HeartFilled className='shop__icon' />
										</Button>
										<Button
											onClick={() => RemoveFavorite(item.id)}
											className='shop__btn-favorite'
											shape='circle'>
											<DeleteFilled
												className='shop__icon'
												style={{ color: 'red' }}
											/>
										</Button>
									</Paragraph>
								</Card>
							</Col>
						))}
					</Row>
				</>
			) : (
				<Empty />
			)}
		</>
	);
};
