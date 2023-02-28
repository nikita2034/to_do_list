import { useState, useEffect } from "react";
import { removeUser } from "store/slices/userSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "hooks/use-auth";
import { store } from "../store/index";
import Tasks from "../components/Task";
import s from "./TaskPage.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
const TaskPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const ShowDescription = (description, title) => {
    setDescription(description);
    setTitle(title);
    handleShow();
  };

  useEffect(() => {
    setData(store.getState().user.data);
  }, []);
  useEffect(() => {
    setItems(
      data.map((item, index) => {
        return (
          <Tasks
            key={index}
            title={item.TITLE}
            description={item.DESCRIPTION}
            activity={item.ACTIVITY_DATE}
            deadline={item.DEADLINE}
            directorLastName={item.CREATED_BY_LAST_NAME}
            directorName={item.CREATED_BY_NAME}
            responsibleLastName={item.RESPONSIBLE_LAST_NAME}
            responsibleName={item.RESPONSIBLE_NAME}
            onClick={ShowDescription}
          />
        );
      })
    );
  }, [data]);
  const { isAuth} = useAuth();
  return isAuth ? (
    <div class="page-content page-container" id="page-content">
      <div class="padding">
        <Container>
          <Row className={s.top}>
            <Col>
              <h4 className={s.header}>To Do List</h4>
            </Col>
            <Col>
              <button
                className={s.button}
                onClick={() => dispatch(removeUser())}
              >
                Exit
              </button>
            </Col>
          </Row>
        </Container>

        <div class="row container d-flex justify-content-center">
          <div class="col-md-12">
            <div class="card px-3">
              <div class="card-body">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className={s.modal_header}>Task description:</div>
                    {description}
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>

                <Container>
                  <Row className={s.task_property}>
                    <Col className={s.headings} onClick={handleShow}>
                      Title
                    </Col>
                    <Col className={s.headings}>Activity</Col>
                    <Col className={s.headings}>Deadline</Col>
                    <Col className={s.headings}>Сreator</Col>
                    <Col className={s.headings}>Responsible</Col>
                  </Row>
                </Container>

                <div className={s.tasks}>
                  <ul class="d-flex flex-column-reverse todo-list" >{items}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default TaskPage;
