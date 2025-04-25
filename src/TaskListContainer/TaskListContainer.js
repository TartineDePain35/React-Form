import { useState, useEffect } from 'react';
import './TaskListContainer.css';
import TaskList from './TaskList/TaskList';
import { addTask } from '../Redux/taskAction';
import { useDispatch, useSelector } from 'react-redux';

function TaskListContainer() {
    const [newTaskTitle, setNewTaskTitle] = useState();
    const [newTaskDetail, setNewTaskDetail] = useState();
    const [titleError, setTitleError] = useState(false);
    const date = Date.now();
    const today = new Date(date);

    // Custom hooks Redux
    const dispatch = useDispatch();
    const storeTasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {},[storeTasks]);

    function handleTitleChange(value) {
        setNewTaskTitle(value);
        newTaskTitle && newTaskTitle.length > 20
            ? setTitleError(true)
            : setTitleError(false)
    }

    function addNewTask(e) {
        e.preventDefault();
        if (!titleError) {
            let newTask = {
                id: storeTasks.length + 1,
                createDate: today.toLocaleDateString(),
                title: newTaskTitle,
                detail : newTaskDetail,
                done: false
            };
            dispatch(addTask(newTask));
            setNewTaskTitle('');
            setNewTaskDetail('');
        }
    }

    return (
        <div className='app-TaskListContainer one'>            
            <h2>Liste des taches</h2>
            <form onSubmit={addNewTask}>
                <div className='app-taskListContainer-form-line'>
                    <input type="text" id='titre' title='titre' placeholder='titre de ma tâche' required onChange={(e) => handleTitleChange(e.target.value)} value={newTaskTitle}></input>
                    <p className={(titleError ? 'error-show' : 'error-hidden')}>Titre trop long</p>
                    <input type="texte" id="description" title='description' placeholder='Description de ma tâche' onChange={(e) => setNewTaskDetail(e.target.value)} value={newTaskDetail}></input>
                    <button>Ajouter une tache</button>
                </div>
            </form>
            <div>
                <TaskList/>
            </div>
        </div>
    )
}

export default TaskListContainer;