import group from "../controllers/group";

export default (router) => {
	router.route("/group").post(group.create);
	router.route("/group/register").post(group.register);
	router.route("/group/:groupId").get(group.getMembersByGroup);
};
