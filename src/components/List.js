import React, {useContext, useState, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

const List = () => {
    const {movies, deleteMovie,  changeInputs, sortMovie} = useContext(GlobalContext)
    const [filteredMovies, setFilteredMovies] = useState(movies)
    const [query, setQuery] = useState('')
    const [filterBy, setFilterBy] = useState('title')
    const [showFilter, setShowFilter] = useState(false)

    const [sortBy, setSortBy] = useState('date')
    const [sortOrder, setSortOrder] = useState('asc')
    const [showSort, setShowSort] = useState(false)
    
    useEffect(() => {
        setFilteredMovies(movies)
    }, [movies])

    const handleEdit = (movie) =>{
        changeInputs(movie)
    }

    const handleDelete = (id) =>{
        deleteMovie(id)
    }

    const handleFilter = (value) =>{
        setQuery(value)
        let filteredValues = {}
        if(value === ''){
            setFilteredMovies(movies)
            return;
        }
        if(filterBy === 'director'){
            filteredValues = movies.filter(movie => movie.director.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }else{
            filteredValues = movies.filter(movie => movie.title.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }
        setFilteredMovies(filteredValues)
    }

    
    const handleCloseFilter = () => {
        setShowFilter(!showFilter)
        setFilteredMovies(movies)
        setQuery('')
        
    }
    const handleSort = () => {
        const order = {order: sortOrder}
        sortMovie(order)
    }
    const handleCloseSort = () => {
        setShowSort(!showSort)
        setFilteredMovies(movies)
        setSortOrder('asc')
    }
    return (
        <div>
            <h2>Movies</h2>
            <hr />
            {showFilter ? (
                <>
                    <div className='row' >
                        <div className='col-md-2 col-sm-12'>
                            <div className='lead'>Filter by:</div>
                        </div>
                        <div className='col-md col-sm-12'>
                            <div className='form-group'>
                                <select value={filterBy} onChange={e => setFilterBy(e.target.value)} className='form-control'>
                                    <option value='title'>Title</option>
                                    <option value='director'>Director</option>
                                </select>

                            </div>
                        </div>
                        <div className='col-md col-sm-12'>
                            <form>
                                <div className='form-group'>
                                    <input className='form-control' value={query} onChange={e => handleFilter(e.target.value)} placeholder='Search...' />
                                </div>
                            </form>                    
                        </div>
                        <div className='col-md col-sm-12'>
                            <button className='btn btn-danger btn-sm' onClick={e => handleCloseFilter()}>Close</button>
                        </div>
                    </div>
                    <hr />
                </>
            )   :
                <button className='btn btn-primary btn-sm float-right' onClick={e => setShowFilter(!showFilter)}>Filter</button>

            }|
            {showSort ? (
                <>
                    <div className='row' >
                        <div className='col-md-2 col-sm-12'>
                            <div className='lead'>Sort by:</div>
                        </div>
                        <div className='col-md col-sm-12'>
                            <div className='form-group'>
                                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className='form-control'>
                                    <option value='date'>Date</option>
                                </select>

                            </div>
                        </div>
                        <div className='col-md col-sm-12'>
                            <form>
                                <div className='form-group'>
                                    <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className='form-control'>
                                        <option value='asc'>ASCENDING</option>
                                        <option value='desc'>DECENDING</option>
                                    </select>
                                </div>
                            </form>                    
                        </div>
                        <div className='col-md-1 col-sm-12'>
                            <button className='btn btn-success btn-sm' onClick={e => handleSort()}>Sort</button>
                        </div>
                        <div className='col-md-1 col-sm-12'>
                            <button className='btn btn-danger btn-sm' onClick={e => handleCloseSort()}>Close</button>
                        </div>
                    </div>
                    <hr />                 
                </>
            )   :
            <button className='btn btn-secondary btn-sm float-warning' onClick={e => setShowSort(!showSort)}>Sort</button>
            }
                           
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
                    {filteredMovies && filteredMovies.map((movie,index) =>(
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
