import './SignupPage.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cooking from '../images/food-vlogger.json';
import Lottie from "lottie-react";

function SignupPage(){
    return(
        <div className="signupDiv">
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

            <div className="signupAnimation">
                <h1>
                <Lottie animationData = {cooking}/>
                </h1>
            </div>

            <div className="signupForm">
                <form className="form">
                    <h1>SIGN UP</h1>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="first name"
                        />
                        <br/>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="last name"
                        />
                        <br/>
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
                        <input type="submit" value="sign up"/>
                        <br/><br/>
                        <div className="login">
                            <text>Already Registered? </text><a href='/login'>Login</a>
                        </div>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;