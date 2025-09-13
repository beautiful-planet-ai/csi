import "primeicons/primeicons.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./Footer.css";

const FooterColumn = ({ title, children }) => (
  <div className="flex align-items-start justify-content-start flex-column gap-3">
    {title && (
      <p className="border-bottom-1 border-orange-600 text-xl p-0 m-0 font-medium">
        {title}
      </p>
    )}
    {children}
  </div>
);

const FooterLink = ({ to, label, external = false }) => {
  const Wrapper = external ? "a" : Link;
  const props = external
    ? { href: to, target: "_blank", rel: "noopener noreferrer" }
    : { to };

  return (
    <div className="flex align-items-center justify-content-start gap-1">
      <i className="pi pi-angle-right text-orange-600"></i>
      <Wrapper
        {...props}
        className="p-0 m-0 text-left font-light text-white hover:text-orange-500 no-underline transition-colors transition-duration-300"
      >
        {label}
      </Wrapper>
    </div>
  );
};

const Footer = () => {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/citizen", label: "CSI for Citizen" },
    { to: "/government", label: "CSI for Government" },
  ];

  return (
    <footer className="footer">
      {/* Column 1: Logo and Social Media */}
      <FooterColumn>
        <img src={logo} alt="Beautiful Planet.AI" className="h-2rem" />
        <p className="w-15rem">
          Follow us on social media for the latest updates
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/beautifulplanet.ai/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-instagram text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/company/beautiful-planet-ai/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="pi pi-linkedin text-2xl text-white hover:text-orange-500 transition-colors transition-duration-300" />
          </a>
        </div>
      </FooterColumn>

      {/* Column 2: Quick Links */}
      <FooterColumn title="Quick Links">
        {quickLinks.map((link, idx) => (
          <FooterLink key={idx} {...link} />
        ))}
      </FooterColumn>

      {/* Column 3: Recent News */}
      <FooterColumn title="Recent News">
        <FooterLink to="#" label="Coming Soon.." external />
      </FooterColumn>

      {/* Column 4: Contact Us */}
      <FooterColumn title="Contact Us"></FooterColumn>
    </footer>
  );
};

export default Footer;
