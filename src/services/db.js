import { v4 as uuidv4 } from "uuid";
import singleton from "../utils/singleton";

/**
 * account: { id, name, email }
 * group: { id, name }
 * member: { id, accountId, groupId }
 * message: { id, message, groupId, accountId, viewedBy }
 * chatRoom: { groupId: [{accountId, isOnline, typing}]
 */

const db = {
	chatRoom: {
		"dbc8cc99-1f34-45a1-9488-5949f653b2f9": [],
		"c9919d4a-f321-412b-8297-49e59f4fc758": [],
	},
	messages: [
		{
			accountId: "9e7e212e-b207-44ae-9767-8cfdc865b49a",
			message: "This is a random message",
			groupId: "dbc8cc99-1f34-45a1-9488-5949f653b2f9",
			id: "82254c19-173f-4ed8-b990-455325300e76",
		},
	],
	accounts: [
		{
			email: "test1@test.com",
			name: "Test One",
			id: "9e7e212e-b207-44ae-9767-8cfdc865b49a",
		},
		{
			email: "test2@test.com",
			name: "Test Two",
			id: "6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f",
		},
		{
			email: "test3@test.com",
			name: "Test Three",
			id: "28a1e5a4-e1db-403c-ad93-4abe4d24064e",
		},
	],
	members: [],
	groups: [
		{
			name: "Movies",
			id: "dbc8cc99-1f34-45a1-9488-5949f653b2f9",
		},
		{
			name: "TV Series",
			id: "c9919d4a-f321-412b-8297-49e59f4fc758",
		},
	],
};

function Db() {
	function createAccount(props) {
		const id = uuidv4();
		const account = { ...props, id };
		db.accounts.push(account);
		return Promise.resolve(account);
	}

	function createGroup(props) {
		const id = uuidv4();
		const group = { ...props, id };
		db.groups.push(group);
		db.chatRoom[id] = {};
		return Promise.resolve(group);
	}

	function getMessagesByGroup(groupId) {
		const groupMessages = db.messages.filter((m) => m.groupId === groupId);
		return Promise.resolve(groupMessages);
	}

	function viewMessage(groupId, accountId, messageId) {
		db.messages.forEach((m) => {
			if (m.id === messageId && m.groupId === groupId) {
				if ("viewedBy" in m) m.viewedBy.push(accountId);
				else m.viewedBy = [accountId];
			}
		});
		const groupMessage = db.messages.filter(
			(m) => m.id === messageId && m.groupId === groupId
		);
		return Promise.resolve(...groupMessage);
	}

	function getMembersByGroup(groupId) {
		const groupMembers = db.members.filter((m) => m.groupId === groupId);
		const newAccountsInfo = groupMembers.map((accountGroup) => {
			const accountObj = db.accounts.find(
				(account) => account.id == accountGroup.accountId
			);
			return {
				id: accountGroup.id,
				accountId: accountObj.id,
				name: accountObj.name,
			};
		});
		return Promise.resolve(newAccountsInfo);
	}

	function getGroupsByAccount(accountId) {
		const accountGroups = db.members.filter((m) => m.accountId === accountId);
		const newGroupsInfo = accountGroups.map((accountGroup) => {
			const groupObj = db.groups.find(
				(group) => group.id == accountGroup.groupId
			);
			return {
				id: accountGroup.id,
				groupId: groupObj.id,
				name: groupObj.name,
			};
		});
		return Promise.resolve(newGroupsInfo);
	}

	function registerToGroup(props) {
		const id = uuidv4();
		const registered = { ...props, id };
		db.members.push(registered);
		return Promise.resolve(registered);
	}

	function setMessageByGroup(groupId, reqBody) {
		const id = uuidv4();
		const message = { ...reqBody, groupId: groupId, id };
		db.messages.push(message);
		return Promise.resolve(message);
	}

	function setMemberOnline(groupId, accountId) {
		db.chatRoom[groupId].push({
			id: accountId,
			isOnline: true,
			typing: false,
		});
		return Promise.resolve(
			db.chatRoom[groupId][db.chatRoom[groupId].length - 1]
		);
	}

	function getMemberOnline(groupId) {
		const onlineMembers = db.chatRoom[groupId].filter((m) => m.isOnline);
		return Promise.resolve(onlineMembers);
	}

	return {
		createAccount,
		createGroup,
		getMessagesByGroup,
		registerToGroup,
		setMessageByGroup,
		getMembersByGroup,
		getGroupsByAccount,
		viewMessage,
		setMemberOnline,
		getMemberOnline,
	};
}

export default singleton(Db);
