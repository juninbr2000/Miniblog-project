import styles from './EditPost.module.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useFetchDocument } from '../../hooks/useFetchDocument'


const EditPost = () => {
  const { id } = useParams()  
  const { document: post } = useFetchDocument("posts", id)
  
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  useEffect(() => {
    if(post) {
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)

        const textTags = post.tagsArray.join(", ")

        setTags(textTags)
    }
  }, [post])

  const {user} = useAuthValue()

  const { updateDocument, response} = useUpdateDocument('posts')

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

    const data = {
        title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName
    }

    updateDocument(id, data)

    //redirect home page
    navigate("/dashboard")

  }
  
  return (
    <div className={styles.edit_post}>
       {post && (
        <>
             <h2>Edite post sobre: {post.title}</h2>
        <p>Altere os dados do seu post como quiser</p>

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
          <p className={styles.preview_title}>preview da imagem atual:</p>
          <img className={styles.img_preview} src={post.image} alt={post.title} />
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
            {!response.loading && <button className='btn'>Editar</button>}
            {response.loading && <button className='btn' disabled>Aguarde...</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
        </form>
        </>
       )}
    </div>
  )
}

export default EditPost