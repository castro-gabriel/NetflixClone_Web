// Informações importantes para a requisição das informações >>>>>>>>>>>>
const API_KEY = 'f779fc0eaab43f65ae493c08c987c27b'
const API_BASE = 'https://api.themoviedb.org/3'

// Função que vai realizar a requisição >>>>>>>>>>>>
const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`)
    //Pegando o json da requisicao >>>>>>>>>>>
    const json = await req.json()

    return json
}

// Lista de todos os itens que irei utilizar >>>>>>>>>>
const Tmdb = {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais da Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&api_key=${API_KEY}`)
            }
        ];
    },

    // Pegar informacoes de um filme especifico
    getMovieInfo: async (movieID, type) => {
        let info = {}

        if(movieID) {
            switch(type){
                case 'movie':
                    info = await basicFetch(`/movie/${movieID}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieID}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default:
                break;
            }
        }

        return info
    }



}

export default Tmdb