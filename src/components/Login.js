import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();


    const submitHandler = (e) => {
        e.preventDefault();

        const regexEmail =
        /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;


        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password)
        if( email === '' || password === '') {
            swAlert(
                <h2>Los campos no pueden estar vacios</h2>
            );
            return;
        }

        if (regexEmail.test(email)) {
            swAlert(
                <h2>Dirección de correo electronica no valida</h2>
            );
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert(
                <h2>Credenciales invalidas</h2>
            );
            return;
        }

        axios.post('http://challenge-react.alkemy.org', {email, password})
            .then(res => {
                swAlert(<h2>Perfecto, ingresaste correctamente</h2>)
                const tokenRecibido = res.data.token;
                localStorage.setItem('token', tokenRecibido);
                navigate("/listado");
            })
    }


    return (
        <>
            <h2>Formulario de login</h2>
            <form onSubmit={submitHandler}>
                <label>
                    <span>Correo electronico:</span>
                    <input type="email" name="email" />
                </label>
                <br />
                <label>
                    <span>Contraseña:</span>
                    <input type="password" name="password"/>
                </label>
                <br/>
                <button type="submit">Ingresar</button>
            </form>
        </>
    )
}

export default Login;