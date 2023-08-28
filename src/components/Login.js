import { useState } from "react";
import { connect } from "react-redux";
import { handleLoginUser } from "../actions/authedUser.js";
import { Navigate, useLocation } from "react-router-dom";

const Login = (props) => {
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const location = useLocation();
    //const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = location.state?.from || "/";
    //const redirectUrl = urlParams.get('redirectTo');

    if (props.isAuthorised === true) {
        console.log(redirectUrl);
        return <Navigate to={redirectUrl ? redirectUrl : "/"} />;
    }

    const handleUserNameChange = (event) => {
        const value = event.target.value;
        setUserName(value);
    };

    const handlePassWordChange = (event) => {
        const value = event.target.value;
        setPassWord(value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.dispatch(handleLoginUser(userName, passWord));
        setUserName("");
        setPassWord("");
    };


    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="LoginHeader">
                    <h3>Employee Polls</h3>
                </div>
                <div className="LoginTitle">
                    <h3>
                        Login:
                    </h3>
                </div>
                <div className="LoginInput">
                    <textarea
                        className="LoginUserName"
                        placeholder="UserName"
                        value={userName}
                        onChange={handleUserNameChange}
                        data-testid={"username_login"}
                    >
                    </textarea>
                </div>
                <div className="PasswordInput">
                    <textarea
                        className="LoginPassword"
                        placeholder="Password"
                        value={passWord}
                        onChange={handlePassWordChange}
                        data-testid={"Password_login"}
                    >
                    </textarea>
                </div>
                <div className="SubmitButton">
                    <button
                        disabled={userName === "" || passWord === ""}
                        type="submit"
                        data-testid={"Button_login"}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )

};

const mapStateToProps = ({ authedUser, users }) => {
    return {
        isAuthorised: authedUser === null ? false : true,
        users: Object.values(users),
    };
};

export default connect(mapStateToProps)(Login);