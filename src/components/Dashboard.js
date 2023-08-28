import { connect } from "react-redux";
import { Questions } from "./Question";

const Dashboard = (props) => {

    const openTab = (evt, tabName) => {
        var i, tabcontent, tablinks;

        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };

    return <div className='Dashboard-Container'>
        <div className="tab">
            <button class="tablinks" onClick={(event) => openTab(event, "NewQuestions")} >New Questions</button>
            <button class="tablinks" onClick={(event) => openTab(event, "Done")} >Done</button>
        </div>

        <div id="NewQuestions" className="tabcontent">
            <h3 className="center ">New Questions</h3>
            <ul className="dashboard-list">
                {props.newQuestions.map((question) => (
                    <Questions
                        id={question.id}
                        question={question}
                        user={question.author}
                    ></Questions>
                ))}
            </ul>
        </div>

        <div id="Done" class="tabcontent" style={{display: 'none'}}>
            <h3 className="center ">Done</h3>
            <ul className="dashboard-list">
                {props.doneQuestions.map((question) => (
                    <Questions
                        id={question.id}
                        question={question}
                        user={question.author}
                    ></Questions>
                ))}
            </ul>
        </div>
    </div>
};

const mapStateToProps = ({ authedUser, users, questions }) => {
    const questionIds = Object.keys(questions).sort(
        (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    const listOfQuestions = Object.keys(questions).map((question) => questions[question]);
    const doneQuestions = listOfQuestions.filter((question) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser),)
        .sort((a, b) => b.timestamp - a.timestamp);
    const newQuestions = listOfQuestions.filter((question) => !doneQuestions.includes(question))
        .sort((a, b) => b.timestamp - a.timestamp);

    return {
        authedUser,
        questionIds: questionIds,
        questions,
        doneQuestions,
        newQuestions,
        users,
    };
};


export default connect(mapStateToProps)(Dashboard);