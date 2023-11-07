import logo from './logo.svg';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';


const router = createBrowserRouter([
  {path: '/', element: <LandingPage/>},
  {path: '/home', element: <HomePage/>}
]);

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
