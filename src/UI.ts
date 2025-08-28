import { authorizationWindow } from "./authorization.js";
import { currentEmail } from "./api.js";
import { serverUrl } from "./api.js";
import { getDataUser } from "./api.js";
export const formMassage: HTMLFormElement | null = document.querySelector("#formMassage");
export const inputMassage: HTMLInputElement | null = document.querySelector("#inputMassage");
export const chatWindow: HTMLElement | null = document.querySelector("#chatWindow");

getDataUser();

export function createMassage(message: { userName: string; text: string }) {
	const template: HTMLTemplateElement | null = document.querySelector("#messageTemplate");
	if (!template) {
		return;
	}
	const templateContent = template.content.cloneNode(true) as DocumentFragment;
	const name = templateContent.querySelector(".user__name");
	if (name) {
		name.textContent = `${message.userName}: `;
	}
	const messageElement = templateContent.querySelector("#massage");
	if (!messageElement) {
		return;
	}
    messageElement.textContent = message.text;
	if (!inputMassage) {
		return;
	}
	if (inputMassage.value.trim() === "") {
		inputMassage.classList.add("placeholder-red");
		inputMassage.style.borderColor = "red";
		return;
	} else if (inputMassage) {
		inputMassage.placeholder = "Введите сообщение...";
		inputMassage.classList.remove("placeholder-red");
		messageElement.textContent = inputMassage.value;
	}
	const time: HTMLElement | null = templateContent.querySelector("#timeMassage");
	if (!time) {
		return;
	}
	const dateNow = new Date().toTimeString().slice(0, 5);
	time.textContent = dateNow;

	if (!chatWindow) {
		return;
	}
	chatWindow.append(templateContent);
	inputMassage.value = "";
}

export function defaultInput() {
	if (inputMassage) {
		inputMassage.value = "";
		inputMassage.style.borderColor = "black";
		inputMassage.classList.remove("placeholder-red");
	}
}

export async function renderMessageHistory() {
	const token: string | null = localStorage.getItem("code");
	try {
		const response = await fetch(`${serverUrl}/messages/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			if (authorizationWindow) {
				authorizationWindow.classList.add("active");
			}
		}
		interface OpponentMessage {
			updatedAt: string;
			text: string;
			user: {
				name: string;
				email: string;
			};
		}
		const result = await response.json();
		if (!token || result.token) {
			if (authorizationWindow) {
				authorizationWindow.classList.add("active");
			}
			return;
		}
		const messageArray: OpponentMessage[] = result.messages;

		messageArray.reverse().forEach((element: OpponentMessage) => {
			const template: HTMLTemplateElement | null = document.querySelector("#messageTemplate");
			const opponentEmail = element.user.email;
			if (!template) {
				return;
			}
			const templateContent = template.content.cloneNode(true) as DocumentFragment;
			const name = templateContent.querySelector(".user__name");
			const message = templateContent.querySelector("#massage");
			const time = templateContent.querySelector("#timeMassage");
			const massageContainer = templateContent.querySelector(".messages");
			if (massageContainer) {
				if (opponentEmail === currentEmail) {
					massageContainer.classList.add("my__messages");
				} else {
					massageContainer.classList.add("opponent__messages");
				}
			}

			const messageDate = element.updatedAt;
			const date = new Date(messageDate).toTimeString().slice(0, 5);
			if (name) {
				name.textContent = `${element.user.name}: `;
			}
			if (message) {
				message.textContent = element.text;
			}
			if (time) {
				time.textContent = date;
			}

			if (!chatWindow) {
				return;
			}
			chatWindow.append(templateContent);
		});
	} catch (error) {
		console.error(error);
	}
}
