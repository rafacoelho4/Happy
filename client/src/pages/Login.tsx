import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import icon from '../images/columnLogo.svg';
import '../styles/pages/login.css';
import api from '../services/api';

const Login = () => {
    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ rememberPassword, setRememberPassword ] = useState(false);

    const [errorStatus, setErrorStatus] = useState('');

    let id = '';
    let token = '';

    function handleEmail(e: any) {
        e.preventDefault();
        setEmail(e.target.value);
        console.log(email);
    }

    function handleSenha(e: any) {
        e.preventDefault();
        setSenha(e.target.value);
        console.log(senha);
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            await api.post('/auth', {
                email,
                senha,
                remember_me: rememberPassword
            }).then(async res => {
                console.log(res);
                id = res.data.user.id;
                token = res.data.token;
                console.log(token);
                console.log(id);
                localStorage.setItem('@token', token);
                localStorage.setItem('@user_id', id);
                token = '';
                history.push(`/user/${id}`);
                id = '';
            });
        } catch (error) {
            let split = error.message.split(' ');
            let status = split[5];
            console.log(status);
            setErrorStatus(status);
            if(status === '404') {
                alert('Nome de usuário não encontrado. Tente novamente.')
            } else if (status === '400') {
                alert('Senha inválida. Tente novamente.')
            } else {
                alert('Erro ao fazer login. Tente novamente.')
            }
        }
    }

    return(
        <div id="login-page">
            <aside>
                <img src={icon} alt="Happy logo!"/>

                <div className="location">
                    <strong>Ouro Preto</strong>
                    <span>Minas Gerais</span>
                </div>
            </aside>

            <main>
                <button className="go-back" onClick={() => history.goBack()} >
                    <FiArrowLeft size={26} color="#15C3D6" />
                </button>

                <form className="login-form">
                    <fieldset>
                        <legend>Fazer Login</legend>
                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmail}
                                />
                        </div>
                        <div className="input-block">
                            <label htmlFor="senha">Senha</label>
                            <input 
                                id="senha"
                                type="password"
                                value={senha}
                                onChange={handleSenha}
                                />
                        </div>
                        <div className="input-block lembrar-senha">
                            <div className="checkbox-container" >
                                <input 
                                    type="checkbox" 
                                    name="checkbox-lembrar" 
                                    className="checkbox"
                                    checked={rememberPassword}
                                    onChange={() => setRememberPassword(!rememberPassword)}
                                    />
                                <label>Lembrar-me</label>
                            </div>
                            <Link to="/app" className="link-forgot-password" >
                                Esqueci minha senha
                            </Link>
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit" onClick={e => handleSubmit(e)}>
                        Entrar
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Login;