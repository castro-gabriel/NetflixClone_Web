import React, { useEffect, useState } from 'react';

import './App.css'
import Tmbd from './Tmdb';

import FeatureMovie from './components/FeatureMovie'
import MovieRow from './components/MovieRow'
import featureMovie from './components/FeatureMovie';

const App = () => {
    
    // Basicamente para salvar a lista de filmes
    const [movieList, setMovieList] = useState([])

    //
    const [featureData, setFeatureData] = useState(null)

    // Quando a tela for carregada, vai executar a função executada aqui
    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista total dos filmes
            let list = await Tmbd.getHomeList()
            setMovieList(list)

            // Só podemos pegar filme em destaque após pegar a lista
            // Pegando o Feature
            let originals = list.filter(i => i.slug === 'originals')
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
            let chosen = originals[0].items.results[randomChosen]
            let chosenInfo = await Tmbd.getMovieInfo(chosen.id, 'tv')
            
            setFeatureData(chosenInfo)
        }

        loadAll()
    }, []);
    
    return (
        <div className="page">

            {/* Não precisamos passar key porque não é um loop */}
            {featureData && 
                <FeatureMovie item={featureData} />
            }


            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    );
}

export default App 