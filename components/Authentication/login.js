import { useRef } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/setup.module.css';

export default function LoginForm()
{
    const router = useRouter();
    const email = useRef();
    const password = useRef();

    const handleLogin = async(event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
            router.push('/profile');
        } catch(error) {
            console.log(error.code);
        }

    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label for='email'>Email</label>
                        <input required id='email' type='text' ref={email}/>
                    </div>
                    <div>
                        <label for='password'>Password</label>
                        <input required id='password' type='password' ref={password}/>
                    </div>
                    <button>Login</button>
                </form>
            </div>
        </div>
    )
}