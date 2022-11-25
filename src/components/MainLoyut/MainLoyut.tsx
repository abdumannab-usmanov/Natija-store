import {
	HomeOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ShopOutlined,
	ShoppingCartOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './mainLoyut.scss';
import { Layout, Menu } from 'antd';
import React, { ReactElement, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Products } from '../pages/Products/Products';
import { Shopping } from '../pages/Shopping/Shopping';
import { Favorite } from '../pages/Favorite/Favorite';
import { Basket } from '../pages/Basket/Basket';
import { DashBoard } from '../pages/DashBoard/DashBoard';

const { Header, Sider, Content } = Layout;

export const MainLoyut: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	const navigate = useNavigate();

	type Itemtype = {
		key: string;
		icon: ReactElement;
		label: string;
		onClick: () => void;
	};

	const item: Itemtype[] = [
		{
			key: '1',
			icon: <HomeOutlined />,
			label: 'Dashboard',
			onClick: () => {
				navigate('/');
			},
		},
		{
			key: '2',
			icon: <ShopOutlined />,
			label: ' Products',
			onClick: () => {
				navigate('products');
			},
		},
		{
			key: '3',
			icon: <ShoppingCartOutlined />,
			label: 'Shopping',
			onClick: () => {
				navigate('dashboard');
			},
		},
	];

	return (
		<Layout style={{}}>
			<Sider
				className='slider'
				trigger={null}
				collapsible
				collapsed={collapsed}>
				<div className='logo' />
				<Menu
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={item}
				/>
			</Sider>
			<Layout className='site-layout'>
				<Header className='site-layout-background' style={{ padding: 0 }}>
					{React.createElement(
						collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
						{
							className: 'trigger',
							onClick: () => setCollapsed(!collapsed),
						}
					)}
				</Header>
				<Content
					className='site-layout-background'
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
					}}>
					<Routes>
						<Route path='/' element={<DashBoard />} />
						<Route path='/products' element={<Products />} />
						<Route path='/dashboard' element={<Shopping />} />
						<Route path='/favorite' element={<Favorite />} />
						<Route path='/basket' element={<Basket />} />
						<Route />
					</Routes>
				</Content>
			</Layout>
		</Layout>
	);
};
