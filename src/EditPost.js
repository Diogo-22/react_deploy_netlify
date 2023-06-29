import React from 'react'
import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions} from 'easy-peasy'
import format from 'date-fns/format'

const EditPost = () => {
    const { id } = useParams();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id)

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody };
        editPost(updatedPost);
    }

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
    const navigate = useNavigate()
  return (
    <main className='NewPost'>
        {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='postTitle'>Title:</label>
                <input 
                id='postTitle'
                type="text" 
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea id="postBody" value={editBody} required onChange={(e) => setEditBody(e.target.value)}>

                </textarea>
                <button type='submit' onClick={() => {
                        handleEdit(post.id)
                        navigate(`/post/${id}`)
                }
                }>Save</button>
                </form>
                </>
} 
{!editTitle &&
<>
    <h2>Post Not Fouund</h2>
    <p>Well, that's disappointing.</p>
    <p>
        <Link to='/'>Visit Our Homepage</Link>
    </p>
</>
}
    </main>

  )
}

export default EditPost