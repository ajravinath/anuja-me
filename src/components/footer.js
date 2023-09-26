const Footer = () => {
  const template = /*html*/ `
     <footer>
     <nav>
     <div class="nav-links-container">
        <ul class="nav-links">
            <li>
                <a href="#about">About</a>
            </li>
            <li>
                <a href="#experience">Experience</a>
            </li>
            <li>
                <a href="#projects">Projects</a>
            </li>
            <li>
                <a href="#contact">Contact</a>
            </li>
        </ul>
     </div>
     </nav>
     <p>© 2023 ${document.myName}</p>
     </footer>
    `;

  return template;
};

export default Footer;
