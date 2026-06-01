import ThemeToggle from "./theme-toggle";

const Nav = () => {
  const template = /*html*/ `<nav id="desktop-nav">
  <div class="logo">${document.myName}</div>
  <div class="nav-right">
    <ul class="nav-links">
      <li>
      <a href="#about">About</a>
      </li>
      <li><a href="#experience">Experience</a>
      </li>
      <li><a href="#projects">Projects</a>
      </li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    ${ThemeToggle()}
  </div>
  </nav>`;

  return template;
};

export default Nav;
