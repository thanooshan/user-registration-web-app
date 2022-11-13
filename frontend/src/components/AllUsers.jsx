import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useUsersContext } from '../hooks/useUsersContext';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { Space, Table, Button, Popconfirm, message } from 'antd';
const { Column } = Table;

export default function AllUsers() {
	const { users, dispatch } = useUsersContext();
	const { user } = useAuthContext();

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch('/api/users', {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const data = await response.json();

			if (response.ok)
				dispatch({ type: 'SET_USERS', payload: data });
		};

		if (user) {
			fetchUsers();
		}
	}, [dispatch, user]);

	const calculateAge = (dob) => {
		const converted_date = moment(dob, 'YYYY-MM-DD');
		const age = moment().diff(converted_date, 'years');
		return age;
	};

	const handleDelete = async (id) => {
		const response = await fetch(`/api/users/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		const json = await response.json();

		!response.ok
			? message.error(json.error)
			: message.success('User Deleted');

		const filterdData = users.filter((u) => u._id !== id);
		dispatch({ type: 'SET_USERS', payload: filterdData });
	};

	return (
		<div className="table-wrapper">
			<div className="title-container">
				<h2>All Users</h2>
				<Link to="/create">
					<Button type="primary">Create User</Button>
				</Link>
			</div>

			<Table dataSource={users} key={uuidv4()}>
				<Column
					title="First Name"
					dataIndex="firstname"
					key={uuidv4()}
				/>
				<Column
					title="Last Name"
					dataIndex="lastname"
					key={uuidv4()}
					responsive={['lg']}
				/>
				<Column
					title="Age"
					dataIndex="dob"
					key={uuidv4()}
					render={(_, record) => {
						return !record.dob || record.dob === ''
							? '-'
							: calculateAge(record.dob);
					}}
				/>
				<Column
					title="Role"
					dataIndex="role"
					key={uuidv4()}
					responsive={['lg']}
				/>
				<Column
					title="Phone"
					dataIndex="phone"
					key={uuidv4()}
					responsive={['lg']}
				/>
				<Column
					title="Email"
					dataIndex="email"
					key={uuidv4()}
				/>
				<Column
					title="Action"
					key={uuidv4()}
					render={(_, record) => (
						<Space size="middle">
							<Link to={`/update/${record._id}`}>
								<Button>Edit</Button>
							</Link>
							<Popconfirm
								title="Are you sure to delete this user?"
								okText="Yes"
								cancelText="No"
								onConfirm={() =>
									handleDelete(record._id)
								}
							>
								<Button type="danger">Delete</Button>
							</Popconfirm>
						</Space>
					)}
				/>
			</Table>
		</div>
	);
}
