export const ADD_TASK = "ADD_TASK";
export const LOAD_TASKS = "LOAD_TASKS";
export const DELETE_TASK = "DELETE_TASK";

export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
});

export const deleteTask = (id) => ({
    type: DELETE_TASK,
    payload: {id},
});

export const loadTasks = (tasks) => ({
    type: LOAD_TASKS,
    payload: tasks,
});

export const initTasks = () => {
    return async (dispatch) => {
        try {
            const initialTask = (await import ('../tasks.json')).default;
            dispatch(loadTasks(initialTask))
        } catch (error) {
            console.log("erreur lors de l'import initial des données")
        };
    };
};