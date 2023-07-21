export const add = (obj)=> {
    return {
        type:"ADD",
        payload:obj
    }
}

export const remove = (index) => {
    return{
        type:"REMOVE",
        payload:index
    }
}

export const timeline = (timeline) => {
    return{
        type:timeline
    }
}

export const toggleComplete = () => {
    return{
        type:"COMPLETED-TASKS"
    }
}
export const completeToFalse = () => {
    return{
        type:"COMPLETE-TO-FALSE"
    }
}

export const taskCompleted = (index) =>{
    return{
        type:"TASKCOMPLETED",
        payload:index
    }
}

export const changeTheme = () => {
    return{
        type:"THEME"
    }
}