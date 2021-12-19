import db from "../services/db";

export default {
	create: async (req, res) => {
		console.log("create account", req.body);
		const account = await db.createAccount(req.body);
		res.status(200).json(account);
	},
	getGroupsByAccount: async (req, res) => {
		const { accountId } = req.params;
		console.log(`Get Groups By Account ${accountId}`);
		const account = await db.getGroupsByAccount(accountId);
		res.status(200).json(account);
	},
};
