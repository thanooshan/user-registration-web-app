import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

export default function Header() {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
	};

	return (
		<nav>
			<div className="container">
				<Link to="/">
					<h2>User Registration App</h2>
				</Link>
				{user && <a onClick={handleLogout}>Logout</a>}
			</div>
		</nav>
	);
}
