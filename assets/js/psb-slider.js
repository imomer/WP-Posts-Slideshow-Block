const slider = document.querySelector(".psb__slider"),
  firstSlide = slider.querySelectorAll(".psb__slide")[0],
  arrowIcons = document.querySelectorAll("#psb__wrapper .psb__control");
let isDragBegin = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  posDiff;

// Navigate with keyboard
const keyboardNav = (e) => {
  e = e || window.event;
  if (e.keyCode == "37") {
    arrowIcons[0].click();
  } else if (e.keyCode == "39") {
    arrowIcons[1].click();
  }
};

// Show/hide Arrows
const showHideArrows = () => {
  let scrollWidth = slider.scrollWidth - slider.clientWidth;
  arrowIcons[0].style.display = slider.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    slider.scrollLeft == scrollWidth ? "none" : "block";
};

// Arrow controls
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstSlideWidth = firstSlide.clientWidth;
    slider.scrollLeft +=
      icon.id == "psb_prev" ? -firstSlideWidth : firstSlideWidth;
    setTimeout(() => showHideArrows(), 60);
  });
});

// Complete the slide
const completeTheSlide = () => {
  // Stop if there is no slide
  if (
    slider.scrollLeft - (slider.scrollWidth - slider.clientWidth) > -1 ||
    slider.scrollLeft <= 0
  ) {
    return;
  }

  posDiff = Math.abs(posDiff);

  let firstSlideWidth = firstSlide.clientWidth;
  let valDifference = firstSlideWidth - posDiff;

  if (slider.scrollLeft > prevScrollLeft) {
    // if scroll to the right
    return (slider.scrollLeft +=
      posDiff > firstSlideWidth / 3 ? valDifference : -posDiff);
  }

  // if scroll to the left
  slider.scrollLeft -= posDiff > firstSlideWidth / 3 ? valDifference : -posDiff;
};

// Drag
const dragBegin = (e) => {
  isDragBegin = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = slider.scrollLeft;
};
const dragging = (e) => {
  if (!isDragBegin) return;
  e.preventDefault();
  isDragging = true;
  slider.classList.add("dragging");
  posDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  slider.scrollLeft = prevScrollLeft - posDiff;
  showHideArrows();
};
const dragEnd = () => {
  isDragBegin = false;
  slider.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  completeTheSlide();
};

// Event listeners
slider.addEventListener("mousedown", dragBegin);
slider.addEventListener("touchstart", dragBegin);
slider.addEventListener("mousemove", dragging);
slider.addEventListener("touchmove", dragging);
slider.addEventListener("mouseup", dragEnd);
slider.addEventListener("touchend", dragEnd);
document.addEventListener("keydown", keyboardNav);
