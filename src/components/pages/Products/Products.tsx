import Drower from '../../Form/Drower/Drower';
import { Avatar, Button, Checkbox, Form, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { ReactNode, useEffect, useState } from 'react';
import { UseProducts } from '../../../store';
import { DeleteTwoTone, EditOutlined, EditTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { StoreType } from '../../../store/modules/Products';

const { confirm } = Modal;

interface DataType {
	key: React.Key;
	title: string;
	img: ReactNode;
	id: number;
	quantity: number;
	count: number;
	price: number;
	checked: boolean;
}

export const Products: React.FC = () => {
	const products = UseProducts((state) => state.product);
	const setDelete = UseProducts((state) => state.delete);
	const deleteMultipleData = UseProducts((state) => state.deleteMultipleData);

	const [selectedProducts, setSelectedProducts] = useState<any>([]);
	const [open, setOpen] = useState(false);
	const [updatedItem, setUpdatedItem] = useState<StoreType>();

	const [form] = Form.useForm();

	const [allRemaners, setAllRemaners] = useState<any>([]);

	useEffect(() => {
		if (products?.length) {
			const allRemaners = products.filter(
				(item) => !selectedProducts?.includes(item.id)
			);
			setAllRemaners(allRemaners);
		}
	}, [selectedProducts, products]);

	const deleteSelected = () => deleteMultipleData(allRemaners);

	const showAllDeleteConfirm = () => {
		confirm({
			title: 'Are you sure delete this task?',
			icon: <ExclamationCircleOutlined />,
			content: (
				<p style={{ fontSize: '20px' }}>
					{selectedProducts.length} selected items
				</p>
			),
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteSelected();
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const FuncDelete = (id: number) => {
		try {
			setDelete(id);
		} catch (err) {
			return err;
		}
	};

	const showDeleteConfirm = (id: number) => {
		confirm({
			title: 'Are you sure delete this task?',
			icon: <ExclamationCircleOutlined />,
			content: 'Some descriptions',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				FuncDelete(id);
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	};

	const editHandler = (row: StoreType) => {
		setOpen(true);
		setUpdatedItem(row);

		form.setFieldsValue(row);
	};

	const closeHandler = () => {
		setOpen(false);
		setUpdatedItem(undefined);
		form.resetFields();
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Img',
			dataIndex: 'img',
			render: (img: any) => <Avatar src={img} />,
			width: '40px',
		},
		{
			title: 'Title',
			dataIndex: 'title',
		},
		{
			title: 'Price',
			dataIndex: 'price',
		},
		{
			title: 'Quantity',
			dataIndex: 'quantity',
		},
		{
			title: 'Action',
			dataIndex: 'render',
			render: (_, row) => (
				<div>
					<Button
						onClick={() => showDeleteConfirm(row.id)}
						style={{
							backgroundColor: 'transparent',
							border: 'none',
							marginRight: '30px',
						}}>
						<DeleteTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} />
					</Button>
					<Button
						onClick={() => editHandler(row)}
						style={{ backgroundColor: 'transparent', border: 'none' }}>
						<EditTwoTone style={{ fontSize: '20px', cursor: 'pointer' }} />
					</Button>
				</div>
			),
			width: '250px',
		},
	];

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Button type='primary' onClick={() => setOpen(true)}>
					Add
				</Button>
				<Button
					onClick={() => showAllDeleteConfirm()}
					disabled={selectedProducts?.length === 0}>
					remove selecters
				</Button>
			</div>

			<div style={{ marginTop: '20px' }}>
				<Table
					columns={columns}
					dataSource={products}
					pagination={{ pageSize: 6 }}
					rowSelection={{
						onChange: (newSelectedRowKeys: React.Key[], selectedRows: any) => {
							setSelectedProducts(newSelectedRowKeys);
						},
					}}
				/>
			</div>
			<Drower
				open={open}
				closeHandler={closeHandler}
				updatedItem={updatedItem as StoreType}
				setUpdatedItem={setUpdatedItem}
				form={form}
			/>
		</>
	);
};
