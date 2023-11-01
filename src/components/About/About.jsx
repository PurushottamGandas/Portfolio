import React from "react";
import "./About.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function About() {
  return (
    <div id="fh5co-about" className="animate-box about-section">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 text-center fh5co-heading">
            <h2 className="about-section-title">About Me</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ul className="info">
              <li>
                <span className="first-block">Full Name:</span>
                <span className="second-block">
                  Purushottam Prabhakar Gandas
                </span>
              </li>
              <li>
                <span className="first-block">Phone:</span>
                <span className="second-block">+91 7820841593</span>
              </li>
              <li>
                <span className="first-block">Email:</span>
                <span className="second-block">
                  purushottamgandas2002@gmail.com
                </span>
              </li>
              <li>
                <span className="first-block">Website:</span>
                <span className="second-block">
                  purushottamgandas.github.io
                </span>
              </li>
              <li>
                <span className="first-block">Address:</span>
                <span className="second-block">
                  Shri krishna Chaya Niwas,Ganganagar,Phursungi Pune - 412308,
                  Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
          <div className="col-md-8">
            <h2>Hello There!</h2>
            <p>
              Welcome to My Data Science and Web Development Portfolio! I'm
              Purushottam Gandas, a dedicated data scientist and web developer
              with a strong passion for uncovering insights in data and crafting
              engaging web experiences. I believe in the power of combining data
              science and web development to create impactful solutions.
            </p>
            <p>
              In the realm of data science, I've honed my skills in data
              analysis, machine learning, and data visualization, seeking to
              solve real-world problems and tell compelling data-driven stories.
              Simultaneously, I've explored the art of web development, crafting
              user-friendly websites and web applications.
            </p>
            <p>
              Explore my portfolio to discover a diverse collection of data
              science projects, web development projects, and the insights I've
              gained from them. From predictive modeling to web design, I'm
              dedicated to creating solutions that not only function effectively
              but also engage and inform users.
            </p>
            <p>
              Let's embark on this data-driven and user-friendly journey
              together!
            </p>
            <p>
              <ul className="fh5co-social-icons">
                <li className="social-media-icon">
                  <a
                    href="https://www.linkedin.com/in/purushottam-gandas-3a2713212/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
                <li className="social-media-icon">
                  <a
                    href="https://github.com/Purushottam02"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitHubIcon />
                  </a>
                </li>
                <li className="social-media-icon">
                  <a
                    href="https://instagram.com/purushottam02?igshid=YTQwZjQ0NmI0OA=="
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon />
                  </a>
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <div className="section-divider"></div>
    </div>
  );
}

export default About;
