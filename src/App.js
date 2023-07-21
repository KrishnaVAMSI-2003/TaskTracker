import Input from "./components/Input";
import List from "./components/List";
import Navbar from "./components/Navbar";
import './index.css'

export default function App() {
  const handleClick = () =>{
    const navbar = document.querySelector('.navbar')
    const icon = document.querySelector('.nav__icon>i')
    navbar.classList.remove("nav--expanded")
    icon.classList.remove('fa-x')
  }
  return(
    <div className="app">
      <Navbar/>
      <div className="container"  onClick={handleClick}>
        <Input/>
        <List/>
      </div>
    </div>
  )
}