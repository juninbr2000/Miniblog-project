import React from 'react'
import styles from './Login.module.css'


import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { Link } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 
  const [error, setError] = useState("");

  const { login, error: AuthError, loading } = useAuthentication();

  const HandleSubmit = async (e) => {
      e.preventDefault()

      setError("")

      const user = {
          email,
          password,
      }

      const res = await login(user)

      console.log(AuthError)
  }

  useEffect(()=>{
      if(AuthError){
          setError(AuthError)
      }
  })




  return (
    <div className={styles.login}>
        <h1>Entrar</h1>
        <p>Faça o login para fazer seus posts</p>

        <form onSubmit={HandleSubmit}>
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

            <p>Nao tem uma conta? <Link to="/register">cadastre-se</Link></p>
            {!loading && <button className='btn'>Entrar</button>}
            {loading && <button className='btn' disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login