let input = undefined, btn, n, aux = "-1", crt_points = 0;

document.getElementById("input-id").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.getElementById("input-btn").click();
    }
});

function getUserInput() {
    input = document.getElementById("input-id").value;
    n = parseInt(input);
    if (Number.isInteger(n) && n > 2) {
        createButtons(n);
        document.getElementById("initial").classList.add("hide");
        document.getElementById("box").classList.remove("hide");
        document.getElementById("box").classList.add("container");
        play_game(n);
    }
    else {
        document.getElementById("initial-msg").innerHTML =
             "Input error! Please enter an integer number that is higher than 2."
    }
}

function createButtons(n) {
    let nButtons = Array.from(Array(n).keys()).map(i => (
        `<button
            id = "${i + 1}"
            class = "buttons"
        >
            ${i + 1}
        </button>
        `
    )).join("");
    document.getElementById("box").innerHTML += nButtons;
}

function play_game(n) {
    const score = document.getElementById("score"); 
    let timer = 20;
    const countdown = document.getElementById("timer");
    const interval = setInterval(updateCountdown, 1000); 
    function updateCountdown () {
        if (timer > 0) {
            mole_appears();
        }
        countdown.innerHTML = timer;
        --timer;
        if (timer < 0) {
            document.getElementById("total-score").classList.remove("visible");
            document.getElementById("total-score").innerText += (" " + crt_points);
            clearInterval(interval);
            
        }
    }
}

function mole_appears() {        
    let crt_mole = Math.floor(Math.random()* n + 1);
    while (crt_mole === aux) {
        crt_mole = Math.floor(Math.random()* n + 1);
    }
    aux = crt_mole;
    crt_mole = `${crt_mole}`;
    document.getElementById(crt_mole).classList.add("appears");
    document.getElementById(crt_mole).addEventListener("click", add_points, {once:true});
    function add_points() {
        crt_points += 10;
        score.innerHTML = crt_points;
    };
    setTimeout( () => {
        document.getElementById(crt_mole).classList.remove("appears");
        document.getElementById(crt_mole).removeEventListener("click", add_points);
    },1000);
}