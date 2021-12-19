import db from "../services/db";

export default {
	create: async (req, res) => {
		console.log("create group", req.body);
		const group = await db.createGroup(req.body);
		res.status(200).json(group);
	},
	register: async (req, res) => {
		console.log("register to group", req.body);
		const registered = await db.registerToGroup(req.body);
		res.status(200).json(registered);
	},

	getMembersByGroup: async (req, res) => {
		const { groupId } = req.params;
		console.log(`Get Members By Group ${groupId}`);
		const registered = await db.getMembersByGroup(groupId);
		res.status(200).json(registered);
	},
};
