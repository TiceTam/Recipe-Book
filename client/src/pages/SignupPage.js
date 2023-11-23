import './SignupPage.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cooking from '../images/food-vlogger.json';
import Lottie from "lottie-react";
import React, {Component} from "react";

export default class SignupPage extends Component{

	constructor(props) {
        super(props);
        this.state = {
			username: "",
            email: "",
            password: "",
          };
    }
	
	onSubmit = async(event) => {
		const URL = "http://localhost:3001/api/signup";

		event.preventDefault();

		try{
			await fetch(URL, {
                method: 'POST',
                headers: {
                	'Content-Type': 'application/json'
                },
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
					email: this.state.email,
				}),
            }).then((response) => {

				var warn = document.getElementById("errorMessage");
				if(response.status === 200){
					warn.style.color = "#F08B1F";
					warn.innerHTML = "User successfully created :)"
					console.log("user created");
				}
				else if(response.status === 404){
					warn.style.color = "#FF0000";
					warn.innerHTML = "User already exists :(";
					console.log("user already exists");
				}
			})
		} catch(error){
			console.log(error);
		};
	}

	handler = (event) => {
		const{value, name} = event.target;
		this.setState({
			[name]: value
		});
	}

	render(){
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
					<Nav.Link as={Link} to="/user" className='likes'>LIKES</Nav.Link>
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
					<form className="form" onSubmit={this.onSubmit}>
						<h1>SIGN UP</h1>
							<input
								type="text"
								name="username"
								placeholder="username"
								value={this.state.username}
								onChange={this.handler}
							/>
							<br/>
							<input
								type="email"
								name="email"
								placeholder="email"
								value={this.state.email}
								onChange={this.handler}
							/>
							<br/>
							<input
								type="password"
								name="password"
								placeholder="password"
								value={this.state.password}
								onChange={this.handler}
							/>
							<br></br>
							<p id="errorMessage"></p>

							<input type="submit" value="Sign Up"/>
							<br/><br/>
							
							<div className="login">
								<p>Already Registered? <a href='/login'>Login</a></p>
							</div>
					</form>
				</div>
			</div>
		);
	}
}