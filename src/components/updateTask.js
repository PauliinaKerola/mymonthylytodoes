import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UpdateTask = ({ id }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [updateTask, setUpdateTask] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEdit = (id) => {
    axios
      .get(`https://monthly-todoapprg.azurewebsites.net/api/Todoes/${id}`)
      .then((res) => {
        setUpdateTask(res.data.title);
        setEditId(id);
      });
    handleShow();
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://monthly-todoapprg.azurewebsites.net/api/Todoes/${editId}`,
        {
          title: updateTask,
          id: editId,
        }
      );
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <i>
        <FontAwesomeIcon
          title="Muokkaa"
          icon={faEdit}
          onClick={() => handleEdit(id)}
        />
      </i>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Muokkaa tehtävää</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="addmodal" className="taskInput">
            <input
              id="task"
              type="text"
              value={updateTask}
              required
              onChange={(e) => {
                setUpdateTask(e.target.value);
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

          <button className="button-add" form="addmodal" onClick={handleUpdate}>
            Päivitä
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
