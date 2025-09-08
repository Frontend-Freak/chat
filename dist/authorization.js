export const getCodeBtn = document.querySelector("#getCodeBtn");
export const confirmationWindow = document.querySelector("#confirmation");
export const authorizationWindow = document.querySelector("#authorization");
const enterCodeBtn = document.querySelector("#enterCodeBtn");
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
