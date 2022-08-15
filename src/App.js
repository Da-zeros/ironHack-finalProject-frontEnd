import './App.css';
import { Route, Routes } from 'react-router-dom';


import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

import LandingBoard from './pages/landingBoard/LandingBoard'
import AuthPage from './pages/userAuth/AuthPage'
import PasswordModifyPage from './pages/passModify/PasswordModifyPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute'; 
import AnonRoute from './components/AnonRoute'; 
import Chat from './pages/Chat'
import UserDashboard from './pages/UserDashboard';
import Verify from './pages/VerifyPage';
import VerifyPassPage from './pages/VerifiyPassPage'
import ForgotPage from './pages/ForgotPage';

import MapActivitiesPage from './pages/MapActivitiesPage';
import AddActivity from './pages/NewActivity'
import FilteredActivities from './pages/FilteredActivities'

function App() {
	return (
		<div className="App">


			<Routes>
			<Route
				path="/" element={<LandingBoard />}
				/>
			<Route	
				path="/auth" element={<AuthPage />}
				/>
			<Route	
				path="/passModify" element={<PasswordModifyPage />}
				/>
				{/*

				<Route exact path="/" 
					element={
						<PrivateRoute>
							<HomePage/>
						</PrivateRoute>}
					/>


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
					path="/addActivity"
					element={
						<PrivateRoute>
							<AddActivity/>
						</PrivateRoute>
					}
				/>

					
				<Route path="/verify" element={<Verify/>} />
				<Route path="/verifyTokenPass" element={< VerifyPassPage/>} />

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
					path="/forgot"
					element={<ForgotPage />}
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

				<Route
					exact
					path="/passwordModify"
					element={<PasswordModifyPage />}
				/>

				<Route
					exact
					path="/activitiesMap"
					element={
						<PrivateRoute>
							<MapActivitiesPage />
						</PrivateRoute>
					}/>
				<Route
					exact
					path="/Activities"
					element={
						<PrivateRoute>
							<FilteredActivities />
						</PrivateRoute>
					}/>
				*/}
			</Routes>
		</div>
	);
}

export default App;
