const SectionAbout = () => {
  window.calcXp = () => {
    const startDate = new Date("2017-08-01");
    var timeDiffMs = Date.now() - startDate;
    var timeDate = new Date(timeDiffMs);
    return Math.abs(timeDate.getUTCFullYear() - 1970);
  };
  const template = /*html*/ `
    <section id="about">
      <p class="section__text__p1">Get to know more</p>
      <h1 class="title">About Me</h1>
      <div class="section-container">
        <div class="section__pic-container">
          <img src="./aranwalage.jpg" alt="profile picture" class="about-pic" />
        </div>
        <div class="about-details-container">
          <div class="about-containers">
            <div class="details-container">
              <div>
                <img src="./experience.png" alt="experience icon" class="icon" />
                <h3>Experience</h3>
                <p><b>${window.calcXp()}+ years</b><br> Software Engineering</p>
              </div>
            </div>
            <div class="details-container">
              <div>
                <img src="./education.png" alt="education icon" class="icon" />
                <h3>Education</h3>
                <p>BSc. Computer Science<br>General Sir John Kotelawala Defence University<br><b>Upper Second Class Honours (GPA 3.64)</b>
                </p>
              </div>
            </div>
          </div>
          <div class="text-container">
            <p>
            <div class="about-caption">B.Sc. in Computer Science | <span class="year">2014 - 2018</span></div>
            4th year graduate with second class upper division honors. Including core programs such as Computational Mathematics, Web Development, Data Structures and Algorithms, Machine Learning, Natural Language Processing, Data Mining, Image Processing etc.
            <hr/>
            <div class="about-caption">6+ years of experience in Software Engineering</div>
            <span>Software Engineer 2 | Glints Pte Ltd | <span class="year">2022 - Present</span></span><br>
            <span>Senior Software Engineer | Wiley Global Technologies | <span class="year">2021 - 2022</span></span><br>
            <span>Senior Software Engineer | Calcey Technologies | <span class="year">2021</span></span><br>
            <span>Software Engineer | Calcey Technologies | <span class="year">2018 - 2021</span></span><br>
            <span>Associate Software Engineer | Calcey Technologies | <span class="year">2017 - 2018</span></span><br>
            <span>Intern Software Engineer | Visni Pvt Ltd | <span class="year">2017</span></span><br>
            </p>
          </div>
        </div>
        <img src="./arrow.png" alt="arrow icon" class="icon arrow" onclick="location.href='./#experience'" />
      </div>
    </section>
    `;

  return template;
};

export default SectionAbout;
