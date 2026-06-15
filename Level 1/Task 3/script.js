const API_URL = "http://localhost:3000/users";

async function fetchUsers() {
    const response = await fetch(API_URL);
    const users = await response.json();

    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    users.forEach(user => {
        const li = document.createElement("li");
        li.textContent = user.name;
        userList.appendChild(li);
    });
}

async function addUser() {
    const name = document.getElementById("username").value;

    if(name === "") return;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
    });

    document.getElementById("username").value = "";
    fetchUsers();
}

fetchUsers();