import './TaskList.css';
import { Circle, CircleCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

function TaskList() {

    function changeDoneStatus() {
        // Not implemented now
    }

    const storeTasks = useSelector((state) => state.tasks.tasks)
    return (
        <ul> 
            {storeTasks.map((task) => (
                <Link to={`/taskDetail/${task.id}`}>
                <div className='app-taskList-liste'>
                    <li key={task.id} className='app-taskList-li'>
                        <div>
                            {task.done === true ? <CircleCheck className='app-taskList-li-circle checked' onClick={changeDoneStatus()}/> : <Circle className='app-taskList-li-circle notChecked' onClick={changeDoneStatus()}/>} 
                            <p>{task.title}</p>
                            <p>{task.detail}</p>
                            <p>{task.createDate}</p>
                        </div>
                    </li>
                </div>
                </Link>
            ))}
        </ul>
    )
}

export default TaskList;