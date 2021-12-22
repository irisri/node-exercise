let logger = {
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
	register: [],
	messages: [],
	chat: [],
};

const requestInfo = [
	accounts
	{
		body: {
			name: "First Account",
			email: "firstAccount@gmail.com",
		},
		type: "POST",
		url: "http://localhost:9000/api/account",
		log: "Create account",
		key: "accounts",
	},
	{
		body: {
			name: "Second Account",
			email: "secondtAccount@gmail.com",
		},
		type: "POST",
		url: "http://localhost:9000/api/account",
		log: "Create account",
		key: "accounts",
	},
	{
		body: {
			name: "Third Account",
			email: "thirdtAccount@gmail.com",
		},
		type: "POST",
		url: "http://localhost:9000/api/account",
		log: "Create account",
		key: "accounts",
	},
	//groups
	{
		body: {
			name: "Games",
		},
		type: "POST",
		url: "http://localhost:9000/api/group",
		log: "Create group",
		key: "groups",
	},
	{
		body: {
			name: "Books",
		},
		type: "POST",
		url: "http://localhost:9000/api/group",
		log: "Create group",
		key: "groups",
	},
	{
		body: {
			groupId: "dbc8cc99-1f34-45a1-9488-5949f653b2f9",
			accountId: "28a1e5a4-e1db-403c-ad93-4abe4d24064e",
		},
		type: "POST",
		url: "http://localhost:9000/api/group/register",
		log: "Register to group - Movies",
		key: "register",
	},
	{
		body: {
			groupId: "c9919d4a-f321-412b-8297-49e59f4fc758",
			accountId: "28a1e5a4-e1db-403c-ad93-4abe4d24064e",
		},
		type: "POST",
		url: "http://localhost:9000/api/group/register",
		log: "Register to group - TV Series",
		key: "register",
	},
	{
		body: {
			groupId: "dbc8cc99-1f34-45a1-9488-5949f653b2f9",
			accountId: "6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f",
		},
		type: "POST",
		url: "http://localhost:9000/api/group/register",
		log: "Register to group - Movies",
		key: "register",
	},
	{
		type: "GET",
		url: "http://localhost:9000/api/account/28a1e5a4-e1db-403c-ad93-4abe4d24064e",
		log: "Get groups of account - 28a1e5a4-e1db-403c-ad93-4abe4d24064e",
		key: "register",
	},
	{
		type: "GET",
		url: "http://localhost:9000/api/group/dbc8cc99-1f34-45a1-9488-5949f653b2f9",
		log: "Get accounts of group Movies",
		key: "register",
	},
	{
		body: {
			accountId: "9e7e212e-b207-44ae-9767-8cfdc865b49a",
			message: "Hello world!",
		},
		type: "POST",
		url: "http://localhost:9000/api/chat/dbc8cc99-1f34-45a1-9488-5949f653b2f9",
		log: "posted message to group Movies",
		key: "messages",
	},
	{
		body: {
			accountId: "6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f",
			message: "The world says hello back!",
		},
		type: "POST",
		url: "http://localhost:9000/api/chat/dbc8cc99-1f34-45a1-9488-5949f653b2f9",
		log: "posted message to group Movies",
		key: "messages",
	},
	{
		type: "PUT",
		url: "http://localhost:9000/api/chat/dbc8cc99-1f34-45a1-9488-5949f653b2f9/28a1e5a4-e1db-403c-ad93-4abe4d24064e/82254c19-173f-4ed8-b990-455325300e76",
		log: "Saw message in Movies",
		key: "messages",
	},
	{
		body: {
			accountId: "6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f",
		},
		type: "POST",
		url: "http://localhost:9000/api/chat/dbc8cc99-1f34-45a1-9488-5949f653b2f9/6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f",
		log: "6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f is online",
		key: "chat",
	},
	{
		type: "GET",
		url: "http://localhost:9000/api/chat/dbc8cc99-1f34-45a1-9488-5949f653b2f9/6ee4c7d5-59f4-4adb-8e15-1af4926ddc3f",
		log: "Get online group members",
		key: "chat",
	},
];

function init() {
	for (let i = 0; i < requestInfo.length; i++) {
		if (requestInfo[i].type === "POST") {
			postRequest(
				requestInfo[i].body,
				requestInfo[i].url,
				requestInfo[i].log,
				requestInfo[i].key
			);
		} else if (requestInfo[i].type === "GET") {
			getRequest(requestInfo[i].url, requestInfo[i].log, requestInfo[i].key);
		} else
			putRequest(
				requestInfo[i].body,
				requestInfo[i].url,
				requestInfo[i].log,
				requestInfo[i].key
			);
	}
}

// PUT
const putRequest = async (myBody, url, log, keyName) => {
	const response = await fetch(url, {
		method: "PUT",
		body: JSON.stringify(myBody),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const myJson = await response.json();
	myJson.log = log + `, ID: ${myJson.id}`;
	logger[keyName].push(myJson);
};

// GET
const getRequest = async (url, log, keyName) => {
	const response = await fetch(url);
	const myJson = await response.json();
	myJson.log = log;
	logger[keyName].push(myJson);
};

// POST
const postRequest = async (myBody, url, log, keyName) => {
	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(myBody),
		headers: {
			"Content-Type": "application/json",
		},
	});
	const myJson = await response.json();
	myJson.log = log + `, ID: ${myJson.id}`;
	logger[keyName].push(myJson);
};

init();
console.log("this is the logger", logger);
