import { NextPage } from "next";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import "./footer.scss";

interface Props {}

const Footer: NextPage<Props> = ({}) => {
  return (
    <div className="footer-parent">
      <div className="footer-container">
        <div>
          <h3 className="footer-title">TechFrom10</h3>
          <p>All the Tech Talk You Need, Right Here</p>
        </div>
        <div className="footer-links">
          <h3>Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Newsletter</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h3>Newsletter</h3>
          <form action="">
            <input type="text" placeholder="Email ID" />
            <button>subscribe</button>
          </form>
        </div>
        <div className="footer-icons-parent">
          <h3>Follow Us</h3>
          <div className="footer-icons-container">
            <Link href="" target="_blank">
              <FaFacebook className="footer-icon" />
            </Link>
            <Link href="" target="_blank">
              <AiFillInstagram className="footer-icon" />
            </Link>
            <Link href="" target="_blank">
              <FaXTwitter className="footer-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;