import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::index
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
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
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
export const show = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/evaluations/{evaluation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
show.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return show.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
show.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
show.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
const showForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
showForm.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::show
* @see app/Http/Controllers/Student/EvaluationController.php:128
* @route '/student/evaluations/{evaluation}'
*/
showForm.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\EvaluationController::soumettre
* @see app/Http/Controllers/Student/EvaluationController.php:232
* @route '/student/evaluations/{evaluation}/soumettre'
*/
export const soumettre = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: soumettre.url(args, options),
    method: 'post',
})

soumettre.definition = {
    methods: ["post"],
    url: '/student/evaluations/{evaluation}/soumettre',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\EvaluationController::soumettre
* @see app/Http/Controllers/Student/EvaluationController.php:232
* @route '/student/evaluations/{evaluation}/soumettre'
*/
soumettre.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return soumettre.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\EvaluationController::soumettre
* @see app/Http/Controllers/Student/EvaluationController.php:232
* @route '/student/evaluations/{evaluation}/soumettre'
*/
soumettre.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: soumettre.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::soumettre
* @see app/Http/Controllers/Student/EvaluationController.php:232
* @route '/student/evaluations/{evaluation}/soumettre'
*/
const soumettreForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: soumettre.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::soumettre
* @see app/Http/Controllers/Student/EvaluationController.php:232
* @route '/student/evaluations/{evaluation}/soumettre'
*/
soumettreForm.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: soumettre.url(args, options),
    method: 'post',
})

soumettre.form = soumettreForm

const EvaluationController = { index, show, soumettre }

export default EvaluationController