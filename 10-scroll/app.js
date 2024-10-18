const { link } = require("fs");

// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// close link 
const navToggle = document.querySelector(".nav-toggle");
const LinksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
    // linksContainer.classList.toggle("show-links");
    const containerHeight = LinksContainer.getBoundingClientRect().height;
    if (containerHeight === 0) {
        links.style.height = `${links.scrollHeight}px`;
    } else {
        LinksContainer.style.height = 0;
    }
    console.log(LinksContainer.getBoundingClientRect());
});

// fixed navbar
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
    // setup back to top link
    if (scrollHeight > 500) {
        console.log("hello");

        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }
})