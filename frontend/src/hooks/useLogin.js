import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

export const useLogin = () => {
	const { dispatch } = useAuthContext();
	const navigate = useNavigate();

	const login = async (email, password) => {
		const response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: {
				'Content-type': 'application/json',
			},
		});

		const json = await response.json();

		if (!response.ok) {
			message.error(json.error);
		} else {
			message.success('Login success!');
			localStorage.setItem('user', JSON.stringify(json));
			dispatch({ type: 'LOGIN', payload: json });
			navigate('/');
		}
	};

	return { login };
};
