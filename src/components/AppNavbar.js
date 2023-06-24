import React from 'react';
import { 
    Container,
    Header,
    Content,
    Nav,
    Navbar
} from "react-bootstrap";

import "rsuite/dist/rsuite.min.css";

function AppNavbar() {
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Dynamic Calendar</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Page</Nav.Link>
                        <Nav.Link href="/">Page2</Nav.Link>
                        <Nav.Link href="/">Page3</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;