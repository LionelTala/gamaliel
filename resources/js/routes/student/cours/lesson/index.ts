import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
export const show = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/cours/lesson/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
show.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return show.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
show.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
show.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
const showForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
export const view = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: view.url(args, options),
    method: 'post',
})

view.definition = {
    methods: ["post"],
    url: '/student/cours/lesson/{lesson}/view',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
view.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return view.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
view.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: view.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
const viewForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: view.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::view
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
viewForm.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: view.url(args, options),
    method: 'post',
})

view.form = viewForm

const lesson = {
    show: Object.assign(show, show),
    view: Object.assign(view, view),
}

export default lesson