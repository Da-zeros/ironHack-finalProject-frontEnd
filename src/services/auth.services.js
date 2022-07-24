import service from './service';

const URL = '/auth';

const signupService = (user) => {
	return service.post(`${URL}/signup`, user);
};

const loginService = (user) => {
	return service.post(`${URL}/login`, user);
};

const verifyService = () => {
	return service.get(`${URL}/verify`);
};

const forgotService = (mail) =>{
	return service.post(`${URL}/forgot`, mail)
}

const verifyPassService = (token) =>{
	return service.get(`${URL}/verifyPass/${token}`)
}

const passwordModifyService = (values) =>{
	return service.post(`${URL}/passwordModify`, values)
}

export { signupService, loginService, verifyService, forgotService , verifyPassService, passwordModifyService};
