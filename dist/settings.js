import { settings, applyNewUserName } from "./api.js";
export const settingsButton = document.querySelector("#settingsButton");
const closeButton = document.querySelector("#closeSettingsBtn");
const applyNewUserNameBtn = document.querySelector("#applyNewUserNameBtn");
export let currentUserName = localStorage.getItem("currentName");
const themeSelect = document.querySelector("#theme");
export const themeSelectBtn = document.querySelector("#applyNewTheme");
export function setCurrentUserName(name) {
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
        localStorage.setItem("theme", selectedTheme);
    }
}
export function getThemeFroLS() {
    const themeFromLS = localStorage.getItem("theme");
    if (themeFromLS) {
        document.documentElement.setAttribute("data-theme", themeFromLS);
    }
}
if (closeButton) {
    closeButton.addEventListener("click", closeSettings);
}
