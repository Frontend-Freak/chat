/* import { authorizationWindow } from "./authorization.js";
import { currentEmail } from "./api.js"; */
import { serverUrl } from "./api.js";
import { getDataUser } from "./api.js";
import { currentUserName } from "./settings.js";
export const formMassage = document.querySelector("#formMassage");
export const inputMassage = document.querySelector("#inputMassage");
export const chatWindow = document.querySelector("#chatWindow");
getDataUser();
let allMessages = [];
let loadedCount = 0;
const loadSize = 20;
export function createMassage(message) {
    const template = document.querySelector("#messageTemplate");
    if (!template)
        return null;
    const templateContent = template.content.cloneNode(true);
    const nameElement = templateContent.querySelector(".user__name");
    if (nameElement)
        nameElement.textContent = `${message.user.name}: `;
    const messageElement = templateContent.querySelector("#massage");
    if (!messageElement)
        return null;
    messageElement.textContent = message.text;
    const timeElement = templateContent.querySelector("#timeMassage");
    if (timeElement)
        timeElement.textContent = message.updatedAt ? new Date(message.updatedAt).toTimeString().slice(0, 5) : new Date().toTimeString().slice(0, 5);
    const container = document.createElement("div");
    container.appendChild(templateContent);
    if (message.user.name === currentUserName && inputMassage) {
        inputMassage.value = "";
        inputMassage.placeholder = "Введите сообщение...";
        inputMassage.classList.remove("placeholder-red");
    }
    return container;
}
function loadMoreMessages() {
    if (!chatWindow)
        return;
    const nextMessages = allMessages.slice(loadedCount, loadedCount + loadSize);
    if (nextMessages.length === 0)
        return;
    // Сохраняем текущую прокрутку
    const scrollPositionBefore = chatWindow.scrollHeight - chatWindow.scrollTop;
    // Вставляем новые сообщения в начало
    nextMessages.reverse().forEach((msg) => {
        const msgElement = createMassage(msg);
        if (msgElement)
            chatWindow.insertBefore(msgElement, chatWindow.firstChild);
    });
    loadedCount += nextMessages.length;
    // Плавно восстанавливаем прокрутку
    const scrollToPosition = chatWindow.scrollHeight - scrollPositionBefore;
    chatWindow.scrollTo({ top: scrollToPosition, behavior: "smooth" });
    // Если сообщений больше нет
    if (loadedCount >= allMessages.length) {
        const endMessage = document.createElement("div");
        endMessage.textContent = "Вся история загружена";
        endMessage.style.textAlign = "center";
        endMessage.style.margin = "10px 0";
        chatWindow.appendChild(endMessage);
    }
}
export function defaultInput() {
    if (inputMassage) {
        inputMassage.value = "";
        inputMassage.style.borderColor = "black";
        inputMassage.classList.remove("placeholder-red");
    }
}
export async function renderMessageHistory() {
    const token = localStorage.getItem("code");
    try {
        const response = await fetch(`${serverUrl}/messages/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok)
            return;
        const result = await response.json();
        allMessages = result.messages.reverse(); // последние сообщения внизу
        loadedCount = 0;
        // Рендерим первые 20 сообщений
        loadMoreMessages();
        // Скроллим вниз к последнему сообщению при первой загрузке
        if (chatWindow)
            chatWindow.scrollTo({ top: chatWindow.scrollHeight, behavior: "smooth" });
        // Вешаем обработчик скролла
        if (chatWindow) {
            chatWindow.addEventListener("scroll", () => {
                if (chatWindow.scrollTop === 0) {
                    loadMoreMessages();
                }
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}
/* export async function renderMessageHistory() {
    const token: string | null = localStorage.getItem("code");
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
        }
        interface OpponentMessage {
            updatedAt: string;
            text: string;
            user: {
                name: string;
                email: string;
            };
        }
        const result = await response.json();
        console.log(result)
        if (!token || result.token) {
            if (authorizationWindow) {
                authorizationWindow.classList.add("active");
            }
            return;
        }
        const messageArray: OpponentMessage[] = result.messages;

        messageArray.reverse().forEach((element: OpponentMessage) => {
            const template: HTMLTemplateElement | null = document.querySelector("#messageTemplate");
            const opponentEmail = element.user.email;
            if (!template) {
                return;
            }
            const templateContent = template.content.cloneNode(true) as DocumentFragment;
            const name = templateContent.querySelector(".user__name");
            const message = templateContent.querySelector("#massage");
            const time = templateContent.querySelector("#timeMassage");
            const massageContainer = templateContent.querySelector(".messages");
            if (massageContainer) {
                if (opponentEmail === currentEmail) {
                    massageContainer.classList.add("my__messages");
                } else {
                    massageContainer.classList.add("opponent__messages");
                }
            }

            const messageDate = element.updatedAt;
            const date = new Date(messageDate).toTimeString().slice(0, 5);
            if (name) {
                name.textContent = `${element.user.name}: `;
            }
            if (message) {
                message.textContent = element.text;
            }
            if (time) {
                time.textContent = date;
            }

            if (!chatWindow) {
                return;
            }
            chatWindow.append(templateContent);
        });
    } catch (error) {
        console.error(error);
    }
}
 */
