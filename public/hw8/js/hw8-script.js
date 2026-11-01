/* HW8 – COSC 2328 – Professor McCurry
   Implemented by: Matthew Davis */

function TaskList(props){
    const ptask = props.tasks;
    const pdel = props.onDelete;

    if (props.tasks.length === 0){
        return (
            <p> No tasks yet -- add one above!</p>
        )
    } else { 
        return (
        <div>
            {props.tasks.map(function (task) {
                return (
                    <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={props.onDelete}
                    />
                );
            })}
        </div>)
    }

}

function TaskCard(props){
    return (
        <div>
            <h3>{props.task.name}</h3>
            <h2 className={"badge " + props.task.priority.toLowerCase()}>
                {props.task.priority}</h2>
            <button onClick={() => props.onDelete(props.task.id)}>Delete</button>
        </div>
    
    )
}

function App(props) {
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [error, setError] = React.useState('');
    const [tasks, setTasks] = React.useState([]);


function addTask(error){
    error.preventDefault();
    
    if (taskName.trim() == ''){
            setError('Task name cannot be empty.');
        return;
    }
    setError('');
    
    let task = {
        id: Date.now(),
        name: taskName.trim() , priority
    }

    setTasks([...tasks, task]);
    setTaskName('');
    setPriority('Medium');
    
}

function deleteTask(id){
    setTasks(tasks.filter(t => t.id !== id));
    
}

function clearAll(error){
    error.preventDefault();
    setTasks([]);
}

    return (<div>
            <form>
                <input type="text" value={taskName}
                onChange={e => setTaskName(e.target.value)}/>               
                <select value={priority}
                    onChange={e => setPriority(e.target.value)} >
                    <option value="Low"> Low </option>
                    <option value="Medium"> Medium </option>
                    <option value="High"> High </option> 
                </select>
                <div className="controls">
                <button onClick={addTask}>Add Task </button>
                <button onClick={clearAll}>Clear All</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                <TaskList tasks={tasks} onDelete={deleteTask} />
                <header> {tasks.length} task{tasks.length === 1 ? '' : 's'} </header>
    
            </form>    
           </div> 
    );
    
}
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(<App />);

