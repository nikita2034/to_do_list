/*Компонент Task предназначен для отризовки конкретной задачи с её свойствами(название,описание, дата и время создания задачи, 
автор задачи, дедлайн, ответственный за выполнение задачи. onClick передает название и описание в функцию по открытию модального окна 
для просмотра описания задачи*/
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import s from "./Task.module.css";
const Tasks = ({
  title,
  description,
  activity,
  deadline,
  directorLastName,
  directorName,
  responsibleLastName,
  responsibleName,
  onClick,
}) => {
  let month;
  let month2;
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    " August",
    "September",
    " October",
    "November",
    "December",
  ];

  let monthActivity = activity.slice(5, 7); // изъятие из полной даты месяца
  let dayActivity = activity.slice(8, 10); // изъятие из полной даты дня
  let timeActivity = activity.slice(11, 16); // изъятие из полной даты времени

  let monthDeadline = deadline.slice(5, 7);
  let dayDeadline = deadline.slice(8, 10);
  let timeDeadline = activity.slice(11, 16);

  // замена номера месяца на его название
  if (monthActivity[0] == 0) {
    month = months[monthActivity[1] - 1];
  } else {
    month = months[monthActivity - 1];
  }

  if (monthDeadline[0] == 0) {
    month2 = months[monthDeadline[1] - 1];
  } else {
    month2 = months[monthDeadline - 1];
  }
  return (
    <li>
      <Container>
        <Row className={s.tasks}>
          <Col className={s.task}>
            <button onClick={() => onClick(description, title)}>{title}</button>
          </Col>
          <Col className={s.task}>
            {dayActivity} {month} {timeActivity}
          </Col>
          <Col className={s.task}>
            {dayDeadline} {month2} {timeDeadline}
          </Col>
          <Col className={s.task}>
            {directorLastName} {directorName}
          </Col>
          <Col className={s.task}>
            {responsibleLastName} {responsibleName}
          </Col>
        </Row>
      </Container>
    </li>
  );
};

export default Tasks;
