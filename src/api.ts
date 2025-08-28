import { setCurrentUserName } from "./settings.js";
import { authorizationWindow } from "./authorization.js";
export const settings: HTMLElement | null = document.querySelector("#settings");
export const serverUrl: string = "https://edu.strada.one/api";
export let currentEmail: string = "";

export async function getCodeFetch() {
	const emailInput: HTMLInputElement | null = document.querySelector("#email");
	if (!emailInput) {
		return;
	}
	if (emailInput.value === "") {
		alert("ВВедите почту!!");
	}
	const emailAddress = {
		email: emailInput.value,
	};
	try {
		const response = await fetch(`${serverUrl}/user`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(emailAddress),
		});
		if (!response.ok) {
			return("Письмо не отправлено");
		}
		const result = await response.json();
		alert(`Код отправлен на почту ${result.email}`);
	} catch (error) {
		console.error(error);
		alert(error);
	}
}

export async function applyNewUserName() {
	const inputNewUserName: HTMLInputElement | null = document.querySelector("#inputNewUserName");
	const token: string | null = localStorage.getItem("code");
	if (!inputNewUserName) {
		return;
	}
	const nameValue: string = inputNewUserName.value;
	if (!nameValue) {
		alert("Нет имени");
		return;
	}
	if (inputNewUserName.value === "") {
		alert("Введите новое имя");
		return;
	}
	const newUserName = {
		name: nameValue,
	};
	try {
		const response = await fetch(`${serverUrl}/user`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(newUserName),
		});
		const nameValue = inputNewUserName.value;
		setCurrentUserName(nameValue);
		if (!nameValue) {
			return;
		}
		getDataUser();
		if (!response.ok) {
			return ("Ошибка, имя не изменено");
		}
		alert(`Имя изменено на ${nameValue}`);
		if (settings) {
			settings.classList.remove("active");
		}
	} catch (error) {
		console.error(error);
		alert(error);
	}
}

export async function getDataUser() {
	const token: string | null = localStorage.getItem("code");
	try {
		const response = await fetch(`${serverUrl}/user/me`, {
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
			return ("Введен не верный код");
		}
		const result = await response.json();
		currentEmail = result.email;
		const userName: HTMLElement | null = document.querySelector("#userName");
		if (result.token !== localStorage.getItem("code")) {
			if (authorizationWindow) {
				authorizationWindow.classList.add("active");
			}
			if (userName) {
				userName.textContent = result.name;
			}
		}
	} catch (error) {
		console.error(error);
	}
}

export async function getNameUser() {
	const token: string | null = localStorage.getItem("code");
	if (!token) {
		if (authorizationWindow) {
			authorizationWindow.classList.add("active");
		}
	}
	try {
		const response = await fetch(`${serverUrl}/user/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			return ("Ошибка");
		}
		const result = await response.json();
		const userName: HTMLElement | null = document.querySelector("#userName");
		if (result.token === localStorage.getItem("code")) {
			if (result.name) {
				setCurrentUserName(result.name);
				if (userName) {
					userName.textContent = `${result.name}: `;
				}
			}
		}
	} catch (error) {
		console.error(error);
		if (authorizationWindow) {
			authorizationWindow.classList.add("active");
		}
	}
}
