import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
// import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand className="text-light" href="">HelloWeather</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link text-light mx-2" href="/">Home</Link>
                        <Link className="nav-link text-light mx-2" href="/weather">Weather</Link>
                        <Link className="nav-link text-light mx-2" href="/about">About</Link>
                        <Link className="nav-link text-light mx-2" href="/contact">Contact</Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;