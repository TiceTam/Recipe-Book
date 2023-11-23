import './UserPage.css';
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Col, Container, Form, Row } from "react-bootstrap";

function UserPage(){
    return (
        <div>
            <Navbar expand="lg" className="navbar" sticky='top'>
                <Container >
                <Navbar.Brand className='navBrand'>
                    UnderCooked
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/" className='home'>HOME</Nav.Link>
                    <Nav.Link as={Link} to="/recipe" className='recipes'>RECIPES</Nav.Link>
                    <Nav.Link as={Link} to="/user" className='likes'>LIKES</Nav.Link>
                    {/*<Nav.Link as={Link} to="/login">LOGIN</Nav.Link>*/}
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='topText'>
                <h2 className='bigText'>Your selection of liked recipes</h2>
            </div>

            <div className='lrTextWrap'>
                <div id="textSearch">
                    <p className='lrText'>Liked Recipes
                        <Container className='mt-2'>
                            <Row>
                                <Col sm={4}>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2 rounded-pill"
                                            aria-label="Search"
                                        />
                                        <Button className='rounded-pill' variant='warning'>Search</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    </p>
                </div>
                
            </div>
        </div>
    );
}

export default UserPage;
