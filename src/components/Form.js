import React, {useState,useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'



const Form = () => {
    const {addMovie, inputs, editMovie} = useContext(GlobalContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [director, setDirector] = useState('')
    const [movieId, setMovieId] = useState(0)
    const [releasedDt, setReleasedDt] = useState('')

    useEffect(() => {
        setTitle(inputs.title)
        setDescription(inputs.description)
        setDirector(inputs.director)
        setReleasedDt(inputs.released_dt)   
        setMovieId(inputs.id)   
        

    }, [inputs])

    const handleAddNew = (e) =>{
        e.preventDefault();
        const fd = new FormData()
        fd.append('title', title)
        fd.append('description', description)
        fd.append('director', director)
        fd.append('released_dt', releasedDt)
        addMovie(fd)
        clearInputs()
    }
    const handleUpdate = (e) =>{
        e.preventDefault();
        const movie = {
            'title': title,
            'description': description,
            'director': director,
            'released_dt': releasedDt,
            'id': movieId,
        }
        editMovie(movie)
        clearInputs()
    }    
    
    const clearInputs = () =>{
        setTitle('')
        setDescription('')
        setDirector('')
        setReleasedDt('')
        setMovieId(0)
    }
    return (
        <div className='card shadow'>
            <div className='card-body'>
                <form onSubmit={e => movieId > 0 ? handleUpdate(e) : handleAddNew(e)}>
                    <legend>{movieId > 0 ? 'Update' : 'Add'} new movie</legend>
                    <div className='form-group'>
                        <label htmlFor='title'>Title: </label>
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='Title here' 
                            value={title} 
                            onChange={e=>setTitle(e.target.value)} 
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description:</label>
                        <textarea 
                            className='form-control' 
                            rows="5" 
                            placeholder='Description'
                            value={description}
                            onChange={e=> setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='director'>Director:</label>
                        <input 
                            type="text" 
                            className='form-control' 
                            placeholder='Director' 
                            value={director}
                            onChange={e=>setDirector(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='release_dt'>Release Date:</label>
                        <input 
                            type="date" 
                            className='form-control' 
                            value={releasedDt}
                            onChange={e=>setReleasedDt(e.target.value)}
                            required
                        />
                    </div>
                    <p></p>
                    {movieId > 0 ? (
                        <>
                            <button className='btn btn-secondary'>Update</button>
                            <button className='btn btn-danger' onClick={e => clearInputs()}>Cancel</button>
                        </>
                    ) : (
                        <button className='btn btn-primary'>Save</button>
                    )} 
                    
                </form>
            </div>
        </div>
    )
}

export default Form
