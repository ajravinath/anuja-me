const ThemeToggle = () => {
  window.toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage errors (e.g. private mode)
    }
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.textContent = next === "dark" ? "☀" : "☾";
    });
  };

  const current =
    document.documentElement.getAttribute("data-theme") || "light";
  const icon = current === "dark" ? "☀" : "☾";

  return /*html*/ `<button class="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle theme" onclick="toggleTheme()">${icon}</button>`;
};

export default ThemeToggle;
