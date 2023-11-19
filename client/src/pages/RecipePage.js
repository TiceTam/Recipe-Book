import './RecipePage.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dish4 from '../images/dish4.png'

function RecipePage(){
    return(
        <div>
            <Navbar expand="lg" className="navbar">
                <Container >
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
            <div className='topText'>
                <h2 className='bigText'>Huge selection</h2>
                <h2 className='bigText'>of delicious recipes</h2>
                <p className='smallText'>Explore our selection of amazing recipes ranging from: easy desserts</p>
                <p className='smallText'>delicious vegan and vegetartian options, quick bakes, family-friendly meals,</p>
                <p className='smallText'>and gluten-free recipes</p>
            </div>
            <div>
                <img src={dish4} alt="dish4" className='dish4'></img>
            </div>
            <div className='lrTextWrap'>
                <h2 className='lrText'>Latest Recipes</h2>
            </div>
        </div>
    );
}

export default RecipePage;