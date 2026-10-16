document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".order form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Sorry! You can't submit a form yet due to the development of the website. We will get in to it soon. Thank you for your understanding and patience! <3");
    });
});