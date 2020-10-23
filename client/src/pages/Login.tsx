import React, { FormEvent, SyntheticEvent, useState } from 'react';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import icon from '../images/columnLogo.svg';
import '../styles/pages/login.css';
import api from '../services/api';

const Login = () => {
    const history = useHistory();

    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ rememberPassword, setRememberPassword ] = useState(false);

    const [ openSenha, setOpenSenha ] = useState(false);

    const [errorStatus, setErrorStatus] = useState('');

    let id = '';
    let token = '';

    function handleEmail(e: any) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    function handleSenha(e: any) {
        e.preventDefault();
        setSenha(e.target.value);
    }

    function testEmail (email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (email == '') {
            setErrorStatus('412');
            return;
        } else if (senha == '') {
            setErrorStatus('411');
            return;
        }
        const validate = testEmail(email);
        if(!validate) {
            setErrorStatus('417');
            return;
        }
        try {
            await api.post('/auth', {
                email,
                senha,
                remember_me: rememberPassword
            }).then(async res => {
                // console.log(res);
                id = res.data.id;
                token = res.data.token;
                localStorage.setItem('@token', token);
                localStorage.setItem('@user_id', id);
                token = '';
                history.push(`/user/${id}`);
                id = '';
            });
        } catch (error) {
            let split = error.message.split(' ');
            let status = split[5];
            setErrorStatus(status);
            if(status === '404') {
                // alert('Nome de usuário não encontrado. Tente novamente.')
            } else if (status === '400') {
                // alert('Senha inválida. Tente novamente.')
            } else {
                // console.log(error);
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
                            <label htmlFor="email">E-mail
                                {
                                    errorStatus == '404' ? <span className="error-msg">Email inválido</span> : ''
                                }
                                {
                                    errorStatus == '412' ? <span className="error-msg">Campo vazio</span> : ''
                                }
                                {
                                    errorStatus == '417' ? <span className="error-msg">Email não existe</span> : ''
                                }
                            </label>
                            <input 
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmail}
                                required={true}
                                className={errorStatus == '404' || errorStatus === '412' || errorStatus === '417' ? 'error' : ''}
                                />
                        </div>
                        <div className="input-block senha">
                            <label htmlFor="senha">Senha
                                {
                                    errorStatus == '400' ? <span className="error-msg">Senha incorreta</span> : ''
                                }
                                {
                                    errorStatus == '411' ? <span className="error-msg">Campo vazio</span> : ''
                                }
                            </label>
                            <input 
                                id="senha"
                                type={openSenha ? "text" : "password"}
                                value={senha}
                                onChange={handleSenha}
                                required={true}
                                className={errorStatus == '400' || errorStatus === '411' ? 'error' : ''}
                                />
                            {
                                !openSenha ? 
                                <FiEye 
                                    size={22} 
                                    className="eye-senha"
                                    onClick={() => setOpenSenha(!openSenha)}
                                /> : 
                                <FiEyeOff 
                                    size={22} 
                                    className="eye-senha"
                                    onClick={() => setOpenSenha(!openSenha)}
                                />
                            }
                        </div>
                        <div className="input-block lembrar-senha">
                            <div className="checkbox-container" >
                                <input 
                                    type="checkbox" 
                                    name="checkbox-lembrar"
                                    id="checkbox"
                                    className="checkbox"
                                    checked={rememberPassword}
                                    onChange={() => setRememberPassword(!rememberPassword)}
                                    />
                                <label htmlFor="checkbox" >Lembrar-me</label>
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