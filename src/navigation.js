import selectPage from './helpers/selectPage';

const slide = {
    '/categories': 'slideone',
    '/new-category': 'slideone',
    '/signin': 'slidezero',
    '/': "slideone"
}

const navigate = (props, route) => {
    props.history.push(route)
    selectPage(slide[route])
}

export default {
    categories: props => navigate(props, '/categories'),
    newCategory: props => navigate(props, '/new-category'),
    signOut: props => navigate(props, '/signin'),
    dashboard: props => navigate(props, '/')
}