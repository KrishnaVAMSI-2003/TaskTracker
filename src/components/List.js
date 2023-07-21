import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove, toggleComplete, completeToFalse, taskCompleted } from '../Redux/actions'

export default function List() {
  const listsData = useSelector(state => state.dataReducer)
  const timeline = useSelector(state=>state.timelineReducer)
  let completedVal = useSelector(state=>state.completedReducer)
  const dispatch = useDispatch()
  let displayData = listsData
  if(timeline==="TODAY"){
    displayData = listsData.filter(ele=>ele.date === new Date().toDateString())
  }
  if(timeline==="DUE"){
    displayData = listsData.filter(ele=> new Date(ele.date) - new Date(new Date().toDateString())<0)
  }
  if(timeline==="UPCOMING"){
    displayData = listsData.filter(ele=> new Date(ele.date) - new Date(new Date().toDateString())>0)
  }

  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(listsData))
  },[listsData])

  useEffect(()=>{
    dispatch(completeToFalse())
    document.querySelector('.completed__icon').classList.remove('fa-clock')
  },[timeline,dispatch])

  displayData = displayData.filter(ele=>ele.completed===completedVal)
  const dateArray = [...new Set([...displayData.map(ele=>ele.date)])].sort((a,b)=>new Date(a)-new Date(b))

  const handleComplete = (e) => {
    e.target.classList.toggle('fa-clock')
    dispatch(toggleComplete())
  }

  return(
    <div  className='list--container'>
      <i className="fa-solid fa-clipboard-check fa-3x completed__icon" title='' onClick={handleComplete}></i>
      {displayData.length>0 ? <div>
      {dateArray.map((date,index)=>{
        return(
          <div key={index}>
            <label className='task__date'>{new Date(date).toLocaleDateString()}</label>
            {displayData.filter(ele=>ele.date===date).map(ele=>{
              return(
                <div key={ele.index} className='task--container'>
                  <i className={`fa-sharp fa-solid fa-circle-${ele.completed?"xmark":"check"} check__icon`} onClick={()=>dispatch(taskCompleted(ele.index))}></i>
                  <p>{ele.task}</p>
                  <i className="fa-sharp fa-solid fa-trash-can fa-2x del__icon" onClick={()=>dispatch(remove(ele.index))}></i>
                </div>
              )
            })}
          </div>
        )
      })}
      </div>:
      (timeline==="TODAY"||timeline==="UPCOMING")&& !completedVal?
      <h1>Add tasks to display</h1>:<h1>No tasks to display</h1>}
    </div>
  )
}
