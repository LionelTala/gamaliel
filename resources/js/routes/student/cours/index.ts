import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import lesson from './lesson'
/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/cours',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
export const show = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/cours/{cours}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
show.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return show.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
show.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
show.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
const showForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
showForm.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
showForm.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
export const view = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: view.url(args, options),
    method: 'post',
})

view.definition = {
    methods: ["post"],
    url: '/student/cours/{cours}/view',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
view.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return view.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
view.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: view.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
const viewForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: view.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
viewForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: view.url(args, options),
    method: 'post',
})

view.form = viewForm

const cours = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    lesson: Object.assign(lesson, lesson),
    view: Object.assign(view, view),
}

export default cours