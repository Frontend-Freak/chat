import { sendMessage } from "./sendMessage.js";
import { formMessage, inputMessage, defaultInput, renderMessageHistory, createMessage } from "./UI.js";
import { settingsButton, openSettings, setCurrentUserName, currentUserName, themeSelectBtn, applyNewTheme, getThemeFroLS  } from "./settings.js";
import { authorizationWindow, getCodeBtn } from "./authorization.js";
import { confirmCodeBtn, saveCodeToCookie } from "./confirmation.js";
import { getCodeFetch, getDataUser, getNameUser } from "./api.js";

getThemeFroLS()

const exitBtn: HTMLElement | null = document.querySelector("#exitButton");
if(currentUserName){
	setCurrentUserName(currentUserName)
}

getDataUser();
getNameUser();

export const socket = new WebSocket(`wss://edu.strada.one/websockets?${localStorage.getItem("code")}`);

socket.onopen = () => {
	console.log("Соединение установлено");
};

socket.addEventListener("message", async (event) => {
	const message = JSON.parse(event.data);
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

renderMessageHistory();