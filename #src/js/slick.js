let swiper = new Swiper(".mySwiper", {
  spaceBetween: 20,
  slidesPerView: 4,
  navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
  },
});
let swiper2 = new Swiper(".mySwiper2", {
  thumbs: {
      swiper: swiper,
  },
  navigation: {
      nextEl: ".swiper-next_main",
      prevEl: ".swiper-prev_main",
  },
});