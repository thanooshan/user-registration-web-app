import { useContext } from 'react';
import { UsersContext } from '../context/UserContext';

export const useUsersContext = () => {
	const context = useContext(UsersContext);

	if (!context)
		throw Error(
			'useUsersContext must be used inside an UsersContextProvider'
		);

	return context;
};
