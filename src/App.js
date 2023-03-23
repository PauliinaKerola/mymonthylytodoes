import "./App.css";
import { Tasklist } from "./components/tasklist";
import axios from "axios";
import { useState, useEffect } from "react";
import { AddTask } from "./components/addTask";
import teippi from "./assets/teippi.png";

const API_URL = "https://monthlytodoesappservice.azurewebsites.net/api/Todoes";

function App() {
  const [todolist, setTodolist] = useState([]);
  const [task, setTask] = useState("");
  const [updateTask, setUpdateTask] = useState("");
  const [editId, setEditId] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    getTasks();
    getCurrentMonth();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodolist(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    const formattedTitle =
      task.charAt(0).toUpperCase() + task.slice(1).substring(0, 20);

    try {
      const response = await axios.post(API_URL, {
        title: formattedTitle,
        isCompleted: false,
      });
      setTodolist([...todolist, response.data]);
      setTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Haluatko varmasti poistaa tämän tehtävän?") === true) {
      axios.delete(`${API_URL}/${id}`).then(() => {
        setTodolist(todolist.filter((task) => task.id !== id));
      });
    }
  };

  const taskCompleted = (id) => {
    setTodolist(
      todolist.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleEdit = (id) => {
    axios.get(`${API_URL}/${id}`).then((res) => {
      setUpdateTask(res.data.title);
      setEditId(id);
    });
    handleShow();
  };

  const handleUpdate = async () => {
    try {
      axios.put(`${API_URL}/${editId}`, {
        title: updateTask,
        id: editId,
      });
      setUpdateTask("");
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentMonth = () => {
    const months = [
      "Tammikuu",
      "Helmikuu",
      "Maaliskuu",
      "Huhtikuu",
      "Toukokuu",
      "Kesäkuu",
      "Heinäkuu",
      "Elokuu",
      "Syyskuu",
      "Lokakuu",
      "Marraskuu",
      "Joulukuu",
    ];
    const date = new Date();
    const monthIndex = date.getMonth();
    const currentMonth = months[monthIndex];
    setCurrentMonth(currentMonth);
  };

  return (
    <>
      <div className="App">
        <div className="sticker">
          <img src={teippi} alt="teippi" />
        </div>

        <div className="container">
          <p className="fineline">{currentMonth.toUpperCase()}</p>
          <h1 className="headline">Todo -list</h1>
          <Tasklist
            todolist={todolist}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
            taskCompleted={taskCompleted}
            task={task}
          />
          {todolist.length !== 1 ? (
            <p>
              Sinulla on <b>{todolist.length}</b> tehtävää.
            </p>
          ) : (
            <p>
              Sinulla on <b>{todolist.length}</b> tehtävä.
            </p>
          )}
        </div>
        <div className="add-task-container">
          <AddTask
            show={show}
            setShow={setShow}
            task={task}
            setTask={setTask}
            addTask={addTask}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        </div>
      </div>
    </>
  );
}

export default App;
