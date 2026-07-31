import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
export const bibliotheque = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bibliotheque.url(options),
    method: 'get',
})

bibliotheque.definition = {
    methods: ["get","head"],
    url: '/bibliotheque',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
bibliotheque.url = (options?: RouteQueryOptions) => {
    return bibliotheque.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
bibliotheque.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bibliotheque.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
bibliotheque.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bibliotheque.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
const bibliothequeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: bibliotheque.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
bibliothequeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: bibliotheque.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\BibliothequeController::bibliotheque
* @see app/Http/Controllers/Public/BibliothequeController.php:12
* @route '/bibliotheque'
*/
bibliothequeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: bibliotheque.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

bibliotheque.form = bibliothequeForm

const publicMethod = {
    bibliotheque: Object.assign(bibliotheque, bibliotheque),
}

export default publicMethod