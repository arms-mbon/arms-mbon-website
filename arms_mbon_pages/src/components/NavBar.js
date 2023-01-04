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
    //https://github.com/arms-mbon/Data or ./Data
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="./">ARMS-MBON</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="./">Home</Nav.Link>
                        <Nav.Link href="https://github.com/arms-mbon/Data" target="_blank">Data</Nav.Link> 
                        <Nav.Link href="https://github.com/arms-mbon/Documentation" target="_blank">Documentation</Nav.Link> 
                        <Nav.Link href="https://github.com/arms-mbon/Templates" target="_blank">Templates</Nav.Link> 
                        <NavDropdown title="Data Overview" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#info/ObservatoryData">Observatory Data</NavDropdown.Item>
                            <NavDropdown.Item href="#info/SamplingEventData">Sampling Event Data</NavDropdown.Item>
                            <NavDropdown.Item href="#info/OmicsData">Omics Data</NavDropdown.Item>
                            <NavDropdown.Item href="#info/ImageData">Image Data</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                <Form>
                    <FormControl type="text" placeholder="Search" className="formnavbar" value={searchterm} onChange={(e) => setSearchTerm(e.target.value)} />
                </Form>
            </Navbar>
        </>
    )
}