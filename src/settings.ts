import { settings, applyNewUserName } from "./api.js";
export const settingsButton: HTMLElement | null = document.querySelector("#settingsButton");

const closeButton: HTMLElement | null = document.querySelector("#closeSettingsBtn");
const applyNewUserNameBtn: HTMLElement | null = document.querySelector("#applyNewUserNameBtn");

export let currentUserName: string | null = localStorage.getItem("currentName");
const themeSelect: HTMLSelectElement | null = document.querySelector("#theme");
export const themeSelectBtn: HTMLElement | null = document.querySelector("#applyNewTheme");

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

export function applyNewTheme() {
	if (themeSelect) {
		const selectedTheme = themeSelect.value;
		console.log(selectedTheme);
		document.documentElement.setAttribute("data-theme", selectedTheme);
		localStorage.setItem('theme', selectedTheme)
	}
}

export function getThemeFroLS() {
	const themeFromLS: string | null = localStorage.getItem("theme");
	if(themeFromLS){
		document.documentElement.setAttribute("data-theme", themeFromLS);
	}
}

if (closeButton) {
	closeButton.addEventListener("click", closeSettings);
}
