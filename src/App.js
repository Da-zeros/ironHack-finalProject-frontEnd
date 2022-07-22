import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; 
import AnonRoute from './components/AnonRoute'; 
import Chat from './pages/Chat'
import UserDashboard from './pages/UserDashboard';

function App() {
	return (
		<div className="App">
			<Navbar />

			<Routes>
				<Route exact path="/" component={HomePage} />
				<Route
					exact
					path="/projects"
					element={
						<PrivateRoute>
							<ProjectListPage />
						</PrivateRoute>
					}
				/>

				<Route
					exact
					path="/chat"
					element={
						<PrivateRoute>
							<Chat />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/chat/:chatId"
					element={
						<PrivateRoute>
							<Chat />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/userDashboard"
					element={
						<PrivateRoute>
							<UserDashboard />
						</PrivateRoute>
					}
				/>
				<Route
					exact
					path="/projects/:id"
					element={
						<PrivateRoute>
							<ProjectDetailsPage />
						</PrivateRoute>
					}
				/>

				<Route
					exact
					path="/signup"
					element={
						<AnonRoute>
							<SignupPage />
						</AnonRoute>
					}
				/>
				<Route
					exact
					path="/login"
					element={
						<AnonRoute>
							<LoginPage />
						</AnonRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
