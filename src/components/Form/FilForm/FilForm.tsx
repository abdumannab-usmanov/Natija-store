import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { UseProducts } from '../../../store';
import { StoreType } from '../../../store/modules/Products';
import Dexie from 'dexie';

type FormFalues = {
	key: React.Key;
	title: string;
	img: ReactNode;
	id: number;
	quantity: number;
	count: number;
	price: number;
	checked: boolean;
};

interface Prop {
	closeHandler: () => void;
	updatedItem: StoreType;
	setUpdatedItem: React.Dispatch<React.SetStateAction<StoreType | undefined>>;
	form: FormInstance<any>;
}

export const FilForm = (props: Prop) => {
	const [image, setImage] = useState<Blob>();
	const [preview, setPreview] = useState<any>('');
	const imgRef = useRef<any>();

	const addProduct = UseProducts((state) => state.addProduct);
	const editProduct = UseProducts((state) => state.editHandler);

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview('');
		}
	}, [image]);

	const handleImgFunc = (event: any) => {
		const file = event.target.files[0];

		if (file && file.type.substr(0, 5) === 'image') {
			setImage(file);
		} else {
			setImage(undefined);
		}
	};


	const onFinish = (values: FormFalues) => {
		let _data: StoreType = {
			...values,
			img: preview,
			key: Date.now(),
			id: Date.now(),
			checked: false,
		};

		if (props.updatedItem) {
			editProduct({
				...values,
				img: preview,
				key: props.updatedItem.key,
				id: props.updatedItem.id,
				checked: props.updatedItem.checked,
			});
		} else {
			addProduct(_data);
		}
		props.closeHandler();
		props.form.resetFields();
		setPreview(null);

		props.setUpdatedItem(undefined);
	};

	useEffect(() => {
		if (props.updatedItem) {
			setPreview(props.updatedItem?.img);
		} else {
			setPreview(null);
		}
	}, [props.updatedItem]);


	return (
		<Form
			form={props.form}
			labelCol={{ span: 20 }}
			wrapperCol={{ span: 26 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete='off'>
			<label
				style={{ cursor: 'pointer', display: 'flex', marginBottom: '20px' }}>
				<PlusCircleOutlined
					className='svg-icon'
					style={{ marginRight: '30px' }}
				/>
				<input
					name='img'
					ref={imgRef}
					style={{ display: 'none' }}
					type='file'
					accept='image/*'
					onChange={handleImgFunc}
				/>
				<img
					style={{
						width: '60px',
						height: '60px',
						borderRadius: '50%',
						objectFit: 'cover',
					}}
					src={preview ? preview : ''}
					alt={'your picture'}
				/>
			</label>

			<Form.Item
				name='title'
				rules={[{ required: true, message: 'Please input your name!' }]}>
				<Input placeholder='Please enter your product!' />
			</Form.Item>

			<Form.Item
				name='price'
				rules={[{ required: true, message: 'it should be number' }]}>
				<InputNumber
					style={{ width: '100%' }}
					placeholder={'enter your price'}
				/>
			</Form.Item>
			<Form.Item
				name='quantity'
				rules={[{ required: true, message: 'it should be number' }]}>
				<InputNumber
					style={{ width: '100%' }}
					placeholder={'Please enter your quantity'}
				/>
			</Form.Item>

			<Form.Item wrapperCol={{ offset: 8, span: 32 }}>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
