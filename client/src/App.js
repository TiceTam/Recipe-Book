import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage.js';
import UserPage from './pages/UserPage.js';
import RecipePage from './pages/RecipePage.js';
import CreateRecipe from './pages/CreateRecipe.js';
import LoginPage from './pages/LoginPage.js';
import SignupPage from './pages/SignupPage.js';


const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/user', element: <UserPage/>},
  {path: '/recipe', element: <RecipePage/>},
  {path: '/create', element: <CreateRecipe/>},
  {path: '/login', element:<LoginPage/>},
  {path: '/signup', element:<SignupPage/>}
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
