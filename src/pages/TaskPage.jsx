/*Компонет TaskPage предназначен для отрисовки таблицы с задачами.*/
import { useState, useEffect } from "react";
import { removeUser } from "store/slices/userSlice"; // сброс данных пользователя, обнуление авторизации и выход из учетной записи
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
  const [show, setShow] = useState(false); // состояние для управления модальным окном, показывающее описание задачи
  const handleClose = () => setShow(false); // функция закрытия модального окна
  const handleShow = () => setShow(true); // функция открытия модального окна

  const dispatch = useDispatch();
  const [data, setData] = useState([]); // состояние для хранения всех задач пользователя
  const [items, setItems] = useState([]); // состояние для хранения упрощенных задач пользователя (определенные свойства задачи)
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const ShowDescription = (description, title) => {
    setDescription(description);
    setTitle(title);
    handleShow();
  };

  // useEffect срабатывает при первом рендаре страницы и получает данные пользователя (задачи) и store
  useEffect(() => {
    setData(store.getState().user.data);
  }, []);

  // useEffect срабатывает, если изменились данные пользователя(задачи). Создается массив items с упрощенными задачами. Каждая задача является элементом <li>
  useEffect(() => {
    setItems(
      data.map((item, index) => {
        return (
          <Tasks
            key={index}
            title={item.TITLE} //название задачи
            description={item.DESCRIPTION} //описание задачи
            activity={item.ACTIVITY_DATE} //дата создания задачи
            deadline={item.DEADLINE} //дедлайн задачи
            directorLastName={item.CREATED_BY_LAST_NAME} //фамилия создателя задачи
            directorName={item.CREATED_BY_NAME} //имя создателя задачи
            responsibleLastName={item.RESPONSIBLE_LAST_NAME} //фамилия ответственного за выполнение задачи
            responsibleName={item.RESPONSIBLE_NAME} //имя ответственного за выполнение задачи
            onClick={ShowDescription} //функция для получение описания и названия задачи и открытия модального окна с описание задачи
          />
        );
      })
    );
  }, [data]);
  const { isAuth } = useAuth();

  // isAuth хранит состояние авторизации пользователя, если isAuth=true, отрисовываются таблица задач,если isAuth=false происходит переход на страницу авторизации
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
                  <ul class="d-flex flex-column-reverse todo-list">{items}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default TaskPage;
