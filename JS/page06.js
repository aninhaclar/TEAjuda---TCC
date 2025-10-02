const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentIndex = index;

  slides.forEach((slide, i) => {
    slide.style.display = (i === index) ? 'block' : 'none';
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.index));
  });
});

showSlide(0); // mostrar o primeiro slide inicialmente