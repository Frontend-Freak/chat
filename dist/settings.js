import { settings } from "./api.js";
import { applyNewUserName } from "./api.js";
export const settingsButton = document.querySelector("#settingsButton");
const closeButton = document.querySelector("#closeSettingsBtn");
const applyNewUserNameBtn = document.querySelector("#applyNewUserNameBtn");
export let currentUserName = "";
export function setCurrentUserName(name) {
    currentUserName = name;
}
if (applyNewUserNameBtn) {
    applyNewUserNameBtn.addEventListener("click", applyNewUserName);
}
export function openSettings() {
    if (settings) {
        settings.classList.add("active");
    }
}
export function closeSettings() {
    if (settings) {
        settings.classList.remove("active");
    }
}
if (closeButton) {
    closeButton.addEventListener("click", closeSettings);
}
