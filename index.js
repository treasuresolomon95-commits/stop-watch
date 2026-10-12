const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const reset = document.getElementById("reset");
const lapBtn = document.getElementById("lapBtn");
// const container = document.getElementById("container");
const lapscontainer = document.getElementById("laps")
const toggleTheme = document.getElementById("themeToggle")


let ms = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;


let interval = null;
let running = false;

let laps = [];

startBtn.addEventListener("click", ()=>{
    if (!running){
        interval = setInterval(startTimer, 10);
        running = true;
    }
})
stopBtn.addEventListener("click", ()=>{
    clearInterval(interval)
    running = false;
})
reset.addEventListener("click", ()=>{
    clearInterval(interval);
    running = false;
    ms = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    laps = [];
    lapscontainer.innerHTML = "";
    updatedisplay()
});

lapBtn.addEventListener("click", ()=>{
    if (!running) return;
    const laptime = formatTime();
    laps.push(laptime);
    displayLaps()
});

function startTimer(){
    ms += 10;
    if (ms >= 1000);
    {ms = 0;
        seconds++;
    }
    if (seconds >= 60){
        seconds = 0;
        minutes++
    }
    if (minutes >= 60){
        minutes = 0;
        hours++;
    }
    updatedisplay()
}
function formatTime(){
    return`${pad(hours)}:${pad(minutes)}: ${pad(seconds)}.${String(ms).padStart(3, '0')}`
}
function updatedisplay(){
    display.textContent = formatTime()
}
function pad(value){
    return String(value).padStart(2, '0')
}
function displayLaps(){
    lapscontainer.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.textContent = `lap ${index + 1}: ${lap}`
        lapscontainer.appendChild(li)
    }) 
}

// dark mode
function applyTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");
    toggleTheme.textContent = theme === "dark" ? "light" : "dark";
    // if == isDark
    // else === light
    localStorage.setItem("theme", theme);
}

toggleTheme.addEventListener("click", ()=>{
    const isDark = document.body.classList.contains("dark");
    applyTheme(isDark ? "light" : "dark");
});

const savedTheme = localStorage.getItem("theme") || (window.matchMedia("prefers-color-scheme: dark").matches ? "dark": "light")

applyTheme(savedTheme);
