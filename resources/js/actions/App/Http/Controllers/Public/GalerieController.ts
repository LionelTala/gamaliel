import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/galerie',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\GalerieController::index
* @see app/Http/Controllers/Public/GalerieController.php:12
* @route '/galerie'
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

const GalerieController = { index }

export default GalerieController