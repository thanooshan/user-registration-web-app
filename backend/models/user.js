import mongoose from 'mongoose';
import Joi from 'joi';

export const User = mongoose.model(
	'User',
	new mongoose.Schema({
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
		},
		address: {
			type: String,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			required: true,
		},
	})
);

export function validate(user) {
	const schema = Joi.object({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		dob: Joi.string(),
		address: Joi.string(),
		phone: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string(),
		role: Joi.string().required(),
	});

	return schema.validate(user);
}
