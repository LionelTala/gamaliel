import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
export const publicMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

publicMethod.definition = {
    methods: ["get","head"],
    url: '/galerie',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
publicMethod.url = (options?: RouteQueryOptions) => {
    return publicMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
publicMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
publicMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
const publicMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
publicMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::publicMethod
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
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

const galerie = {
    public: Object.assign(publicMethod, publicMethod),
}

export default galerie