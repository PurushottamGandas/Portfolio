import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <a
          href="https://www.linkedin.com/in/purushottam-gandas-3a2713212/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedInIcon className="footer-icon" />
        </a>
        <a
          href="https://github.com/Purushottam02"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon className="footer-icon" />
        </a>
        <a
          href="https://instagram.com/purushottam02?igshid=YTQwZjQ0NmI0OA=="
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon className="footer-icon" />
        </a>
      </div>
      <p>
        &#169; {new Date(Date.now()).getFullYear()} Purushottam Gandas | Made with{" "}
        <FavoriteIcon className="heart-icon" /> in India
      </p>
    </div>
  );
}

export default Footer;
