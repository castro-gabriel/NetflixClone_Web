import React, { useEffect, useState } from 'react';

import './App.css'
import Tmbd from './Tmdb';

import Header from './components/Header/Header'
import FeatureMovie from './components/FeatureMovie/FeatureMovie'
import MovieRow from './components/MovieRow/MovieRow'

const App = () => {
    
    // Basicamente para salvar a lista de filmes
    const [movieList, setMovieList] = useState([])

    // Para manipular as informacoes 
    const [featureData, setFeatureData] = useState(null)

    const [blackHeader, setBlackHeader] = useState(false)

    // Quando a tela for carregada, vai executar a função executada aqui
    useEffect(() => {
        const loadAll = async () => {
            // Pegando a lista total dos filmes
            let list = await Tmbd.getHomeList()
            setMovieList(list)

            // Só podemos pegar filme em destaque após pegar a lista
            // Pegando o Feature
            let originals = list.filter(i => i.slug === 'originals') // pegando originals
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)) // pegando um aleatorio dos originals
            let chosen = originals[0].items.results[randomChosen] // pegando um dos aleatorios
            let chosenInfo = await Tmbd.getMovieInfo(chosen.id, 'tv') // pegando informacoes do escolhido
            
            setFeatureData(chosenInfo)
        }

        loadAll()
    }, []);

    // Evento de monitoramento da pagina, para sabermos quando dar scroll
    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true)
            }else{
                setBlackHeader(false)
            }
        }

        // Vai adicionar o evento no scroll
        window.addEventListener('scroll', scrollListener)

        // Vai remover o evento
        return () => {
            window.removeEventListener('scroll', scrollListener)
        }
    })
    
    return (
        <div className="page">

            <Header black={blackHeader}/> 

            {/* Não precisamos passar key porque não é um loop */}
            {featureData && 
                <FeatureMovie item={featureData} />
            }


            <section className="lists">
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer>
                Feito por Gabriel S. Castro - <span role="img" aria-label="coracao"><a href="https://www.linkedin.com/in/gabrielsouzacastro/">LinkedIn</a></span><br />
                Direitos de imagem para Netflix<br /> 
                Dados pegos do site themoviedb.org
            </footer>

            {movieList.length <= 0 &&
                <div className="loading">
                        <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando"/>
                </div>
            }

        </div>
    );
}

export default App 