import { createMassage } from "./UI.js";
import { currentUserName } from "./settings.js";
import { getNameUser } from "./api.js";
import { socket } from "./index.js";
import { inputMassage } from "./UI.js";

export async function sendMassage(event: Event) {
	event.preventDefault();
	await getNameUser();
	if (inputMassage && inputMassage.value) {
		const message = {
			author: currentUserName,
			text: inputMassage.value,
		};
		socket.send(JSON.stringify(message));
		createMassage(currentUserName);
	}
}
