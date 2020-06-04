/** Shrink and keep the canvas ratio when the screen is to small to contain it */
window.linkReactiveCanvas = (canvas, width, height, padding) => {
  const goal = width + padding * 2;
  const ratio = goal / (height + padding * 2);

  function resize() {
    const windowWidth = window.innerWidth;
    if (windowWidth < goal) {
      canvas.width = windowWidth - padding * 2;
      canvas.height = (windowWidth - padding * 2) * ratio;
      canvas
        .getContext("2d")
        .scale(canvas.width / width, canvas.height / height);
    } else {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").scale(1, 1);
    }
  }

  window.addEventListener("resize", resize);
  resize();
};
