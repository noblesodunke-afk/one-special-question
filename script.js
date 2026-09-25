const card = document.getElementById("card");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let noAttempts = 0;

function moveNoButton() {
    noAttempts++;

    const padding = 20;

    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(
        padding,
        Math.random() * maxX
    );

    const randomY = Math.max(
        padding,
        Math.random() * maxY
    );

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    if (noAttempts >= 7) {
        noBtn.style.display = "none";
    }
}

noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("touchstart", function(event) {
    event.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener("click", function() {

    card.innerHTML = `
        <h1>You actually said yes!</h1>

        <p class="subtitle">
            So, when will you be free?
        </p>

        <div class="date-form">

            <label for="date">Choose a date</label>
            <input type="date" id="date">

            <label for="time">Choose a time</label>
            <input type="time" id="time">

            <button id="continueBtn">Continue</button>

        </div>
    `;

    document
        .getElementById("continueBtn")
        .addEventListener("click", showHeart);
});

function showHeart() {

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if (!date || !time) {
        alert("Please choose a date and time.");
        return;
    }

    const selectedDate = new Date(`${date}T${time}`);

    const formattedDate = selectedDate.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

    const formattedTime = selectedDate.toLocaleTimeString(
        "en-US",
        {
            hour: "numeric",
            minute: "2-digit"
        }
    );

    document.body.innerHTML = `

        <div class="heart-screen">

            <div class="floating-heart heart-one">♥</div>
            <div class="floating-heart heart-two">♥</div>
            <div class="floating-heart heart-three">♥</div>
            <div class="floating-heart heart-four">♥</div>

            <div class="heart-container">
                <div class="big-heart">♥</div>
            </div>

            <h1>It's a date!</h1>

            <p class="date-text">
                ${formattedDate}
            </p>

            <p class="time-text">
                ${formattedTime}
            </p>

        </div>
    `;
}

