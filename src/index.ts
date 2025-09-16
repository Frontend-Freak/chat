import { sendMessage } from "./sendMessage.js";
import { formMessage, inputMessage, defaultInput, renderMessageHistory, createMessage, chatWindow } from "./UI.js";
import { settingsButton, openSettings, setCurrentUserName, currentUserName, themeSelectBtn, applyNewTheme, getThemeFroLS } from "./settings.js";
import { authorizationWindow, getCodeBtn } from "./authorization.js";
import { confirmCodeBtn, saveCodeToCookie } from "./confirmation.js";
import { getCodeFetch, getDataUser, getNameUser } from "./api.js";

getThemeFroLS();

const exitBtn: HTMLElement | null = document.querySelector("#exitButton");
if (currentUserName) {
	setCurrentUserName(currentUserName);
}

getDataUser();
getNameUser();

export const socket = new WebSocket(`wss://edu.strada.one/websockets?${localStorage.getItem("code")}`);

socket.onopen = () => {
	console.log("Соединение установлено");
};

socket.addEventListener("message", async (event) => {
	const message = JSON.parse(event.data);
	newMessagesCounter += 1;
	createMessage(message);
});

if (formMessage) {
	formMessage.addEventListener("submit", sendMessage);
}

if (inputMessage) {
	inputMessage.addEventListener("click", defaultInput);
}

if (settingsButton) {
	settingsButton.addEventListener("click", openSettings);
}

if (getCodeBtn) {
	getCodeBtn.addEventListener("click", getCodeFetch);
}

if (confirmCodeBtn) {
	confirmCodeBtn.addEventListener("click", () => {
		saveCodeToCookie();
		getDataUser();
		renderMessageHistory();
	});
}

if (exitBtn) {
	exitBtn.addEventListener("click", () => {
		localStorage.removeItem("code");
		if (authorizationWindow) {
			authorizationWindow.classList.add("active");
		}
	});
}

if (themeSelectBtn) {
	themeSelectBtn.addEventListener("click", applyNewTheme);
}

export let newMessagesCounter = 0;

const buttonDown: HTMLElement | null = document.querySelector("#buttonScrollBox");

export function scrollDown(window: HTMLElement) {
	window.scrollTop = window.scrollHeight;
}

export function scrollDownClick(chatWindow: HTMLElement | null) {
	return function () {
		if (!chatWindow) {
			return;
		}
		if (chatWindow) {
			scrollDown(chatWindow);
			newMessagesCounter = 0;
		}
	};
}

if (buttonDown && chatWindow) {
	chatWindow.addEventListener("scroll", () => {
		if (chatWindow) {
			if (!buttonDown) {
				return;
			}

			if (newMessagesCounter > 0) {
				buttonDown.textContent = `↓ ${newMessagesCounter}`;
			} else {
				buttonDown.textContent = "↓";
			}

			const scrollableHeight = chatWindow.scrollHeight - chatWindow.clientHeight;

			if (chatWindow.scrollTop < scrollableHeight - chatWindow.clientHeight) {
				buttonDown.classList.add("visible-block");
			} else {
				buttonDown.classList.remove("visible-block");
			}
		}
	});

	buttonDown.addEventListener("click", scrollDownClick(chatWindow));
}

renderMessageHistory();
