import { confirmationWindow } from "./authorization.js";
import { getDataUser } from "./api.js";
export const confirmCodeBtn = document.querySelector("#confirmCodeBtn");
export const confirmCodeInput = document.querySelector("#confirmCode");
export function saveCodeToCookie() {
    if (confirmCodeInput) {
        localStorage.setItem("code", confirmCodeInput.value);
    }
    if (confirmationWindow) {
        confirmationWindow.classList.remove("active");
    }
    getDataUser();
    console.log(localStorage.getItem("code"));
}
