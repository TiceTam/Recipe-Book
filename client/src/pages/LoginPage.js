import './LoginPage.css';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cooking from '../images/cooking.json';
import Lottie from "lottie-react";
import React, {Component} from "react";

export default class LoginPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
			username: "",
            password: "",
          };
    }

    onSubmit = async(event) => {
		const URL = "https://www.cop4331groupfifteen.xyz/api/login";

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
				}),
            }).then(
                async(response) => {
                var json = "";
				var warn = document.getElementById("errorMessage");

				if(response.status === 404){
					warn.style.color = "#FF0000";
					warn.innerHTML = "Username not found or password invalid :(";
					console.log("username or password Invalid");
				}
                else if(response.status === 200){
                    json = await response.json();
                    window.location.href ="http://localhost:3001/recipe";
					//window.location.href = "https://www.cop4331groupfifteen.xyz/recipe";
				}
                return json;
			}).then(function(data){
                localStorage.setItem("usernameID", data.userID);
                //console.log(localStorage.getItem("usernameID"));
            });
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
                        <Nav.Link as={Link} to="/login" className='login'>LOGIN</Nav.Link>
                        <Nav.Link as={Link} to="/signup" className='signup'>SIGNUP</Nav.Link>
                        {/*<Nav.Link as={Link} to="/login">LOGIN</Nav.Link>*/}
                    </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>

                <div className="loginForm">
                    <form className="form" onSubmit={this.onSubmit}>
                        <h1>Login</h1>
                        <input
                            type="username"
                            name="username"
                            placeholder="username"
                            onChange={this.handler}
                        />
                        <br/>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handler}
                        />
                        <br/><br/>
                        <p id="errorMessage"></p>

                        <input type="submit" value="Login"/>
                        <br/><br/>

                        <div className="signup">
                            <p>Not Registered? <a href="/signup">Sign Up</a></p>
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
}