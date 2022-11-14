import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUsersContext } from '../hooks/useUsersContext';
import { Form, message } from 'antd';
import UserForm from './UserForm';
import moment from 'moment';

export default function CreateUser() {
	const { dispatch } = useUsersContext();
	const { user } = useAuthContext();

	const [form] = Form.useForm();
	const navigate = useNavigate();

	const dateFormat = 'YYYY-MM-DD';

	const onSubmit = async (data) => {
		if (!user) {
			message.error('You must be logged in!');
			return;
		}

		const userData = {
			firstname: data.firstname,
			lastname: data.lastname,
			dob: moment(data.dob).format(dateFormat),
			address: data.address,
			phone: data.phone,
			email: data.email,
			password: data.password,
			role: data.role,
		};

		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		});

		const json = await response.json();

		if (!response.ok) {
			message.error(json.error);
		} else {
			message.success('New user has been created!');
			form.resetFields();
			dispatch({ type: 'CREATE_USER', payload: json });
			navigate('/');
		}
	};

	return (
		<UserForm
			title="Create User"
			form={form}
			onSubmit={onSubmit}
			dateFormat={dateFormat}
			buttonText="Create"
		/>
	);
}
