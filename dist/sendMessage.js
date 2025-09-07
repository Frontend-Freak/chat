import { currentUserName } from "./settings.js";
import { getNameUser } from "./api.js";
import { socket } from "./index.js";
import { inputMessage } from "./UI.js";
export async function sendMassage(event) {
    event.preventDefault();
    await getNameUser();
    if (!inputMessage) {
        return;
    }
    const message = {
        userName: currentUserName,
        text: inputMessage.value,
    };
    console.log(message);
    socket.send(JSON.stringify(message));
}
