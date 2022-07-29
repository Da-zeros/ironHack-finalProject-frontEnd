import service from './service';

const URL = '/userDashboard';

const getAllActivitiesServices = () => {
	return service.get(`${URL}/`);
};

const addActivityServices = ( activityId ) => {
	return service.put(`${URL}/${activityId}`)
}

const getUserEnrolledActService = () => {
	return service.get(`${URL}`)
}

const delEnroledActivityService = (delId) => {
	return service.delete(`${URL}/${delId}`)
}

const getProjectDetailsService = (id) => {
	return service.get(`${URL}/${id}`);
};

const addNewProjectService = (newProject) => {
	return service.post(`${URL}/`, newProject);
};

export { addActivityServices, getAllActivitiesServices, getUserEnrolledActService, delEnroledActivityService};
