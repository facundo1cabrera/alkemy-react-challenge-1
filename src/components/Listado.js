import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Listado () {

    const navigation = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigation("/", { replace: true});
        }        
    }, [])

    return (
        <h2>Soy un listado</h2>
    )
}

export default Listado;