import { combineReducers } from "redux"

const initialTasks =localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
const theme =localStorage.getItem('theme') ? JSON.parse(localStorage.getItem('theme')) : false

const dataReducer = (state=initialTasks, action) => {
    switch(action.type){
        case "ADD":
            return [...state,action.payload]
        case "REMOVE":
            return state.filter(ele => ele.index !== action.payload)
        case "TASKCOMPLETED":
            return state.map(ele=>{
                if(ele.index===action.payload){
                    return{
                        ...ele,
                        completed : !ele.completed
                    }
                } else return ele
            })
        default:
            return state
    }
}

const timelineReducer = (state="TODAY", action) => {
    switch(action.type){
        case "TODAY":
            return "TODAY"
        case "DUE":
            return "DUE"
        case "UPCOMING":
            return "UPCOMING"
        default:
            return state
    }
}

const completedReducer = (state = false, action)=>{
    switch(action.type){
        case "COMPLETED-TASKS":
            return !state
        case "COMPLETE-TO-FALSE":
            return false
        default:
            return state
    }
}

const dark = (state = theme, action) => {
    switch(action.type){
        case "THEME":
            return !state
        default:
            return state
    }
}

export const allReducers = combineReducers({dataReducer,timelineReducer, completedReducer,dark})