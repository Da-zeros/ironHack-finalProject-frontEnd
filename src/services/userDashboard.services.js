import service from './service';

const URL = '/userDashboard';

const getAllActivitiesServices = () => {
	return service.get(`${URL}/`);
};
const getProjectDetailsService = (id) => {
	return service.get(`${URL}/${id}`);
};

const addNewProjectService = (newProject) => {
	return service.post(`${URL}/`, newProject);
};

export { getAllActivitiesServices };
