import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { timeline,changeTheme } from '../Redux/actions'
import './style.css'

export default function Navbar() {
    
    const dark = useSelector(state=>state.dark)
    const dispatch = useDispatch()

    useEffect(()=>{
        const app = document.querySelector('.app')
        const navbar = document.querySelector('.navbar')
        const navlist = document.querySelector('.nav__list')
        const input = document.querySelector('.inp--container')
        const list = document.querySelector('.list--container')
        if(dark){
            app.classList.add('dark-app')
            navbar.classList.add('dark')
            navlist.classList.add('dark')
            input.classList.add('dark')
            list.classList.add('dark')
        } else{
            app.classList.remove('dark-app')
            navbar.classList.remove('dark')
            navlist.classList.remove('dark')
            input.classList.remove('dark')
            list.classList.remove('dark')
        }
        localStorage.setItem('theme',JSON.stringify(dark))
      },[dark])

    const toggleExpand = () => {
        const navbar = document.querySelector('.navbar')
        const icon = document.querySelector('.nav__icon>i')
        navbar.classList.toggle("nav--expanded")
        icon.classList.toggle('fa-x')
    }
    const handleClick = () =>{
        const navbar = document.querySelector('.navbar')
        const icon = document.querySelector('.nav__icon>i')
        navbar.classList.remove("nav--expanded")
        icon.classList.remove('fa-x')
    }
    
    return(
        <header>
            <nav className='navbar'>
                <div className="nav__header" onClick={handleClick}>
                        <img src='taskTrackerImg.webp' alt=''className='header__img' draggable='false'/>
                    <h1>
                        <a href='/'>Task Tracker</a>
                    </h1>
                </div>
                <div className='nav__icon' onClick={toggleExpand}>
                    <i className="fa-solid fa-bars fa-3x"></i>
                </div>
                <ul className='nav__list'>
                    <li onClick={()=>dispatch(timeline("TODAY"))} className='list__item'>Today</li>
                    <li onClick={()=>dispatch(timeline("DUE"))} className='list__item'>Due</li>
                    <li onClick={()=>dispatch(timeline("UPCOMING"))} className='list__item'>Upcoming</li>
                    <li onClick={()=>dispatch(changeTheme())} className='list__item theme__icon'>
                        <i className={`fa-solid fa-${dark ? "sun":"moon"}`}></i>
                    </li>
                </ul>
            </nav>
        </header>
    )
}