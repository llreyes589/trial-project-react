import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

const List = () => {
    const {movies, deleteMovie,  changeInputs} = useContext(GlobalContext)

    const handleEdit = (movie) =>{
        changeInputs(movie)
    }

    const handleDelete = (id) =>{
        deleteMovie(id)
    }
    return (
        <div>
            <h2>Movies</h2>
            <hr />
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Director</td>
                        <td>Released Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {movies && movies.map((movie,index) =>(
                        <tr key={index}>
                            <td>{movie.title}</td>
                            <td>{movie.director}</td>
                            <td>{movie.released_dt}</td>
                            <td>
                                <button className='btn btn-primary' onClick={e => handleEdit(movie)}>Edit</button>
                                <button className='btn btn-danger' onClick={e => handleDelete(movie.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List
