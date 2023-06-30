export const ADD_TODO = 'ADD_TODO';
export const DEL_TODO = 'DEL_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const TICK_BOX = 'TICK_BOX';

export const addTodo = (payload)=>{
    return{
        type:ADD_TODO,
        payload
    }
}

export const delTodo = (payload)=>{
    return{
        type:DEL_TODO,
        payload
    }
}

export const editSubmit = (payload)=>{
    return{
        type:UPDATE_TODO,
        payload
    }
}

export const tickBox=(payload)=>{
    return {
        type:TICK_BOX,
        payload
    }
}