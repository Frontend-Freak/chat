import { authorizationWindow } from "./authorization.js";
import { currentEmail, serverUrl, getDataUser } from "./api.js";
import { currentUserName } from "./settings.js";
export const formMessage = document.querySelector("#formMassage");
export const inputMessage = document.querySelector("#inputMassage");
export const chatWindow = document.querySelector("#chatWindow");
getDataUser();
let allMessages = [];
let loadedCount = 0;
const loadSize = 20;
export function createMessage(message, isHistory = false) {
    const template = document.querySelector("#messageTemplate");
    if (!template || !chatWindow) {
        return;
    }
    const templateContent = template.content.cloneNode(true);
    const nameElement = templateContent.querySelector(".user__name");
    const messageElement = templateContent.querySelector("#massage");
    const timeElement = templateContent.querySelector("#timeMassage");
    const container = templateContent.querySelector(".messages");
    if (nameElement) {
        nameElement.textContent = `${message.user.name}: `;
    }
    if (messageElement) {
        messageElement.textContent = message.text;
    }
    if (timeElement) {
        timeElement.textContent = new Date().toTimeString().slice(0, 5);
    }
    if (container) {
        container.classList.add(message.user.email === currentEmail ? "my__messages" : "opponent__messages");
    }
    if (isHistory) {
        chatWindow.append(templateContent);
    }
    else {
        chatWindow.prepend(templateContent);
    }
    if (inputMessage && message.user.name === currentUserName) {
        inputMessage.value = "";
        inputMessage.placeholder = "Введите сообщение...";
        inputMessage.classList.remove("placeholder-red");
    }
}
export function defaultInput() {
    if (inputMessage) {
        inputMessage.value = "";
        inputMessage.style.borderColor = "black";
        inputMessage.classList.remove("placeholder-red");
    }
}
export async function renderMessageHistory() {
    const token = localStorage.getItem("code");
    if (!token) {
        if (authorizationWindow) {
            authorizationWindow.classList.add("active");
        }
        return;
    }
    try {
        const response = await fetch(`${serverUrl}/messages/`, {
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
        if (result.token) {
            if (authorizationWindow) {
                authorizationWindow.classList.add("active");
            }
            return;
        }
        allMessages = result.messages;
        localStorage.setItem("messageHistoryArray", JSON.stringify(allMessages));
        loadedCount = 0;
        renderNextMessages();
        if (chatWindow) {
            chatWindow.scrollTop = chatWindow.scrollHeight;
            chatWindow.addEventListener("scroll", function () {
                const scrollPosition = chatWindow.scrollTop;
                if (scrollPosition === 0) {
                    renderNextMessages();
                }
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}
export function renderNextMessages() {
    if (!chatWindow) {
        return;
    }
    const nextMessages = allMessages.slice(loadedCount, loadedCount + loadSize);
    nextMessages.forEach((msg) => createMessage(msg, true));
    loadedCount += loadSize;
    if (loadedCount >= allMessages.length) {
        alert("Все сообщения загружены");
        console.log("Все сообщения загружены");
    }
}
