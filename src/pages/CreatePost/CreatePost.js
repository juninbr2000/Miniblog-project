import styles from './CreatePost.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocuments'


const CreatePost = () => {
  
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument('posts')

  const navigate = useNavigate()

  const HandleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    //validate image URL
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL")
    }

    //Create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())


    // check all values

    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos.")
    }


    if(formError){
      return
    }

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //redirect home page
    navigate("/")

  }
  
  return (
    <div className={styles.create_post}>
        <h2>Criar Post</h2>
        <p>Escreva sobre o que quiser e compartilhe o  seu conhecimento!</p>

        <form onSubmit={HandleSubmit}>
          <label>
            <span>Titulo: </span>
            <input 
              type="text" 
              name='title' 
              required 
              placeholder='Digite o titulo'
              onChange={(e) => setTitle(e.target.value)}
              value={title}/>
          </label>
          <label>
            <span>URL da imagem: </span>
            <input 
              type="text" 
              name='image' 
              required
              placeholder='insira a uma imagem que represente o seu post'
              onChange={(e) => setImage(e.target.value)}
              value={image}/>
          </label>
          <label>
            <span>Conteudo:</span>
            <textarea name="body" required placeholder='Insira o conteudo do post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
          </label>
          <label>
            <span>Tags: </span>
            <input 
              type="text" 
              name='tags' 
              required
              placeholder='insira as tags separadas por virgula ","'
              onChange={(e) => setTags(e.target.value)}
              value={tags}/>
          </label>
            {!response.loading && <button className='btn'>Postar</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
        </form>
    </div>
  )
}

export default CreatePost