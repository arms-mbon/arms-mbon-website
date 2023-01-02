//this will be the navbar component that will be used in the app 
//it will be used in the layout component
import React from 'react';
import { Form, FormControl} from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
//use bootstrap for styling
export default function NavBar(props) {
    console.log(props);
    const searchterm = props.searchTerm;
    const setSearchTerm = props.setSearchTerm;
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="./">ARMS-MBON</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="./">Home</Nav.Link>
                        <Nav.Link href="#About">About</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#info/AllOverview">Overview</NavDropdown.Item>
                            <NavDropdown.Item href="#info/AllAccociatedData">Accociated Data</NavDropdown.Item>
                            <NavDropdown.Item href="#info/AllMaterialSamples">Material Samples</NavDropdown.Item>
                            <NavDropdown.Item href="#info/AllObservations">Observations</NavDropdown.Item>
                            <NavDropdown.Item href="#info/AllSequences">Sequences</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="https://github.com/arms-mbon/Data/tree/main/QualityControlledData/FromPlutoF">to github of arms-mbon</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searchterm} onChange={(e) => setSearchTerm(e.target.value)} />
                </Form>
            </Navbar>
        </>
    )
}