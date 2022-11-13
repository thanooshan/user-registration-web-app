import { User, validate } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

//return all users
export const getUsers = async (req, res) => {
	const users = await User.find();
	res.send(users);
};

//create a user
export const createUser = async (req, res) => {
	const { error } = validate(req.body);
	const {
		firstname,
		lastname,
		dob,
		address,
		phone,
		email,
		password,
		role,
	} = req.body;

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	if (error)
		return res
			.status(400)
			.send({ error: error.details[0].message });

	const exists = await User.findOne({ email });

	if (exists)
		return res
			.status(400)
			.send({ error: 'The email is already registered' });

	const user = new User({
		firstname: firstname,
		lastname: lastname,
		dob: dob,
		address: address,
		phone: phone,
		email: email,
		password: hash,
		role: role,
	});

	await user.save();
	res.send(user);
};

//update an user
export const updateUser = async (req, res) => {
	const { error } = validate(req.body);
	const { firstname, lastname, dob, address, phone, email, role } =
		req.body;

	if (error)
		return res
			.status(400)
			.send({ error: error.details[0].message });

	const user = await User.findByIdAndUpdate(
		req.params.id,
		{
			firstname: firstname,
			lastname: lastname,
			dob: dob,
			address: address,
			phone: phone,
			email: email,
			role: role,
		},
		{ new: true }
	);

	if (!user)
		return res.status(404).send({
			error: 'The user with the given ID was not found.',
		});

	res.send(user);
};

//delete a user
export const deleteUser = async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);

	if (!user)
		return res.status(404).send({
			error: 'The user with the given ID was not found.',
		});

	res.send(user);
};

//retur a user
export const getUser = async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user)
		return res.status(404).send({
			error: 'The user with the given ID was not found.',
		});

	res.send(user);
};

//log in a user
export const loginUser = async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res
			.status(400)
			.send({ error: 'Incorrect email/username' });

	const match = await bcrypt.compare(
		req.body.password,
		user.password
	);

	if (!match)
		return res.status(400).send({ error: 'Incorrect password' });

	const token = createToken(user._id);

	res.send({
		email: user.email,
		role: user.role,
		_id: user._id,
		token: token,
	});
};
