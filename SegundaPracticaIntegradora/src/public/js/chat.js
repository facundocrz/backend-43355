const socket = io();

const messages = document.querySelector("#chat");
const chatForm = document.querySelector("#chatForm");
const message = document.querySelector("#message");
const user = document.querySelector("#user");

const getChat = async () => {
  try {
    const chat = await fetch("/api/chat");
    return chat.json();
  } catch (error) {
    console.log(error);
  }
};

const addChat = async (chat) => {
  const chats = (await chat)
    .map((msg) => {
      return `<li><span class="user">${msg.user}</span>: ${msg.message}</li>`;
    })
    .join(" ");
  messages.innerHTML = chats;
};

const sendMessage = async (msg) => {
  const msgString = JSON.stringify(msg);
  try{
    fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: msgString,
    });
  } catch(error){
    console.log(error);
  }
};

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {
    user: user.value,
    message: message.value,
  };
  socket.emit("chat message", formData);
  sendMessage(formData);
  message.value = "";
});

socket.on("chat message", (msg) => {
  const newMessage = `
    <li><span class="user">${msg.user}</span>: ${msg.message}</li>`;
  messages.innerHTML += newMessage;
});

addChat(getChat());
