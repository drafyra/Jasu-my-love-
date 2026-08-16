/* =========================================================
   THE LAST CHAPTER
   CINEMATIC JAVASCRIPT
========================================================= */


/* =========================================================
   INTRO
========================================================= */

window.addEventListener("load", () => {

    const intro = document.getElementById("intro");
    const loadingNumber =
        document.getElementById("loadingNumber");

    let number = 0;

    const counter = setInterval(() => {

        number++;

        if (loadingNumber) {
            loadingNumber.textContent = number;
        }

        if (number >= 100) {
            clearInterval(counter);
        }

    }, 35);


    setTimeout(() => {

        if (intro) {
            intro.classList.add("hide");
        }

        document.body.classList.remove("no-scroll");

    }, 5200);

});


document.body.classList.add("no-scroll");


/* =========================================================
   CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");

if (
    cursorDot &&
    cursorRing &&
    window.innerWidth > 768
) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    });


    function animateCursor() {

        ringX += (mouseX - ringX) * .15;
        ringY += (mouseY - ringY) * .15;

        cursorRing.style.left =
            ringX + "px";

        cursorRing.style.top =
            ringY + "px";

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    document
        .querySelectorAll("button, img")
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {
                    document.body.classList.add(
                        "cursor-hover"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    document.body.classList.remove(
                        "cursor-hover"
                    );
                }
            );

        });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar =
    document.getElementById("progressBar");

function updateProgress() {

    if (!progressBar) return;

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    const progress =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    progressBar.style.width =
        progress + "%";

}

window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
);

updateProgress();


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-scale"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   SILENCE SCENE
========================================================= */

const silenceLines =
    document.querySelectorAll(
        ".silence-line"
    );


const silenceObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    silenceLines.forEach(
                        (line, index) => {

                            setTimeout(() => {

                                line.classList.add(
                                    "active"
                                );

                            }, index * 1200);

                        }
                    );

                    silenceObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .4
        }
    );


const silenceSection =
    document.querySelector(".silence-section");


if (silenceSection) {

    silenceObserver.observe(
        silenceSection
    );

}


/* =========================================================
   CHAPTER NAVIGATION
========================================================= */

const chapterNumber =
    document.getElementById("chapterNumber");

const chapterName =
    document.getElementById("chapterName");


const chapterSections = [
    {
        element: document.querySelector(".hero"),
        number: "01",
        name: "BEGINNING"
    },
    {
        element: document.querySelector(".dark-chapter"),
        number: "02",
        name: "MEMORIES"
    },
    {
        element: document.querySelector(".break-section"),
        number: "03",
        name: "THE BREAK"
    },
    {
        element: document.querySelector(".letter-intro"),
        number: "04",
        name: "LAST LETTER"
    },
    {
        element: document.querySelector(".letting-go"),
        number: "05",
        name: "LETTING GO"
    },
    {
        element: document.querySelector(".final-message"),
        number: "06",
        name: "GOODBYE"
    }
];


function updateChapter() {

    const middle =
        window.innerHeight * .45;

    let active =
        chapterSections[0];

    chapterSections.forEach(section => {

        if (!section.element) return;

        const rect =
            section.element.getBoundingClientRect();

        if (
            rect.top <= middle
            &&
            rect.bottom >= middle
        ) {

            active = section;

        }

    });


    if (chapterNumber) {

        chapterNumber.textContent =
            active.number;

    }

    if (chapterName) {

        chapterName.textContent =
            active.name;

    }

}

window.addEventListener(
    "scroll",
    updateChapter,
    { passive: true }
);

updateChapter();


/* =========================================================
   PHOTO LIGHTBOX
========================================================= */

const viewer =
    document.getElementById("photoViewer");

const viewerImage =
    document.getElementById("viewerImage");

const closeViewer =
    document.getElementById("closeViewer");


const photoButtons =
    document.querySelectorAll(
        ".photo-open"
    );


photoButtons.forEach(button => {

    button.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const photo =
                button.parentElement
                    .querySelector("img");

            if (!photo || !viewer) return;

            viewerImage.src =
                photo.src;

            viewerImage.alt =
                photo.alt;

            viewer.classList.add(
                "active"
            );

            viewer.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "no-scroll"
            );

        }
    );

});


function closePhotoViewer() {

    if (!viewer) return;

    viewer.classList.remove(
        "active"
    );

    viewer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


if (closeViewer) {

    closeViewer.addEventListener(
        "click",
        closePhotoViewer
    );

}


if (viewer) {

    viewer.addEventListener(
        "click",
        (event) => {

            if (
                event.target === viewer
            ) {

                closePhotoViewer();

            }

        }
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closePhotoViewer();

        }

    }
);


/* =========================================================
   TYPEWRITER LETTER
========================================================= */

const letterText = `Dear Jasleen,

I don't know exactly where our story changed.

Maybe there was one moment.
Maybe there were hundreds of little moments.
Maybe we simply became two people
standing farther and farther apart.

But I know one thing.

I don't want the last chapter
to be filled with anger.

I don't want to remember everything
through the pain of how it ended.

I want to remember the smiles.

The conversations.

The little moments that once made
ordinary days feel special.

Thank you for every memory.

Thank you for every moment
that made me smile.

Thank you for being a part of my life,
even if that part was never meant
to last forever.

I used to think that loving someone
meant holding on no matter what.

Now I understand something different.

Sometimes loving someone also means
knowing when to let go.

So I won't ask you to stay.

I won't ask you to reply.

I won't ask for an explanation.

And I won't keep waiting for something
that may never come.

There is no anger here.

Only acceptance.

I genuinely hope you find happiness.

I hope life is kind to you.

I hope you achieve everything
you ever wanted.

And wherever life takes you,
I hope you smile.

I will carry the good memories with me.

Not because I am waiting for you to return.

But because they were real,
and because they mattered.

You will always be a chapter
I remember.

But I think this is where
I have to close the book.

Take care of yourself.

And if someday you remember me,
I hope you remember the good.

This is not goodbye
because I stopped caring.

It is goodbye because
I finally learned to let go.

Thank you.

For everything.

Goodbye. ❤️‍🩹`;


const typingBox =
    document.getElementById(
        "typingText"
    );


let typingStarted = false;


function typeLetter() {

    if (!typingBox) return;

    if (typingStarted) return;

    typingStarted = true;

    typingBox.textContent = "";

    let index = 0;

    function typeCharacter() {

        if (
            index >= letterText.length
        ) {

            return;

        }

        typingBox.textContent +=
            letterText.charAt(index);

        index++;

        let speed = 32;

        if (
            letterText.charAt(index - 1)
            === "."
            ||
            letterText.charAt(index - 1)
            === ","
        ) {

            speed = 120;

        }

        if (
            letterText.charAt(index - 1)
            === "\n"
        ) {

            speed = 220;

        }

        setTimeout(
            typeCharacter,
            speed
        );

    }

    typeCharacter();

}


const letterSection =
    document.getElementById(
        "letterSection"
    );


const letterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    setTimeout(
                        typeLetter,
                        600
                    );

                    letterObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .3
        }
    );


if (letterSection) {

    letterObserver.observe(
        letterSection
    );

}


/* =========================================================
   IMAGE PARALLAX
========================================================= */

const memoryImages =
    document.querySelectorAll(
        ".memory-photo img"
    );


function parallaxImages() {

    if (window.innerWidth < 700) {
        return;
    }

    memoryImages.forEach(image => {

        const parent =
            image.parentElement;

        if (!parent) return;

        const rect =
            parent.getBoundingClientRect();

        const center =
            window.innerHeight / 2;

        const distance =
            rect.top + rect.height / 2
            - center;

        const movement =
            distance * -0.025;

        image.style.transform =
            `scale(1.06)
             translateY(${movement}px)`;

    });

}


window.addEventListener(
    "scroll",
    parallaxImages,
    { passive: true }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

const heroBackground =
    document.querySelector(
        ".hero-background"
    );


function heroParallax() {

    if (!heroBackground) return;

    const scroll =
        window.scrollY;

    if (scroll <= window.innerHeight) {

        heroBackground.style.transform =
            `scale(1.1)
             translateY(${scroll * .12}px)`;

    }

}


window.addEventListener(
    "scroll",
    heroParallax,
    { passive: true }
);


/* =========================================================
   FINAL FADE
========================================================= */

const finalMessage =
    document.querySelector(
        ".final-message"
    );


const finalTitle =
    document.querySelector(
        ".final-title"
    );


const finalObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    if (finalTitle) {

                        finalTitle.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        "translateY(40px)"
                                },
                                {
                                    opacity: 1,
                                    transform:
                                        "translateY(0)"
                                }
                            ],
                            {
                                duration: 1800,
                                easing:
                                    "cubic-bezier(.2,.8,.2,1)",
                                fill: "forwards"
                            }
                        );

                    }

                }

            });

        },
        {
            threshold: .45
        }
    );


if (finalMessage) {

    finalObserver.observe(
        finalMessage
    );

}


/* =========================================================
   IMAGE LOAD SAFETY
========================================================= */

document
    .querySelectorAll(".memory-photo img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.getAttribute("src")
                );

            }
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateProgress();
        updateChapter();
        parallaxImages();
        heroParallax();

    }
);
