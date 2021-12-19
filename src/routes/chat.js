import chat from "../controllers/chat";

export default (router) => {
	router.route("/chat/:groupId").get(chat.getMessages);
	router.route("/chat/:groupId").post(chat.setMessage);
	router.route("/chat/:groupId/:accountId").post(chat.isOnline);
	router.route("/chat/:groupId/:accountId").get(chat.getOnline);
	router.route("/chat/:groupId/:accountId/:messageId").get(chat.viewMessage);
};
