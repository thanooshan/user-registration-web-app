import React from 'react';
import { useLogin } from '../hooks/useLogin';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const { login } = useLogin();
	const [form] = Form.useForm();
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		await login(data.email, data.password);
	};

	return (
		<div className="form-wrapper">
			<h2>Login</h2>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="Email/Username"
					name="email"
					rules={[
						{
							required: true,
							message: 'Please enter your username!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please enter your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
