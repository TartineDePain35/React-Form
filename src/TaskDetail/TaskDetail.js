import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TaskDetail.css';
import { useParams } from 'react-router';
import { Link } from 'lucide-react';

function TaskDetail() {
    const { id } = useParams();
    const [ task, setTask ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const storeTasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        console.log("id de tache : ", id);
        const timer = setTimeout(() => {
            setTimeout(200);
            console.log('task:', task);
            console.log(parseInt(id));
            const foundTask = storeTasks.find((task) => task.id === parseInt(id));
            console.log('foundTask:', foundTask);
            if (foundTask) {
                setTask(foundTask);
            }
            setLoading(false)
        }, 500)
        return () => clearTimeout(timer);
    }, [id, storeTasks])

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
        <div>
            <p>l'id de la tache {id}</p>
        </div>
    )

}

export default TaskDetail;