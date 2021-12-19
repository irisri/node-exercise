import account from "../controllers/account";

export default (router) => {
	router.route("/account").post(account.create);
	router.route("/account/:accountId").get(account.getGroupsByAccount);
};
