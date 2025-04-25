import { ADD_TASK, LOAD_TASKS, DELETE_TASK } from "./taskAction";

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case LOAD_TASKS:
            return {
                ...state,
                tasks: action.payload.tasks,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id != action.payload.id)
            }    
        default:
            return state;
    }
}

export default taskReducer;