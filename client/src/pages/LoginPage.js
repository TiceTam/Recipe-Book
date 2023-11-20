import './LoginPage.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cooking from '../images/cooking.json';
import Lottie from "lottie-react";

function LoginPage(){
    return(
        <div className="loginDiv">
            <Navbar expand="lg" className="navbar">
                <Container>
                <Navbar.Brand className='navBrand'>
                    UnderCooked
                    </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    <Nav.Link as={Link} to="/" className='home'>HOME</Nav.Link>
                    <Nav.Link as={Link} to="/recipe" className='recipes'>RECIPES</Nav.Link>
                    {/*<Nav.Link as={Link} to="/login">LOGIN</Nav.Link>*/}
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className="loginForm">
                <form className="form">
                    <h1>LOGIN</h1>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                    />
                    <br/>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                    />
                    
                    <br/><br/>
                    <input type="submit" value="login"/>
                    <br/><br/>

                    <div className="signup">
                        <text>Not registered? </text><a href="/signup">Sign Up</a>
                    </div>
                </form>
            </div>

            <div className="loginAnimation">
                <h1>
                <Lottie animationData = {cooking}/>
                </h1>
            </div>
        </div>
    );
}

export default LoginPage;