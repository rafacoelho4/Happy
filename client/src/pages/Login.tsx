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
    let id = '';

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

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            const data = {
                email, 
                senha,
                remember_me: rememberPassword
            };
            const response = await api.post('/auth', data).then(res => {
                console.log(res);
                id = res.data.user.id;
                console.log(id);
            })
        } catch (error) {
            console.log(error);
        }
        history.push(`/user/${id}`);
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

                    <button className="confirm-button" type="submit" onClick={handleSubmit}>
                        Entrar
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Login;