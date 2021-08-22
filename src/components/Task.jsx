import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import "react-day-picker/lib/style.css";
import dateFnsFormat from 'date-fns/format';
import { isAfter } from 'date-fns/esm';
import { addDays, isBefore } from 'date-fns';
import isToday from 'date-fns/esm/isToday/index.js';

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ setShowdAddTask, setShowTask, showTask }) => {
    const [task, setTask] = React.useState("");
    const [date, setDate] = React.useState(new Date());

    return (
        <>
            <div className="add-task-dialog">
                <input value={task} onChange={(e) => { setTask(e.target.value) }} type="text" />
                <div className="add-task-actions-container">
                    <div className="btns-container">
                        <button disabled={task === ""} onClick={() => { setShowTask([...showTask, [task, date]]); setTask(""); setShowdAddTask(false); }} className="add-btn">Add Task</button>
                        <button onClick={() => { setShowdAddTask(false); setTask("") }} className="cancel-btn">Cancel</button>
                    </div>
                    <div className="icon-container">
                        <DayPickerInput dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }} formatDate={formatDate} format={FORMAT} placeholder={`${dateFnsFormat(new Date(), FORMAT)}`} onDayChange={(date) => { setDate(date) }} />
                    </div>
                </div>
            </div>
        </>
    )
}

const TASKS_HEADER_MAPPING = {
    "INBOX": "Inbox",
    "TODAY": "Today",
    "NEXT_7": "Next 7 days",
}

const TaskItems = ({ selectedTab, tasks }) => {
    if (selectedTab === "NEXT_7") {
        return tasks
            .filter(
                (task) => (
                    isAfter(task[1], new Date()) && isBefore(task[1], addDays(new Date(), 7))
                ))
            .map((task) => (
                (<p id="task-list" key={task[0]}>
                    <p>{task[0]}</p> <p id="task-date">{dateFnsFormat(new Date(task[1]), FORMAT)}</p>
                </p>
                )
            ))
    }

    if (selectedTab === "TODAY") {
        return tasks
            .filter((task) => isToday(task[1]))

            .map((task) => (
                <p id="task-list" key={task[0]}>
                    <p>{task[0]}</p>
                    <p id="task-date">{dateFnsFormat(new Date(task[1]), FORMAT)}</p>
                </p>
            ))

    }

    return tasks.map((task) => (
        <p id="task-list" key={task[0]}>
            <p>{task[0]}</p>
            <p id="task-date">{dateFnsFormat(new Date(task[1]), FORMAT)}</p>
        </p>
    ))
}

function Task({ selectedTab }) {
    const [showAddTask, setShowdAddTask] = React.useState(false);
    const [showTask, setShowTask] = React.useState([]);

    return (
        <>
            <div className="tasks">
                <h1>{TASKS_HEADER_MAPPING[selectedTab]}</h1>
                {selectedTab === "INBOX" ? (<div onClick={() => { showAddTask ? setShowdAddTask(false) : setShowdAddTask(true) }} className="add-task-btn">
                    <span className="plus">+</span>
                    <span className="add-task-text">Add Task</span>
                </div>) : null}
                {showAddTask ? <AddTask showTask={showTask} setShowTask={setShowTask} setShowdAddTask={setShowdAddTask} /> : null}


                <div className="display-tasks">
                    {showTask.length > 0 ?
                        <TaskItems tasks={showTask} selectedTab={selectedTab} />
                        : <p>No Tasks to show</p>}
                </div>
            </div>
        </>
    )
}

export default Task;
