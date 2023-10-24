const SectionExperience = () => {
  const template = /*html*/ `
    <section id="experience">
      <p class="section__text__p1">Explore My</p>
      <h2 class="title">Experience</h1>
      <div class="experience-details-container">
        <div class="about-containers xp">
          <div class="details-container">
            <h2 class="experience-sub-title">Languages</h2>
            <div class="article-container skills-container">
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>JavaScript</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>TypeScript</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>NodeJS</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Python</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>TypeScript</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>CSS 3</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>HTML 5</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Dart</p>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>Java</p>
                <p>Intermediate</p>
              </div>
            </article>
              <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>ReasonML</p>
                <p>Experienced</p>
              </div>
            </article>
            </div>
          </div>
          <div class="details-container">
            <h2 class="experience-sub-title">Frameworks, Libraries and Technologies</h2>
            <div class="article-container skills-container">
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>React.js</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Next.js</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Django</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Flask</p>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Redux</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Express</p>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Apollo</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Jest</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Kubernetes</p>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>Docker</p>
                  <p>Intermediate</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>GraphQL</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>REST</p>
                  <p>Experienced</p>
                </div>
              </article>
              <article>
                <img src="./checkmark.png" alt="experience icon" class="icon" />
                <div>
                  <p>CI/CD</p>
                  <p>Experienced</p>
                </div>
              </article>
            </div>
          </div>
          <div class="details-container">
          <h2 class="experience-sub-title">Databases</h2>
          <div class="article-container skills-container">
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>Postgres</p>
                <p>Experienced</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>MongoDB</p>
                <p>Experienced</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>SQLite</p>
                <p>Experienced</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>Snowflake</p>
                <p>Intermediate</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>SQL Server</p>
                <p>Intermediate</p>
              </div>
            </article>
            <article>
              <img src="./checkmark.png" alt="experience icon" class="icon" />
              <div>
                <p>MySQL</p>
                <p>Intermediate</p>
              </div>
            </article>
          </div>
        </div>
          <img src="./arrow.png" alt="arrow icon" class="icon arrow" onclick="location.href='./#projects'" />
        </div>
      </div>
    </section>
    `;

  return template;
};

export default SectionExperience;
