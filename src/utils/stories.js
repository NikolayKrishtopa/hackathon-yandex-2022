window.addEventListener("DOMContentLoaded", function () {
  let video = this.document.querySelector(".video");

  video.addEventListener("click", function () {
    if (video.classList.contains("ready")) {
      return;
    }
    video.classList.add("ready");
    video.insertAdjacentHTML(
      "afterbegin",
      `<iframe src="https://www.youtube.com/embed/COaXBeiKezw?start=51?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    );
  });
});
