import React, { useEffect, useState } from 'react';
import Tmbd from './Tmdb';

import MovieRow from './components/MovieRow'

const App = () => {
    
    // Basicamente para salvar a lista de filmes
    const [movieList, setMovieList] = useState([])


    // Quando a tela for carregada, vai executar a função executada aqui
    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista total dos filmes
            let list = await Tmbd.getHomeList()
            setMovieList(list)
        }

        loadAll()
    }, []);
    
    return (
        <div className="page">
            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    );
}

export default App 