import { Login } from '../auth';
import { useRef } from 'react';
import styles from '../../styles/setup.module.css'

export default function SignIn()
{
    const email = useRef();
    const password = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        Login(email.current, password.current);
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Login</h1>
                <form>
                    <div>
                        <label for='email'>Email</label>
                        <input required id='email' type='text' ref={email}/>
                    </div>
                    <div>
                        <label for='password'>Password</label>
                        <input required id='password' type='password' ref={password}/>
                    </div>
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
    )
}