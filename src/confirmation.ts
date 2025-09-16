import { confirmationWindow } from "./authorization.js";
import { getDataUser } from "./api.js";
export const confirmCodeBtn: HTMLElement | null = document.querySelector("#confirmCodeBtn");
export const confirmCodeInput: HTMLInputElement | null = document.querySelector("#confirmCode");

export function saveCodeToCookie() {
	if (confirmCodeInput) {
		localStorage.setItem("code", confirmCodeInput.value);
	}
	if (confirmationWindow) {
		confirmationWindow.classList.remove("active");
	}
	location.reload();
	getDataUser();
}
