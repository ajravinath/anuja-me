const SectionProfile = () => {
  const template = /*html*/ `
    <section id="profile">
        <div class="section__pic-container">
            <img src="./aranwalage.jpg" alt="section-icon" class="profile-pic" />
        </div>
        <div class="section__text">
          <div class="section__text__p1"></div>
          <h1 class="title">${document.myName}</h1>
          <p class="section__text__p2">Software Engineer</p>
          <div class="btn-container">
            <button 
              class="btn btn-color-2" 
              onclick="window.open('https://app.enhancv.com/share/f911dd6c/?utm_medium=growth&utm_campaign=share-resume&utm_source=dynamic', '_blank')">
              View CV
            </button>
            <button 
              class="btn btn-color-1" 
              onclick="location.href='./#contact'">
              Contact Info
            </button>
          </div>
          <div id="socials-container">
            <img src="./linkedin.png" alt="linkedIn" class="icon" onclick="window.open('https://www.linkedin.com/in/anuja-ranwalage/', '_blank')" />
            <img src="./github.png" alt="github" class="icon" onclick="window.open('https://github.com/ajravinath', '_blank')" />
          </div>
        </div>
    </section>
    `;

  return template;
};

export default SectionProfile;
