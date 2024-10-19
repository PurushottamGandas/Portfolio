import React from "react";
import "./Projects.css";

function Projects() {
  return (
    <div id="fh5co-work" className="fh5co-bg-dark projects-section">
      <div className="container">
        <div className="row animate-box">
          <div className="col-md-offset-2 text-center fh5co-heading">
            <h2>Projects</h2>
          </div>
        </div>
        <div className="row project-cards">
          <div className="col-md-3 text-center col-padding animate-box">
            <a
              href="https://github.com/PurushottamGandas/managementCRUD"
              target="_blank"
              rel="noreferrer"
              className="work project-1"
            >
              <div className="desc">
                <h3>Student Management</h3>
                <span>
                  <a
                    href="https://github.com/PurushottamGandas/managementCRUD"
                    target="_blank"
                    rel="noreferrer"
                  >
                    MERN Project
                  </a>
                </span>
              </div>
            </a>
          </div>
          <div className="col-md-3 text-center col-padding animate-box">
            <a
              href="https://github.com/PurushottamGandas/product-table"
              target="_blank"
              rel="noreferrer"
              className="work project-2"
            >
              <div className="desc">
                <h3>Clothing Store</h3>
                <span>
                  <a
                    href="https://github.com/PurushottamGandas/product-table"
                    target="_blank"
                    rel="noreferrer"
                  >
                    React Project
                  </a>
                </span>
              </div>
            </a>
          </div>
          <div className="col-md-3 text-center col-padding animate-box">
            <a
              href="https://github.com/PurushottamGandas/Python-Data-Associate"
              className="work project-3"
              target="_blank"
              rel="noreferrer"
            >
              <div className="desc">
                <h3>Movie Heist</h3>
                <span>
                  <a
                    href="https://github.com/PurushottamGandas/Python-Data-Associate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Python Project
                  </a>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
