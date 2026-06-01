const ThemeToggle = () => {
  const getImage = (theme) =>
    theme === "dark"
      ? `<img
        src="./icons/light_mode_48dp.png"
        alt="light mode icon"
        class="icon small"
      />`
      : `<img
        src="./icons/dark_mode_48dp.png"
        alt="dark mode icon"
        class="icon small"
      />`;

  window.toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    new CustomEvent("theme-toggle", { detail: { theme: next } });
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage errors (e.g. private mode)
    }
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.innerHTML = getImage(next);
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    });
  };

  const current =
    document.documentElement.getAttribute("data-theme") || "light";
  const icon = getImage(current);

  return /*html*/ `<button class="theme-toggle" type="button" aria-label="Toggle colour theme" aria-pressed="${current === "dark" ? "true" : "false"}" title="Toggle theme" onclick="toggleTheme()">${icon}</button>`;
};

export default ThemeToggle;
