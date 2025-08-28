export const getCodeBtn: HTMLElement | null = document.querySelector("#getCodeBtn");
const enterCodeBtn: HTMLElement | null = document.querySelector("#enterCodeBtn");
export const confirmationWindow: HTMLElement | null = document.querySelector("#confirmation");
export const authorizationWindow: HTMLElement | null = document.querySelector("#authorization");

function openConfirmation() {
	if (authorizationWindow) {
		authorizationWindow.classList.remove("active");
	}
	if (confirmationWindow) {
		confirmationWindow.classList.add("active");
	}
}

if (enterCodeBtn) {
	enterCodeBtn.addEventListener("click", openConfirmation);
}
