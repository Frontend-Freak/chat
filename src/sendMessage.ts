import { currentUserName } from "./settings.js";
import { getNameUser } from "./api.js";
import { socket } from "./index.js";
import { inputMessage } from "./UI.js";

export async function sendMessage(event: Event) {
	event.preventDefault();
	await getNameUser();
	if (!inputMessage) {
		return;
	}
	const message = {
		userName: currentUserName,
		text: inputMessage.value,
	};
	socket.send(JSON.stringify(message));
	inputMessage.value = "";
}

