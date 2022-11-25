import { Button, Drawer } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { StoreType } from '../../../store/modules/Products';
import { FilForm } from '../FilForm/FilForm';

interface Prop {
	open: boolean;
	closeHandler: () => void;
	updatedItem: StoreType;
	setUpdatedItem: React.Dispatch<React.SetStateAction<StoreType | undefined>>;
	form: FormInstance<any>;
}

const Drower = (props: Prop) => {
	return (
		<>
			<Drawer
				title='Basic Drawer'
				placement='right'
				open={props.open}
				onClose={props.closeHandler}>
				<FilForm
					closeHandler={props.closeHandler}
					updatedItem={props.updatedItem}
					setUpdatedItem={props.setUpdatedItem}
					form={props.form}
				/>
			</Drawer>
		</>
	);
};

export default Drower;
