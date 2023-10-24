const Nav = () => {
  const template = /*html*/ `<nav id="desktop-nav">
  <div class="logo">${document.myName}</div>
  <div>
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
  </div>
  </nav>`;

  return template;
};

export default Nav;
