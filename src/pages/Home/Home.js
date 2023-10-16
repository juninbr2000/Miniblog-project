import React from 'react'
import styles from './Home.module.css'

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetails from '../../components/PostDetails'



const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  
    if(query){
      return navigate(`/search?q=${query}`)
    }
  } 

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Busque tags aqui ...' onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetails key={post.id} post={post}/>)} 
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não forma encontrados posts</p>
            <Link to="/posts/create" className='btn'>Criar um post</Link>
        </div>
        )}
      </div>

    </div>
  )
}

export default Home