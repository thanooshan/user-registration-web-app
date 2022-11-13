import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUsersContext } from '../hooks/useUsersContext';
import { Form, message } from 'antd';
import UserForm from './UserForm';
import moment from 'moment';

export default function UpdateUser() {
	const { users, dispatch } = useUsersContext();
	const { user } = useAuthContext();
	const [userData, setUserData] = useState();
	const [form] = Form.useForm();
	const params = useParams();
	const navigate = useNavigate();
	const dateFormat = 'YYYY-MM-DD';

	useEffect(() => {
		const fetchUser = async () => {
			const getUser = await fetch(`/api/users/${params.id}`, {
				method: 'GET',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${user.token}`,
				},
			});

			const userResponse = await getUser.json();

			!userResponse
				? message.error('Cannot fetch user data!')
				: setUserData(userResponse);
		};

		if (user) {
			fetchUser();
		}
	}, [user]);

	const onSubmit = async (data) => {
		const userDetails = {
			firstname: data.firstname,
			lastname: data.lastname,
			dob: moment(data.dob).format(dateFormat),
			address: data.address,
			phone: data.phone,
			email: data.email,
			role: data.role,
		};

		const response = await fetch(`/api/users/${params.id}`, {
			method: 'PUT',
			body: JSON.stringify(userDetails),
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		});

		const json = await response.json();

		if (!response.ok) {
			message.error(json.error);
		} else {
			message.success('The user details updated!');
			form.resetFields();

			navigate('/');
		}
	};

	return (
		<UserForm
			title="Update User"
			form={form}
			onSubmit={onSubmit}
			dateFormat={dateFormat}
			data={userData}
			password={false}
		/>
	);
}
