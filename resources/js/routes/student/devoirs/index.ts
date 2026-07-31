import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
export const show = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/devoirs/{devoir}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
show.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return show.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
show.get = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
show.head = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
const showForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
showForm.get = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::show
* @see app/Http/Controllers/Student/DevoirController.php:133
* @route '/student/devoirs/{devoir}'
*/
showForm.head = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\DevoirController::soumettre
* @see app/Http/Controllers/Student/DevoirController.php:240
* @route '/student/devoirs/{devoir}/soumettre'
*/
export const soumettre = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: soumettre.url(args, options),
    method: 'post',
})

soumettre.definition = {
    methods: ["post"],
    url: '/student/devoirs/{devoir}/soumettre',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\DevoirController::soumettre
* @see app/Http/Controllers/Student/DevoirController.php:240
* @route '/student/devoirs/{devoir}/soumettre'
*/
soumettre.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return soumettre.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DevoirController::soumettre
* @see app/Http/Controllers/Student/DevoirController.php:240
* @route '/student/devoirs/{devoir}/soumettre'
*/
soumettre.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: soumettre.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::soumettre
* @see app/Http/Controllers/Student/DevoirController.php:240
* @route '/student/devoirs/{devoir}/soumettre'
*/
const soumettreForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: soumettre.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::soumettre
* @see app/Http/Controllers/Student/DevoirController.php:240
* @route '/student/devoirs/{devoir}/soumettre'
*/
soumettreForm.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: soumettre.url(args, options),
    method: 'post',
})

soumettre.form = soumettreForm

const devoirs = {
    show: Object.assign(show, show),
    soumettre: Object.assign(soumettre, soumettre),
}

export default devoirs