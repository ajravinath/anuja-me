const SectionContact = () => {
  const template = /*html*/ `
    <section id="contact">
      <p class="section__text__p1">Get in Touch</p>
      <h2 class="title">Contact me</h1>
      <div class="contact-info-upper-container">
        <div class="contact-info-container">
          <img src="./email.png" alt="email icon" class="icon contact-icon email-icon" />
          <p>
            <a href="mailto:anuja.ranwalage@gmail.com">anuja.ranwalage@gmail.com</a>
          </p>
        </div>
        <div class="contact-info-container">
          <img src="./linkedin.png" alt="linkedin icon" class="icon contact-icon" />
          <p>
            <a href="https://www.linkedin.com/in/anuja-ranwalage/">LinkedIn</a>
          </p>
        </div>
      </div>
    </section>
    `;

  return template;
};

export default SectionContact;
