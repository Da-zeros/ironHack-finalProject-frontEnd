import service from './service';

const URL = '/activities';

const newActivityService = (activity) => {
	return service.post(`${URL}/`, activity);
};

const getActivityTypeService = () => {
	return service.get(`${URL}/type`);
};

export { newActivityService , getActivityTypeService };
