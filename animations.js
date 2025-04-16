// animations.js
anime({
  targets: '#comment-box textarea',
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeOutExpo'
});

gsap.from("#comments-container", {
  opacity: 0,
  y: 50,
  duration: 1.2,
  delay: 1
});
