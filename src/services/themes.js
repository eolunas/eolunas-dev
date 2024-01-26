function getPreferTheme() {
  if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
    return localStorage.getItem("theme");
  }
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function toggleTheme() {
  const theme = getPreferTheme();
  document.documentElement.classList.toggle("dark");
  window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
}

export { getPreferTheme, toggleTheme };
