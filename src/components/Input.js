import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import {add,timeline,completeToFalse} from '../Redux/actions'
import './style.css'

export default function Input() {
    const taskRef = useRef()
    const dateRef = useRef()
    const dispatch = useDispatch()

    const date = new Date();
    let today = `${date.getFullYear()}`
    const month = date.getMonth()+1
    const day = date.getDate()

    if(month>9){ today = `${today}-${month}` } else { today = `${today}-0${month}` }
    if(day>9){ today = `${today}-${day}` } else { today = `${today}-0${day}` }
    
    const data = useSelector(state=>state.dataReducer)

    const handleAdd = (e) => {
        e.preventDefault()
        const txtInp = document.querySelector('.inp__field>input')
        const taskVal = taskRef.current.value
        const inpDate = dateRef.current.value
        if(taskVal.length<=0) {
            alert("task cannot be empty") 
            return
        }
        const dateDiff = new Date(new Date(inpDate).toDateString())- new Date(new Date().toDateString())
        if(dateDiff<0){
            alert("Invalid Date. Date should not be less than today")
            return
        }
        if(dateDiff>0){
            dispatch(timeline('UPCOMING'))
        } else{
            dispatch(timeline('TODAY'))
        }
        dispatch(completeToFalse())
        const indexArr = data.map(ele=>ele.index)
        const taskIndex = indexArr.length>0 ? Math.max(...indexArr) + 1 : 1

        const newTask = {
            index:taskIndex,
            task:taskVal,
            date:new Date(inpDate).toDateString(),
            completed:false
        }
        dispatch(add(newTask))
        
        e.target.classList.toggle('rotate')
        txtInp.value=""

        setTimeout(()=>{
            e.target.classList.toggle('rotate')
            e.target.classList.toggle('fa-circle-check')
            e.target.classList.toggle('fa-circle-plus')
        },1)
        setTimeout(()=>{
            e.target.classList.toggle('fa-circle-check')
            e.target.classList.toggle('fa-circle-plus')  
        },1000)
        
    }

    const handleClick = (e)=>{
        console.log(e.target)
    }
    
    return(
        <div className="inp--container">
            <input type='date' defaultValue={today} ref={dateRef} onClick={handleClick}/>
            <div className="inp__field">
                <input type="text" placeholder='Enter task...' className='input__txt' ref={taskRef}/>
                <i className="fa-sharp fa-solid fa-circle-plus add__icon" onClick={handleAdd}></i>
            </div>
        </div>
    )
}