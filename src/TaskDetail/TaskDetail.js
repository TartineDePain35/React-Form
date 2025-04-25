import { useState, useEffect } from 'react';
import './TaskDetail.css';
import { useParams } from 'react-router';
import { deleteTask } from '../Redux/taskAction';
import { Link, Route, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";

function TaskDetail() {
    const { id } = useParams();
    const [ task, setTask ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    // Custom hooks Redux
    const dispatch = useDispatch();
    const storeTasks = useSelector(state => state.tasks.tasks);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeout(200);
            const foundTask = storeTasks.find((task) => task.id === parseInt(id));
            if (foundTask) {
                console.log("id de tache : ", id);
                setTask(foundTask);
            }
            setLoading(false)
        }, 500)
        return () => clearTimeout(timer);
    }, [id, storeTasks])

    function supTask() {
        console.log("Task to delete: ", id);
        dispatch(deleteTask(id));
        navigate("/")
     } 

    if(loading) {
        return (
            <div>
                <p>Chargement ...</p>
            </div>
        )
    } 
    if(!task) {
        return (
            <div>
                <p>Erreur ! Tache non trouvée</p>
                <Link to="/">liste des taches</Link>
            </div>
        )
    }
    return (
        <div className='app-TaskDetail'>
            <div className='app-TaskDetail-main'>
                <p>Tache numero :  {id}</p>
                <p>{ task.title }, crée le : { task.createDate} </p>
                <p className='app-TaskDetail-detail'>{ task.detail }</p>
            </div>
            <div className='app-TaskDetail-side'>
                    <button type='submit' onClick={supTask}><Trash></Trash></button>
            </div>
        </div>
    )

}

export default TaskDetail;