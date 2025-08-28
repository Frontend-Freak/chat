export const getCodeBtn = document.querySelector("#getCodeBtn");
const enterCodeBtn = document.querySelector("#enterCodeBtn");
export const confirmationWindow = document.querySelector("#confirmation");
export const authorizationWindow = document.querySelector("#authorization");
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
