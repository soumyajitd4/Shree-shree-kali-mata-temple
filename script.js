const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast("Copied to clipboard");
    } catch {
      showToast(`Copy this: ${value}`);
    }
  });
});

// The native dialog supports Escape and returns focus to the selected photo.
const photoDialog = document.createElement("dialog");
photoDialog.className = "photo-dialog";
photoDialog.setAttribute("aria-label", "Construction photograph");
photoDialog.innerHTML = '<button class="photo-close" type="button">Close photo ×</button><img alt=""><p></p>';
document.body.append(photoDialog);
photoDialog.querySelector("button").addEventListener("click", () => photoDialog.close());
photoDialog.addEventListener("click", (event) => {
  if (event.target === photoDialog) photoDialog.close();
});
document.querySelectorAll(".gallery-item").forEach((figure) => {
  const photo = figure.querySelector("img");
  const button = document.createElement("button");
  button.className = "photo-open";
  button.type = "button";
  button.setAttribute("aria-label", `View full photo: ${photo.alt}`);
  photo.before(button);
  button.append(photo);
  button.addEventListener("click", () => {
    const enlarged = photoDialog.querySelector("img");
    enlarged.src = photo.src;
    enlarged.alt = photo.alt;
    photoDialog.querySelector("p").textContent = figure.querySelector("strong").textContent;
    photoDialog.showModal();
  });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    menuButton.focus();
  }
});
const header = document.querySelector(".site-header");
if ("ResizeObserver" in window) {
  new ResizeObserver(() => {
    document.querySelectorAll("section[id]").forEach(section => {
      section.style.scrollMarginTop = `${header.offsetHeight + 18}px`;
    });
  }).observe(header);
}
