// images/icons.
import LwsLogo from "../assets/lws-logo-en.svg";

const Header = () => {
  return (
    <nav className="py-6 md:py-8 fixed top-0 w-full !bg-[#191D26] z-50">
      <div className="container flex items-center justify-between mx-auto gap-x-6">
        <a href="/">
          <img className="h-[45px]" src={LwsLogo} alt="Lws Logo" />
        </a>
      </div>
    </nav>
  );
};

export default Header;
