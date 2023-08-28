import { connect } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const AuthenticateUser = ({ children, isAuthorised }) => {
    const location = useLocation();
    if (isAuthorised) {
        return children;
    }
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />

}

const mapStateToProps = ({ authedUser }) => {
    return {
        isAuthorised: authedUser === null ? false : true,
    };
};

export default connect(mapStateToProps)(AuthenticateUser);