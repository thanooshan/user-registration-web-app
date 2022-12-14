import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';

export default function UserForm(props) {
	const { user } = useAuthContext();
	const { title, form, onSubmit, dateFormat, data, buttonText } =
		props;
	const [isModerator, setIsModerator] = useState(false);
	const moderatorStyles = isModerator ? { display: 'none' } : {};

	useEffect(() => {
		const fieldData = { ...data };
		fieldData.dob = moment(fieldData.dob);
		form.setFieldsValue(fieldData);

		user.role === 'moderator' && setIsModerator(true);
	}, [data]);

	return (
		<div className="form-wrapper">
			<h2>{title}</h2>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="First Name"
					name="firstname"
					rules={[
						{
							required: true,
							message: 'Please enter the first name',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Last Name"
					name="lastname"
					rules={[
						{
							required: true,
							message: 'Please enter the last name',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="Date of birth" name="dob">
					<DatePicker
						allowClear
						format={dateFormat}
						style={{ width: '100%' }}
					/>
				</Form.Item>
				<Form.Item label="Address" name="address">
					<Input.TextArea rows={3} />
				</Form.Item>
				<Form.Item
					label="Phone Number"
					name="phone"
					rules={[
						{
							required: true,
							message: 'Please enter the phone number',
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
										value
									)
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									'Please enter a valid phone number'
								);
							},
						}),
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							type: 'email',
							required: true,
							message: 'Please enter a valid email',
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
							message: 'Please enter the password',
						},
					]}
					style={moderatorStyles}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					label="Confirm Password"
					name="confirm_password"
					dependencies={['password']}
					rules={[
						{
							message:
								'Please enter the password again',
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (
									!value ||
									getFieldValue('password') ===
										value
								) {
									return Promise.resolve();
								}
								return Promise.reject(
									'The passwords that you entered do not match!'
								);
							},
						}),
					]}
					style={moderatorStyles}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="User Role"
					name="role"
					rules={[
						{
							message: 'Please select a user role',
						},
					]}
					style={moderatorStyles}
				>
					<Select placeholder="Select the user role">
						<Select.Option value="admin">
							Admin
						</Select.Option>
						<Select.Option value="moderator">
							Moderator
						</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{buttonText}
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
