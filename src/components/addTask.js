import React from "react";
import { Modal } from "react-bootstrap";

export const AddTask = ({
  task,
  setTask,
  handleClose,
  show,
  handleShow,
  addTask,
}) => {
  return (
    <>
      <button onClick={handleShow} className="button-add">
        Lisää tehtävä
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Lisää tehtävä</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addmodal" className="taskInput">
            <input
              id="task"
              type="text"
              placeholder="esim. Vaihda lakanat..."
              value={task}
              required
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="button-close"
            form="addmodal"
            onClick={handleClose}
          >
            Sulje
          </button>

          <button className="button-add" form="addmodal" onClick={addTask}>
            Lisää
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
