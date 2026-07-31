// ===========================
// INTRO SCREEN
// ===========================

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("intro").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("intro").style.display = "none";
        }, 1000);

    }, 5000);
});

// ===========================
// ENVELOPE OPEN
// ===========================

const envelope = document.querySelector(".envelope");
const openBtn = document.getElementById("openEnvelope");

openBtn.addEventListener("click", () => {
    envelope.classList.add("open");
    startTyping();
    document.getElementById("letterSection").scrollIntoView({
        behavior: "smooth"
    });
});

// ===========================
// TYPEWRITER LETTER
// ===========================

const letter = `Dear Jasleen ❤️

Happy Girlfriend's Day!

You are the most beautiful part of my life.

Every smile of yours makes my world brighter.

Thank you for being with me.

I promise to love you,
respect you,
and stand beside you forever.

I Love You ❤️`;

let i = 0;

function startTyping() {

    const box = document.getElementById("typingText");

    if (box.innerHTML !== "") return;

    function type() {

        if (i < letter.length) {

            box.innerHTML += letter.charAt(i);

            i++;

            setTimeout(type, 45);

        }

    }

    type();

}

// ===========================
// LOVE TIMER
// ===========================

// अपनी तारीख यहाँ बदलना
const loveDate = new Date("2025-01-01 00:00:00");

function updateTimer() {

    const now = new Date();

    const diff = now - loveDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;

    const minutes = Math.floor(diff / (1000 * 60)) % 60;

    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById("loveTimer").innerHTML =
        `${days} Days ❤️ ${hours} H ${minutes} M ${seconds} S`;

}

setInterval(updateTimer, 1000);

updateTimer();

// ===========================
// FLOATING EFFECTS
// ===========================

function createFloating(containerId, emoji, className, total) {

    const container = document.getElementById(containerId);

    for (let j = 0; j < total; j++) {

        const el = document.createElement("div");

        el.className = className;

        el.innerHTML = emoji;

        el.style.left = Math.random() * 100 + "%";

        el.style.animationDuration = (6 + Math.random() * 8) + "s";

        el.style.animationDelay = (Math.random() * 6) + "s";

        container.appendChild(el);

    }

}

createFloating("hearts", "❤️", "heart", 25);

createFloating("stars", "⭐", "star", 20);

createFloating("sparkles", "✨", "sparkle", 20);

createFloating("butterflies", "🦋", "butterfly", 12);// ===========================
// CELEBRATION
// ===========================

const celebrateBtn = document.getElementById("celebrate");

celebrateBtn.addEventListener("click", () => {

    launchConfetti();

    launchFireworks();

});

// ===========================
// CONFETTI
// ===========================

function launchConfetti(){

    for(let i=0;i<120;i++){

        const confetti=document.createElement("div");

        confetti.innerHTML="🎉";

        confetti.style.position="fixed";

        confetti.style.left=Math.random()*100+"vw";

        confetti.style.top="-30px";

        confetti.style.fontSize=(16+Math.random()*18)+"px";

        confetti.style.pointerEvents="none";

        confetti.style.zIndex="9999";

        confetti.style.transition="transform 4s linear, opacity 4s";

        document.body.appendChild(confetti);

        setTimeout(()=>{

            confetti.style.transform=
            `translateY(${window.innerHeight+100}px)
             rotate(${Math.random()*720}deg)`;

            confetti.style.opacity="0";

        },50);

        setTimeout(()=>{

            confetti.remove();

        },4500);

    }

}

// ===========================
// FIREWORKS
// ===========================

const canvas=document.getElementById("fireworks");

const ctx=canvas.getContext("2d");

function resizeCanvas(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

function launchFireworks(){

let particles=[];

for(let i=0;i<180;i++){

particles.push({

x:canvas.width/2,

y:canvas.height/2,

dx:(Math.random()-0.5)*12,

dy:(Math.random()-0.5)*12,

life:100

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach((p)=>{

ctx.beginPath();

ctx.arc(p.x,p.y,3,0,Math.PI*2);

ctx.fillStyle=`hsl(${Math.random()*360},100%,60%)`;

ctx.fill();

p.x+=p.dx;

p.y+=p.dy;

p.dy+=0.03;

p.life--;

});

particles=particles.filter(p=>p.life>0);

if(particles.length){

requestAnimationFrame(animate);

}else{

ctx.clearRect(0,0,canvas.width,canvas.height);

}

}

animate();

}

// ===========================
// PHOTO ANIMATION
// ===========================

const photos=document.querySelectorAll(".gallery img");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="scale(1)";

}

});

});

photos.forEach(img=>{

img.style.opacity="0";

img.style.transform="scale(.8)";

img.style.transition="1s";

observer.observe(img);

});

// ===========================
// END MESSAGE
// ===========================

setTimeout(()=>{

console.log("Happy Girlfriend's Day ❤️");

},1000);