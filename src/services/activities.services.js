import service from './service';

const URL = '/activities';

const newActivityService = (activity) => {
	return service.post(`${URL}/`, activity);
};

const getFilteredActivity = (obj) => {
	return service.get(`${URL}`,{ params:obj});
};

const getActivityTypeService = () => {
	return service.get(`${URL}/type`);
};

const getActivitiesService = () => {
	return service.get(`${URL}/all`);
};

const sendCommentService = (coment) =>{
	return service.post(`${URL}/comment/`,coment)
}

const getCommentActivitiesService = () => {
	return service.get(`${URL}/comment`)
}


export { newActivityService , getActivityTypeService, getFilteredActivity,  getActivitiesService ,sendCommentService, getCommentActivitiesService};
