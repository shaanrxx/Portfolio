(function () {
  var menu = document.getElementById("sbar-menu");
  var openBtn = document.getElementById("sbar-open");
  var closeBtn = document.getElementById("sbar-close");
  if (!menu) return;
  if (openBtn) openBtn.addEventListener("click", function () { menu.classList.add("open"); });
  if (closeBtn) closeBtn.addEventListener("click", function () { menu.classList.remove("open"); });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") menu.classList.remove("open"); });
})();
