import './App.css';
import { Route, Routes } from 'react-router-dom';


import Navbar from './components/navBar/Navbar';
import HomePage from './pages/homePage/HomePage';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

import LandingBoard from './pages/landingBoard/LandingBoard'
import AuthPage from './pages/userAuth/AuthPage'
import PasswordModifyPage from './pages/passModify/PasswordModifyPage';

import PrivateRoute from './components/PrivateRoute'; 
import AnonRoute from './components/AnonRoute'; 
import Chat from './pages/chat/Chat'
import UserDashboard from './pages/userDashboard/UserDashboard';
import VerifyPage from './pages/VerifyPage';
import VerifiyTokenPassPage from './pages/VerifiyTokenPassPage'
import ForgotPage from './pages/ForgotPage';

import MapActivitiesPage from './pages/MapActivitiesPage';
import AddActivity from './pages/NewActivity'
import FilteredActivities from './pages/filteredActivities/FilteredActivities'

function App() {
	return (
		<div className="App">


			<Routes>
			<Route
				path="/" 
				element={
					<AnonRoute>
						<LandingBoard />
					</AnonRoute>}
				/>
			<Route	
				path="/auth" 
				element={
					<AnonRoute>
						<AuthPage />
					</AnonRoute>}
				/>
					
			<Route exact path="verify"
				element={
					<AnonRoute>
						<VerifyPage />
					</AnonRoute>
				}
			/>

			<Route	
				path="/forgotPass" 
				element={
					<AnonRoute>
						<ForgotPage />
					</AnonRoute>}
				/>

			<Route exact path="/verifyTokenPass" 
				element={
					<AnonRoute>
						<VerifiyTokenPassPage />
					</AnonRoute>
				}/>
			
			<Route exact path="/passwordModify"
				element={
					<AnonRoute>
						<PasswordModifyPage />
					</AnonRoute>
				}
			/>

			<Route exact path="/homePage" 
				element={
					<PrivateRoute>
						<HomePage />
					</PrivateRoute>}
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

			<Route
				exact
				path="/activities"
				element={
					<PrivateRoute>
						<FilteredActivities />
					</PrivateRoute>
			}/>

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
			
				{/*

				<Route
					exact
					path="/addActivity"
					element={
						<PrivateRoute>
							<AddActivity/>
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
				
				*/}
			</Routes>
		</div>
	);
}

export default App;
