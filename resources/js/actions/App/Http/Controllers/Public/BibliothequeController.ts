import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/bibliotheque',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::index
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
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

const BibliothequeController = { index }

export default BibliothequeController