const loader = document.getElementById("loading-screen");
const loadWords = ["Fetching confidence...", "Loading surprise...", "Ready! Let's go~"]
const loadingText = document.getElementById("loading-text");
let index = 0;
const activeTitle = "yayy ur back ❤️";
const inactiveTitle = "WAIT, don't go! 🥺";
const correctButtons = document.querySelectorAll(".correctBtn");
const wrongButtons = document.querySelectorAll(".btn");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const notPage4 = document.getElementById("notpage4");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const notPage5 = document.getElementById("notpage5");
const page6 = document.getElementById("page6");
const page7 = document.getElementById("page7");
const notPage7 = document.getElementById("notpage7");

function updateLoadingText() {
    loadingText.textContent = loadWords[index];
    loadingText.style.opacity = "1";
    loadingText.style.transform = "translateY(0px)";
    setTimeout(() => { 
        loadingText.style.opacity = "0";
        loadingText.style.transform = "translateY(-20px)";
    }, 1000);
    setTimeout(() => {
        index = (index + 1) % loadWords.length;
        updateLoadingText();
    }, 1200);
}

function type(element, text, speed, callback) {
    let i = 0;
    element.textContent = "";
    function typeLetter() {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
            setTimeout(typeLetter, speed);
        } else if (callback) {
            callback();
        }
    }
    typeLetter();
}

function fadeIn(page) {
    const duration = 2000;
    page.querySelectorAll("h1, p, button").forEach((el, i) => {
        el.style.opacity = "0"; 
        el.style.transition = `opacity 0.5s ease-in`;
        setTimeout(() => {
            el.style.opacity = "1";
        }, i * duration);
    });
}

function switchPage(current, next) {
    current.style.transition = "opacity 0.5s ease-out";
    current.style.opacity = "0";
    setTimeout(() => {
        current.classList.add("hidden");
        current.style.opacity = "1";
        next.classList.remove("hidden");
        next.style.opacity = "0";
        next.style.transition = "opacity 0.5s ease-in";
        setTimeout(() => {
            next.style.opacity = "1";
        }, 500);
    }, 500);
}

window.addEventListener("load", function() {
    updateLoadingText();
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
            page1.classList.remove("hidden");
            fadeIn(page1, 1000);
        }, 500); 
    }, 3000); 
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = inactiveTitle;
    } else {
        document.title = activeTitle;
    }
});

correctButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.parentElement.id === "page1") {
            switchPage(page1, page2);
            fadeIn(page2);
        } else if (button.parentElement.id === "page2") {
            switchPage(page2, page3);
            fadeIn(page3);
        } else if (button.parentElement.id === "page3") {
            switchPage(page3, page4);
            fadeIn(page4);
        } else if (button.parentElement.id === "notpage4") {
            switchPage(notPage4, page4);
            fadeIn(page4);
        } else if (button.parentElement.id === "page4") {
            switchPage(page4, page5);
            fadeIn(page5);
        } else if (button.parentElement.id === "notpage5") {
            switchPage(notPage5, page6);
            fadeIn(page6);
        } else if (button.parentElement.id === "page5") {
            switchPage(page5, page6);
            fadeIn(page6);
        } else if (button.parentElement.id === "page6") {
            switchPage(page6, page7);
            fadeIn(page7);
        } 
    });
});

wrongButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.parentElement.id === "page3") {
            switchPage(page3, notPage4);
            fadeIn(notPage4);
        } else if (button.parentElement.id === "page4") {
            switchPage(page4, notPage5);
            fadeIn(notPage5);
        } else if (button.parentElement.id === "notpage4" || button.parentElement.id === "notpage5") {
            alert("noooo, you left 😔 refresh the page if you want to give me another chance!");
        } else if (button.parentElement.id === "page6") {
            switchPage(page6, notPage7);
            fadeIn(notPage7);
        } else if (button.parentElement.id === "page5") {
            switchPage(page5, page6);
            fadeIn(page6);
        }
    });
});







