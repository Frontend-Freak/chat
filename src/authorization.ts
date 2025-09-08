export const getCodeBtn: HTMLElement | null = document.querySelector("#getCodeBtn");
export const confirmationWindow: HTMLElement | null = document.querySelector("#confirmation");
export const authorizationWindow: HTMLElement | null = document.querySelector("#authorization");
const enterCodeBtn: HTMLElement | null = document.querySelector("#enterCodeBtn");

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
