import React from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { UpdateTask } from "./updateTask";

export const Tasklist = ({
  todolist,
  handleDelete,
  taskCompleted,
  handleEdit,
  handleUpdate,
  updateTask,
  setUpdateTask,
  editId,
  handleShow,
  show,
  handleClose,
}) => {
  return (
    <>
      {todolist &&
        todolist.map((task, key) => {
          return (
            <div key={task.id}>
              <div className="taskBg">
                <div className={task.isCompleted ? "taskDone" : ""}>
                  <div className="taskNum">{key + 1 + "."}</div>
                  <div className="taskName">{task.title}</div>
                </div>
                <div className="taskControls">
                  <div>
                    {task.isCompleted ? (
                      <i
                        className="yellow"
                        title="Merkitse tekemättömäksi"
                        onClick={(e) => taskCompleted(task.id)}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </i>
                    ) : (
                      <i
                        title="Merkkaa tehdyksi"
                        onClick={(e) => taskCompleted(task.id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </i>
                    )}

                    <i>
                      <FontAwesomeIcon
                        title="Poista"
                        icon={faTrash}
                        onClick={() => handleDelete(task.id)}
                      />
                    </i>
                    {task.isCompleted ? null : (
                      <UpdateTask
                        id={task.id}
                        handleEdit={handleEdit}
                        handleUpdate={handleUpdate}
                        setUpdateTask={setUpdateTask}
                        updateTask={updateTask}
                        editId={editId}
                        handleShow={handleShow}
                        show={show}
                        handleClose={handleClose}
                        isCompleted={task.isCompleted}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
