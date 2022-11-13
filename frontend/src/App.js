import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Header from './components/Header';
import Login from './components/Login';
import AllUsers from './components/AllUsers';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';

function App() {
	const { user } = useAuthContext();
	return (
		<>
			<Header />
			<br />
			<div className="container">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route
						path="/"
						element={
							user ? (
								user.role === 'admin' ? (
									<AllUsers />
								) : (
									<Navigate
										to={`/update/${user._id}`}
									/>
								)
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="/update/:id"
						element={
							user ? (
								<UpdateUser />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
					<Route
						path="/create"
						element={
							user && user.role === 'admin' ? (
								<CreateUser />
							) : (
								<Navigate to="/login" />
							)
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
