import { Link } from "react-router-dom";
import UserForm from "./UserForm";

export default function Header() {
  return (
    <div>
        <h1>Which element are you?</h1>
        <p>Based on totally random things</p>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/quiz">Quiz</Link>
        <br/>
        <br/>
    </div>
  )
}