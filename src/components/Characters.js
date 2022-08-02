// Traditional method for fetching data 

// import React, { useState, useEffect } from 'react'

// function Characters() {

//     const [characters, setCharacters] = useState([])

//     const fetchCharacters = async () => {
//         const response = await fetch('https://rickandmortyapi.com/api/character')
//         const data = await response.json() 
//         console.log(data);
//         setCharacters(data.results);
//     }

//     useEffect(() => {
//         fetchCharacters();
//     })
//   return (
//     <div>
//     {characters.map((character) => (
//         <div>{character.name}</div>
//     ))}
//     </div>
//   )
// }

// export default Characters

// Use of React Query to fetch the data

import React, { useState } from 'react'
import {useQuery} from 'react-query'
import Character from './Character';

function Characters() {

const [page, setPage] = useState(1)
    const fetchCharacters = async ({queryKey}) => {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`)
        return response.json();

    }

    const { data, isPreviousData, isLoading, isError} = useQuery(['characters', page], fetchCharacters, {
        keepPreviousData: true,
    })

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error</div>
    }
    
  
  return (
    <div className='characters'>
        {data.results.map((character) => (
            <Character character={character} />
        ))}
        <div>
            <button disabled={page === 1} 
            onClick={() => setPage((old) => old - 1)}
            >Previous</button>
            <button disabled={isPreviousData && !data.info.next}  onClick={() => setPage((old) => old + 1)}>Next</button>
            
        </div>
    </div>
  )
}

export default Characters