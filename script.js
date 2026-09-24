const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const toast = document.querySelector(".toast");
let toastTimer;

function setMenuOpen(open) {
  menuButton?.setAttribute("aria-expanded", String(open));
  const label = menuButton?.querySelector(".sr-only");
  if (label) label.textContent = open ? "Close menu" : "Open menu";
  navLinks?.classList.toggle("is-open", open);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.setAttribute("aria-label", `Copy ${button.closest(".payment-field").querySelector("span").textContent}`);
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
    setMenuOpen(false);
    menuButton.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".nav")) setMenuOpen(false);
});
document.addEventListener("focusin", event => {
  if (!event.target.closest(".nav")) setMenuOpen(false);
});
window.matchMedia("(max-width: 820px)").addEventListener("change", () => setMenuOpen(false));
const header = document.querySelector(".site-header");
if ("ResizeObserver" in window) {
  new ResizeObserver(() => {
    document.querySelectorAll("section[id], #trust-contacts, #registration, #main, #footer").forEach(section => {
      section.style.scrollMarginTop = `${header.offsetHeight + 18}px`;
    });
  }).observe(header);
}

// The fixed shortcut is unnecessary while payment details or the footer are visible.
const mobileDonate = document.querySelector(".mobile-donate");
if (mobileDonate && "IntersectionObserver" in window) {
  const visibleTargets = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleTargets.add(entry.target);
      else visibleTargets.delete(entry.target);
    });
    mobileDonate.hidden = visibleTargets.size > 0;
  });
  document.querySelectorAll("#donate, #footer").forEach(target => observer.observe(target));
}
