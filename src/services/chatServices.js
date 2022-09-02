import service from "./service";

const URL = '/chat';

const startChatServices = (userId) =>  {
    return service.post(`${URL}/start/${userId}`);
}

const getAllMessagesServices = (chatId) =>  {
    return service.get(`${URL}/messages/${chatId}`);
}

const getAllConversationsServices = () =>{
    return service.get(`${URL}`);
}

export {startChatServices , getAllMessagesServices, getAllConversationsServices }