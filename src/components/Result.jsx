import { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Result({element, artwork}) {
    const { name } = useContext(UserContext);

    return(
        <div>
            <h1>Results</h1>
            <h2>Your name is: {name}</h2>
            <h2>Your element is: {element}</h2>
            <h3>Here is a random dog picture for you to finish the quiz on a nice note!</h3>
            <h3>Hope you are happy with your element!</h3>
            <img src={artwork} alt="a random dog picture" height="500px"/>
        </div>

    );

}