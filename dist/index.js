import { sendMassage } from "./sendMessage.js";
import { formMassage, inputMassage, defaultInput, renderMessageHistory, createMassage } from "./UI.js";
import { settingsButton, openSettings } from "./settings.js";
import { authorizationWindow, getCodeBtn } from "./authorization.js";
import { confirmCodeBtn, saveCodeToCookie } from "./confirmation.js";
import { getCodeFetch, getDataUser, getNameUser } from "./api.js";
const exitBtn = document.querySelector("#exitButton");
getDataUser();
export const socket = new WebSocket(`wss://edu.strada.one/websockets?${localStorage.getItem("code")}`);
socket.onopen = () => {
    console.log("Соединение установлено");
};
socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    getNameUser();
    console.log(message);
    createMassage(message);
});
if (formMassage) {
    formMassage.addEventListener("submit", sendMassage);
}
if (inputMassage) {
    inputMassage.addEventListener("click", defaultInput);
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
renderMessageHistory();
