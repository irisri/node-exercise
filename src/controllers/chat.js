import db from "../services/db";
import redis from "../services/redis";

export default {
	getMessages: async (req, res) => {
		const { groupId } = req.params;
		console.log(`getMessages for group ${groupId}`);
		const messages = await db.getMessagesByGroup(groupId);
		res.status(200).json(messages);
	},
	setMessage: async (req, res) => {
		const { groupId } = req.params;
		console.log(`setMessages for group ${groupId}`);
		const messages = await db.setMessageByGroup(groupId, req.body);
		res.status(200).json(messages);
	},
	viewMessage: async (req, res) => {
		const { groupId, accountId, messageId } = req.params;
		console.log(`${accountId} saw messages`);
		const registered = await db.viewMessage(groupId, accountId, messageId);
		res.status(200).json(registered);
	},
	isOnline: async (req, res) => {
		const { groupId, messageId } = req.params;
		console.log(`${req.body.accountId} is online`);
		const online = await db.setMemberOnline(groupId, messageId);
		res.status(200).json(online);
	},
	getOnline: async (req, res) => {
		const { groupId } = req.params;
		console.log("getOnline members");
		const online = await db.getMemberOnline(groupId);
		res.status(200).json(online);
	},
};
