// Handle Buy Button Clicks

const buyButtons = document.querySelectorAll(".buy-btn");

buyButtons.forEach(button => {
  button.addEventListener("click", () => {
    const bookName = button.getAttribute("data-book");
    alert(`🛒 "${bookName}" added to cart! (Demo)`);
  });
});
