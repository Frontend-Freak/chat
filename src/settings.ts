import { settings, applyNewUserName } from "./api.js";
export const settingsButton: HTMLElement | null = document.querySelector("#settingsButton");

const closeButton: HTMLElement | null = document.querySelector("#closeSettingsBtn");
const applyNewUserNameBtn: HTMLElement | null = document.querySelector("#applyNewUserNameBtn");

export let currentUserName: string | null = localStorage.getItem("currentName");

export function setCurrentUserName(name: string) {
	localStorage.removeItem("currentName");
	currentUserName = name;
	localStorage.setItem("currentName", name);
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
