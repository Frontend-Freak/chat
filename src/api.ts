import { currentUserName, setCurrentUserName } from "./settings.js";
import { authorizationWindow } from "./authorization.js";
export const settings: HTMLElement | null = document.querySelector("#settings");
export const serverUrl: string = "https://edu.strada.one/api";
export let currentEmail: string = "";
const userName: HTMLElement | null = document.querySelector("#userName");

export async function getCodeFetch() {
	const emailInput: HTMLInputElement | null = document.querySelector("#email");
	if (!emailInput) {
		return;
	}
	if (emailInput.value.trim() === "") {
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
			if (authorizationWindow) {
				authorizationWindow.classList.add("active");
			}
			console.error("Письмо не отправлено");
			alert("Письмо не отправлено");
			return;
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
	const nameValue: string = inputNewUserName.value.trim();
	if (!nameValue) {
		alert("Строка имени не может быть пустой");
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
			console.error("Ошибка, имя не изменено");
			alert("Ошибка, имя не изменено");
			return;
		}
		location.reload();
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
			return;
		}
		const result = await response.json();
		currentEmail = result.email;
		if (result.token !== localStorage.getItem("code")) {
			alert("Введен не верный код");
			if (authorizationWindow) {
				authorizationWindow.classList.add("active");
			}
			if (userName) {
				userName.textContent = currentUserName;
			}
		}
	} catch (error) {
		console.error(error);
	}
}


export async function getNameUser() {
	const token: string | null = localStorage.getItem("code");
	try {
		if (!token) {
			if (authorizationWindow) {
				authorizationWindow.classList.add("active");
			}
		}
		const response = await fetch(`${serverUrl}/user/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			console.log("Ошибка получения имени, повторите попытку");
			return 
		}
		const result = await response.json();
		localStorage.setItem("currentName", result.name);

		if (result.token === localStorage.getItem("code")) {
			if (result.name) {
				if (currentUserName) {
					setCurrentUserName(currentUserName);
				}
				if (userName) {
					userName.textContent = `${currentUserName}: `;
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