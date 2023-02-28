import React from "react";
import { useState, useEffect } from "react";
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
  onClick
}) => {
  let month;
  let month2;
  let months=["January","February","March","April","May","June","July"," August","September"," October","November","December"];
 
  let monthActivity=activity.slice(5,7);
  let dayActivity=activity.slice(8,10);
  let timeActivity=activity.slice(11,16);

  let monthDeadline=deadline.slice(5,7);
  let dayDeadline=deadline.slice(8,10);
  let timeDeadline=activity.slice(11,16);

  if(monthActivity[0]==0){
    month=months[monthActivity[1]-1];
  }else{
    month=months[monthActivity-1];
  }

  if(monthDeadline[0]==0){
    month2=months[monthDeadline[1]-1];
  }else{
    month2=months[monthDeadline-1];
  }
  return (
    <li >
      <Container>
        <Row className={s.tasks} >
          <Col className={s.task}><button onClick={()=>onClick(description,title)}>{title}</button></Col>
          <Col className={s.task}>{dayActivity} {month} {timeActivity}</Col>
          <Col className={s.task}>{dayDeadline} {month2} {timeDeadline}</Col>
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
