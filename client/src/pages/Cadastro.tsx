import React, { useState } from 'react';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import icon from '../images/columnLogo.svg';
import '../styles/pages/cadastro.css';
import api from '../services/api';

const Cadastro = () => {
    const history = useHistory();

    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ confirmSenha, setConfirmSenha ] = useState('');
    const [ rememberPassword, setRememberPassword ] = useState(false);

    const [ openSenha, setOpenSenha ] = useState(false);
    const [ openConfirmSenha, setOpenConfirmSenha ] = useState(false);

    const [ errorStatus, setErrorStatus ] = useState('');

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

    function handleConfirmSenha(e: any) {
        e.preventDefault();
        setConfirmSenha(e.target.value);
    }

    function showPassword(e: any) {
        e.preventDefault();
    }

    function testEmail (email: string) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        // if (email === '') {
        //     setErrorStatus('412');
        //     return;
        // } else if (senha === '') {
        //     setErrorStatus('411');
        //     return;
        if (senha.length < 4) {
            setErrorStatus('416');
            return;
        } else if (senha.length > 16) {
            setErrorStatus('413');
            return;
        } else if (senha !== confirmSenha) {
            setErrorStatus('409');
            return;
        }
        const validate = testEmail(email);
        if(!validate) {
            setErrorStatus('417');
            return;
        }
        try {
            await api.post('/users', {
                email,
                senha
            }).then(async res => {
                console.log(res);
                id = res.data.id;
                token = res.data.token;
                localStorage.setItem('@token', token);
                localStorage.setItem('@user_id', id);
                token = '';
                history.push(`/user/${id}`);
                id = '';
            });
        } catch (error) {
            // console.log(error);
            let split = error.message.split(' ');
            let status = split[5];
            setErrorStatus(status);
            if(status === '406') {
                // alert('Nome de usuário não encontrado. Tente novamente.')
            } else if (status === '409') {
                // alert('Senha inválida. Tente novamente.')
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
                        <legend>Criar uma conta</legend>
                        <div className="input-block">
                            <label htmlFor="email">E-mail
                                {
                                    errorStatus == '406' ? <span className="error-msg">Email já está cadastrado</span> : ''
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
                                className={errorStatus == '406' || errorStatus === '412' || errorStatus === '417' ? 'error' : ''}
                                />
                        </div>
                        <div className="input-block senha">
                            <label htmlFor="senha">Senha
                                {
                                    errorStatus == '409' ? <span className="error-msg">Esses campos são diferentes</span> : ''
                                }
                                {
                                    errorStatus == '411' ? <span className="error-msg">Campo vazio</span> : ''
                                }
                                {
                                    errorStatus == '416' ? <span className="error-msg">Senha muito curta</span> : ''
                                }
                                {
                                    errorStatus == '413' ? <span className="error-msg">Senha grande demais</span> : ''
                                }
                            </label>
                            <input 
                                id="senha"
                                type={openSenha ? "text" : "password"}
                                value={senha}
                                onChange={handleSenha}
                                className={
                                    errorStatus === '409' || 
                                    errorStatus === '411' ||
                                    errorStatus === '416' || 
                                    errorStatus === '413' ? 'error' : ''}
                            />
                            <span className="senha-tip">De 4 a 16 caracteres</span>
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
                        <div className="input-block senha">
                            <label htmlFor="confirm-senha">Confirmar senha
                                {
                                    errorStatus == '409' ? <span className="error-msg">Esses campos são diferentes</span> : ''
                                }
                            </label>
                            <input
                                id="confirm-senha"
                                type={openConfirmSenha ? "text" : "password"}
                                value={confirmSenha}
                                onChange={handleConfirmSenha}
                                className={errorStatus == '409' ? 'error' : ''}
                            />
                            {
                                !openConfirmSenha ? 
                                <FiEye 
                                    size={22} 
                                    className="eye-senha"
                                    onClick={() => setOpenConfirmSenha(!openConfirmSenha)}
                                /> : 
                                <FiEyeOff 
                                    size={22} 
                                    className="eye-senha"
                                    onClick={() => setOpenConfirmSenha(!openConfirmSenha)}
                                />
                            }
                        </div>
                    </fieldset>

                    <button className="confirm-button" type="submit" onClick={e => handleSubmit(e)}>
                        Registrar
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Cadastro;