import React from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import { formatQuestion } from "../utils/helpers";
import { handleAnswerQuestion } from "../actions/questions"

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};


const Poll = ({ dispatch, authedUser, users, id, question }) => {
  //const toNavigate = useNavigate();

  if (!question.exist){
    return <Navigate to={"*"}  replace={true} />
  }

  const {
    name,
    avatar,
    hasUserAnswered,
    optionOneText,
    optionTwoText,
    optionOneVotesPercentage,
    optionTwoVotesPercentage,
    optionOneVotes,
    optionTwoVotes,
    selectedChoice
  } = question;

  console.log(selectedChoice);

  const onChangeOne = (event) => {
    event.preventDefault();
    dispatch(handleAnswerQuestion({
      authedUser,
      qid : id,
      answer: "optionOne",
    }))
    //toNavigate('/');
  }
  const onChangeTwo = (event) => {
    event.preventDefault();
    dispatch(handleAnswerQuestion({
      authedUser,
      id,
      answer: 'optionTwo',
    }))
    //toNavigate('/');
  }

  return (
    <div>
      <div className="Poll_Header">
        <h3>Poll By {name}</h3>
        <img src={avatar} className="user_login_avatar" alt="user_avatar"></img>
      </div>
      <div className="Poll_Question">
        <h3>Would You Rather</h3>
      </div>
      {!hasUserAnswered ? (
        <div className="Poll_Choice_Container">
          <div className="Poll_Choice_One">
            {optionOneText}
            <button onClick={onChangeOne}>Vote</button>
          </div>
          <div className="Poll_Choice_Two">
            {optionTwoText}
            <button onClick={onChangeTwo}>Vote</button>
          </div>
        </div>

      ) : (
        <div>Thank you for answering this question. You have selected {selectedChoice ? "Option One" : "Option Two"}
          <div className="Poll_Choice_One">
            {optionOneText}
            <button className={selectedChoice ? "selected" : ""} disabled>{optionOneVotesPercentage}% - {optionOneVotes} votes</button>
          </div>
          <div id='Poll_Choice_Two' className="Poll_Choice_Two">
            {optionTwoText}
            <button className={!selectedChoice ? "selected" : ""} disabled>{optionTwoVotesPercentage}% - {optionTwoVotes} votes</button>
          </div>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];
  let author;

  if (question === undefined || null){
    author = "";
  }
  else {
    author = users[question.author]
  }
  return {
    authedUser,
    users,
    id,
    question: formatQuestion(question, author, authedUser),
  };
};

export default withRouter(connect(mapStateToProps,)(Poll));