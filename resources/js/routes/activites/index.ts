import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
export const publicMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

publicMethod.definition = {
    methods: ["get","head"],
    url: '/activites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
publicMethod.url = (options?: RouteQueryOptions) => {
    return publicMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
publicMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
publicMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
const publicMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
publicMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\ActiviteController::publicMethod
* @see app/Http/Controllers/Public/ActiviteController.php:11
* @route '/activites'
*/
publicMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

publicMethod.form = publicMethodForm

const activites = {
    public: Object.assign(publicMethod, publicMethod),
}

export default activites