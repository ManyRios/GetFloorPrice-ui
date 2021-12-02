import { Navbar } from "react-bootstrap";

//this component only loads the logos of the involved companies
const NavbarMenu = () => {
  return (
    <nav>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant=""
        bg="transparent"
        className=""
      >
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/opensealogo.png"
            width="260"
            height="62"
            className="d-inline-block align-center img-responsive"
          />{" "}
          <img
            alt=""
            src="/iexec.png"
            width="300"
            height="150"
            className="d-inline-block align-center img-responsive"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-dark"
        />
        <Navbar.Collapse id="responsive-navbar-nav "></Navbar.Collapse>
      </Navbar>
    </nav>
  );
};

export default NavbarMenu;
