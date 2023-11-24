import './RecipePage.css';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {Link} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import dish4 from '../images/dish4.png'
import Card from 'react-bootstrap/Card';
import displayDish1 from '../images/displayDish1.jpeg'
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'react';

function RecipePage(){

    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [openModal, setOpenModal] = useState();
    const [search, setSearch] = useState("");

    const getRecipes = async () => {

        const URL = "https://www.cop4331groupfifteen.xyz/api/loadrecipes";

        try{
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                	'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            //console.log(data);
            setRecipes(data.recipes);
        } catch(error){
            console.log(error);
        }
    }

    const getIngredients = (ingredientList) => {
        setIngredients(ingredientList);
    }

    const getInstructions = (instructionList) => {
        setInstructions(instructionList);
    }
    

    useEffect(() => {
        getRecipes();
    }, []);

    const onLike = async (e, id) =>{
        e.stopPropagation();

        var userID = localStorage.getItem("usernameID");
        console.log(userID);
        var recipeID = id;

        const URL = "https://www.cop4331groupfifteen.xyz/api/addrecipelikes";
        const body = JSON.stringify({userID: userID, recipeID: recipeID});

        try{
            await fetch(URL, {
                method: "POST",
                body: body,
                headers: {
                	'Content-Type': 'application/json'
                },
            }).then(
                async(response) => {
                    var warn = document.getElementById("errorMessage");

                    if(response.status === 404){
                        const json = await response.json();
                        console.log(json);
                        warn.style.color = "#FF0000";
                        warn.innerHTML = "Like already exists :(";
                        console.log("like already exists.");
                    }
                    else if(response.status === 200){
                        const json = await response.json();
                        console.log(json);
                        warn.innerHTML = "You liked another amazing recipe :)";
                        console.log("Successfully added to likes");
                    }
                }
            )
        } catch (error){
            console.log(error);
        };
    }

    const handleInput = (event) => {
        setSearch(event.target.value);
    }

    const onSearch = async() => {

        const URL = "https://www.cop4331groupfifteen.xyz/api/searchrecipes";
        const body = JSON.stringify({recipeName: search});

        try{
            await fetch(URL, {
                method: "POST",
                body: body,
                headers: {
                	'Content-Type': 'application/json'
                },
            }).then(
                async(response) => {
                    var warn = document.getElementById("errorMessage");

                    if(response.status === 404){
                        const json = await response.json();
                        console.log(json);
                        warn.style.color = "#FF0000";
                        warn.innerHTML = "Recipes not found :(";
                        console.log("Recipes not found");
                    }
                    else if(response.status === 200){
                        const json = await response.json();
                        console.log(json.recipes);
                        setRecipes(json.recipes);
                        console.log("recipes found");
                    }
                }
            )
        } catch (error){
            console.log(error);
        };
    }

    const onLogout = async() => {
        localStorage.removeItem("usernameID");
        window.location.href = "http://localhost:3000"
    }

    
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
                    <Nav.Link as={Link} to="/recipe" className='recipes'>RECIPES</Nav.Link>
                    <Nav.Link as={Link} to="/user" className='likes'>LIKES</Nav.Link>
                    <Nav.Link className='logout' onClick={() => {onLogout()}}>LOGOUT</Nav.Link>
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
                <div id="textSearch">
                    <div className='lrText'>Latest Recipes
                        <Container className='mt-2'>
                            <Row>
                                <Col sm={4}>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2 rounded-pill"
                                            aria-label="Search"
                                            id="mySearch"
                                            value = {search}
                                            onChange = {handleInput}
                                        />
                                        <Button className='rounded-pill' variant='warning' onClick={() => {onSearch()}}>Search</Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                        <p id="errorMessage"></p>
                    </div>
                </div>
                
            </div>

            <Container className='lrCon'>
                <Row xs={2} md={4} lg={4} className="g-4">
                    {recipes.map((recipe) => (
                        <Col className='lrCol'>
                        <Card className='flex-fill'>
                            <Card.Img variant="top" src={recipe.image} alt={recipe.recipeName}/>
                            <Card.Body>
                                <Card.Title>{recipe.recipeName}</Card.Title>
                                <Button variant="warning" className="vrButton" onClick={() => {setOpenModal(recipe._id); getIngredients(recipe.ingredients); getInstructions(recipe.instructions);}}>View Recipe</Button>
                                <Button variant="success" onClick={(event) => onLike(event, recipe._id)}>
                                    Like <i className="fas fa-thumbs-up"></i>
                                </Button>        
                                    <Modal
                                        show={openModal === recipe._id}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered>

                                        <Modal.Header>
                                            <Modal.Title id="contained-modal-title-vcenter">INGREDIENTS AND INSTRUCTIONS</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <p className="ingredient">Ingredients:</p>
                                            {ingredients.map((ingredient) => (
                                                <p>-{ingredient.ingredient}</p>
                                            ))}

                                            <p className="instruction">Instructions:</p>
                                            {instructions.map((instruction) => (
                                                <p>-{instruction.instruction}</p>
                                            ))}
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button onClick={() => setOpenModal(false)}>Close</Button>
                                        </Modal.Footer>
                                    </Modal>
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