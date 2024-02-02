const users = []
const user = { id:"", name:"", votou:false}
let websocket

//lobby elements
var containerPlayer = document.querySelector("#div-players");
var div_lobby = document.querySelector("#div-lobby");

//botao do login
var botaoLogin = document.querySelector("#buttonSend-login");
var minhaSection = document.querySelector("#section-login");
var input_login = document.querySelector("#LoginNome");



console.log(botaoLogin)
botaoLogin.addEventListener("click", function() {

    if (input_login.value != "") {

        user.id = crypto.randomUUID()
        user.name = input_login.value

        websocket = new WebSocket("ws://localhost:8080")
        
        websocket.onopen = (event) => {
            console.log("WebSocket connection opened");

            // Now that the connection is open, you can send data
            websocket.send(`Usuario: ${user.name} entrou no chat`);
        };

        //nao da bola
        websocket.onerror = (event) => {
            console.error("WebSocket erro fudido fdp:", event);
        };

        console.log(user)
        users.push(user)

        minhaSection.style.display = "none"
        div_lobby.style.display = "flex"


        listaPlayers(users)
    }
    else {
        window.alert("Preencha os campos");
    }
});




///
function listaPlayers(users){
    users.forEach(x => {
        containerPlayer.innerHTML += `
            <p class="user-lobby-ativo">${x.name}</p>
            <br>
        `;
    });
}








