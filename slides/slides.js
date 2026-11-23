"use strict";

const slides = [...document.querySelectorAll(".slide")];
const chapterLinks = [...document.querySelectorAll(".sidebar li a")];
const chapterNav = document.querySelector(".sidebar");
const stage = document.querySelector(".stage");
const controls = document.querySelector("#controls");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const pageCount = document.querySelector("#page-count");
const progress = document.querySelector("#progress");
const fullscreen = document.querySelector("#fullscreen");
const copyStatus = document.querySelector("#copy-status");
let current = -1;

function showSlide(index, focusTitle = false) {
  if (index === current || index < 0 || index >= slides.length) return;

  current = index;
  const activeSlide = slides[index];
  slides.forEach((slide, position) => {
    slide.hidden = position !== index;
  });

  chapterLinks.forEach((link) => {
    if (link.hash === "#" + activeSlide.dataset.chapter) {
      link.setAttribute("aria-current", "location");
      const linkEdges = link.getBoundingClientRect();
      const navEdges = chapterNav.getBoundingClientRect();
      if (linkEdges.left < navEdges.left || linkEdges.right > navEdges.right) {
        chapterNav.scrollLeft += linkEdges.left - navEdges.left - 4;
      }
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const activeControl = document.activeElement;
  previous.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  pageCount.textContent = String(index + 1).padStart(2, "0") + " / " + slides.length;
  progress.value = index + 1;

  if (focusTitle) {
    const title = document.getElementById(activeSlide.getAttribute("aria-labelledby"));
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
  } else if (activeControl === previous && previous.disabled) {
    next.focus({ preventScroll: true });
  } else if (activeControl === next && next.disabled) {
    previous.focus({ preventScroll: true });
  }

  if (stage.getBoundingClientRect().top < 0) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}

function syncFromLocation() {
  const index = slides.findIndex((slide) => "#" + slide.id === location.hash);
  showSlide(index === -1 ? 0 : index);
}

function goTo(index, focusTitle = false) {
  if (index === current || index < 0 || index >= slides.length) return;
  history.pushState(null, "", "#" + slides[index].id);
  showSlide(index, focusTitle);
}

previous.addEventListener("click", () => goTo(current - 1));
next.addEventListener("click", () => goTo(current + 1));
window.addEventListener("hashchange", syncFromLocation);
window.addEventListener("popstate", syncFromLocation);

[...chapterLinks, ...document.querySelectorAll("[data-slide-link]")].forEach((link) => {
  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const index = slides.findIndex((slide) => "#" + slide.id === link.hash);
    event.preventDefault();
    goTo(index, true);
  });
});

document.querySelectorAll("[data-commit-diagram]").forEach((diagram) => {
  const toolbar = diagram.querySelector(".diagram-toolbar");
  const buttons = [...toolbar.querySelectorAll("[data-diagram-step]")];
  const panels = [...diagram.querySelectorAll("[data-diagram-panel]")];

  function selectStep(step) {
    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.diagramStep === step));
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.diagramPanel !== step;
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => selectStep(button.dataset.diagramStep));
  });
  selectStep(buttons[0].dataset.diagramStep);
  toolbar.hidden = false;
});

const pageOffsets = { ArrowLeft: -1, ArrowRight: 1, PageUp: -1, PageDown: 1 };
document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target.closest?.("textarea, input, select, [contenteditable]")) return;

  const offset = pageOffsets[event.key];
  if (typeof offset === "number") {
    event.preventDefault();
    goTo(current + offset);
  }
});

if (document.fullscreenEnabled) {
  fullscreen.hidden = false;
  const label = fullscreen.lastElementChild;
  fullscreen.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      copyStatus.textContent = "瀏覽器無法切換全螢幕。";
    }
  });
  document.addEventListener("fullscreenchange", () => {
    label.textContent = document.fullscreenElement ? "離開全螢幕" : "全螢幕";
  });
}

function selectCode(code) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(code);
  selection.removeAllRanges();
  selection.addRange(range);
}

function copyWithSelection(code) {
  const selection = window.getSelection();
  const previousRange = selection.rangeCount ? selection.getRangeAt(0).cloneRange() : null;
  selectCode(code);
  if (!document.execCommand("copy")) return false;
  selection.removeAllRanges();
  if (previousRange) selection.addRange(previousRange);
  return true;
}

async function copyCode(code) {
  try {
    await navigator.clipboard.writeText(code.textContent);
    return true;
  } catch {
    try {
      return copyWithSelection(code);
    } catch {
      selectCode(code);
      return false;
    }
  }
}

document.querySelectorAll(".terminal:not(.example)").forEach((terminal) => {
  const blocks = [...terminal.querySelectorAll("pre code")];
  const group = document.createElement("span");
  group.className = "copy-actions";

  blocks.forEach((code, index) => {
    const button = document.createElement("button");
    const label = blocks.length === 1 ? "複製指令" : ["複製下載指令", "複製分支指令"][index];
    let reset;
    button.type = "button";
    button.className = "copy-button";
    button.textContent = label;
    button.addEventListener("click", async () => {
      clearTimeout(reset);
      const copied = await copyCode(code);
      button.textContent = copied ? "已複製" : "已選取";
      copyStatus.textContent = copied ? "已複製 PowerShell 指令。" : "已選取指令，請按 Ctrl+C 複製。";
      reset = setTimeout(() => { button.textContent = label; }, 2200);
    });
    group.append(button);
  });
  terminal.querySelector(".terminal-bar").append(group);
});

document.documentElement.classList.add("with-js");
controls.hidden = false;
progress.max = slides.length;
syncFromLocation();
