import { db } from '../../firebase/config'

import React from 'react'
import styles from './Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
    
    const [displayName, setDisplayName]= useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 
    const [confirPassword, setConfirmPassword] = useState(""); 
    const [error, setError] = useState("");

    const {createUser, error: AuthError, loading} = useAuthentication();

    const HandleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        const user = {
            displayName,
            email,
            password,
        }

        if(password !== confirPassword){
            setError("As senhas precisam ser iguais!!")
            return
        }

        const res = await createUser(user)

        console.log(user)
    }

    useEffect(()=>{
        if(AuthError){
            setError(AuthError)
        }
    })

 
  return (
    <div className={styles.register}>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuaria e compartilhe suas historias</p>

        <form onSubmit={HandleSubmit}>
            <label>
                <span>Nome: </span>
                <input type="text"
                name='displayName' 
                required
                placeholder='Nome de usuario'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
            <label>
                <span>E-mail: </span>
                <input type="email"
                name='email' 
                required
                placeholder='Email de cadastro'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha: </span>
                <input type="password"
                name='password' 
                required
                placeholder='insira a senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                <span>Confirme sua senha: </span>
                <input type="password"
                name='confirPassword' 
                required
                placeholder='Confirme sua senha'
                value={confirPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            {!loading && <button className='btn'>Cadastrar</button>}
            {loading && <button className='btn' disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Register