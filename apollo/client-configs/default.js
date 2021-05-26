
export default ({req, app}) => {
    return {
        httpEndpoint: process.env.NODE_ENV === 'dev'
        ? 'http://localhost:1337/graphql'
        : 'https://fathomless-forest-54888.herokuapp.com/graphql',
    }
}

