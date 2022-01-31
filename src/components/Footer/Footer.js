import "./Footer.scss";
import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="SocialContainer">
        <h3>Bizi Takip Edin</h3>
        <div className="SocialIconContainer">
          <Link to="instagram.com">
            <FiInstagram className="SocialIcon" />
          </Link>
          <Link to="facebook.com">
            <FiFacebook className="SocialIcon" />
          </Link>
          <Link to="twitter.com">
            <FiTwitter className="SocialIcon" />
          </Link>
        </div>
        <span className="Copyright">Bi'Özet@2021</span>
      </div>
    </footer>
  );
}
