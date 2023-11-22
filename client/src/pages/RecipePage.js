import './RecipePage.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dish4 from '../images/dish4.png'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import displayDish1 from '../images/displayDish1.jpeg'

function RecipePage(){

    const latestRecipes = [
        { title: 'Cheese Pizza', content: 'This is the content of Recipe 1.', imageSrc: '../images/displayDish1.jpeg'},
        { title: 'Alfredo Pasta', content: 'This is the content of Recipe 2.', imageSrc: '../images/displayDish1.jpeg'},
        { title: 'Chocolate Cake', content: 'This is the content of Recipe 3.', imageSrc: '../images/displayDish1.jpeg'},
        { title: 'Poke Bowl', content: 'This is the content of Recipe 4.', imageSrc: '../images/displayDish1.jpeg'},
        { title: 'Fried Chicken', content: 'This is the content of Recipe 5.', imageSrc: '../images/displayDish1.jpeg'},
      ];
    
    return(
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
                    {/*<Nav.Link as={Link} to="/login">LOGIN</Nav.Link>*/}
                </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='topText'>
                <h2 className='bigText'>Huge selection</h2>
                <h2 className='bigText'>of delicious recipes</h2>
                <div className='textPad'>
                    <p className='smallText'>Explore our selection of amazing recipes ranging from: easy desserts</p>
                    <p className='smallText'>delicious vegan and vegetartian options, quick bakes, family-friendly meals,</p>
                    <p className='smallText'>and gluten-free recipes</p>
                </div>
            </div>
            {/*
            <div>
                <img src={dish4} alt="dish4" className='dish4'></img>
            </div> 
            */}
            
            <div className='lrTextWrap'>
                <h2 className='lrText'>Latest Recipes</h2>
            </div>
            
            <Container>
                <Row xs={2} md={3} lg={5} className="g-4">
                {latestRecipes.map((recipe, index) => (
                    <Col key={index} className='d-flex'>
                    <Card className='flex-fill'>
                        <Card.Img variant="top" src={displayDish1}/>
                        <Card.Body>
                            <Card.Title>{recipe.title}</Card.Title>
                            <Card.Text>{recipe.content}</Card.Text>
                            <Button variant="dark">View Recipe</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
            </Container>
        </div>
    );
}

export default RecipePage;