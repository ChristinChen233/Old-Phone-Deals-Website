import { Link } from "react-router-dom"
const SessionExpireAlertBox = () => {
    return (
      <div className="page-container form-container">
        <div className="form-body">
            <div className="form-group">
            <label>You are not logged in</label>
            </div>
            <div className="form-group">
            <Link to="/login">Login</Link></div>
            <div className="form-group">
            <Link to="/">Home Page</Link></div>
        </div>
    </div>
    )
}

export default SessionExpireAlertBox;
