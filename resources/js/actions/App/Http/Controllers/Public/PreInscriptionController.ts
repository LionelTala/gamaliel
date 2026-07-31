import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\PreInscriptionController::store
* @see app/Http/Controllers/Public/PreInscriptionController.php:16
* @route '/pre-inscription'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/pre-inscription',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Public\PreInscriptionController::store
* @see app/Http/Controllers/Public/PreInscriptionController.php:16
* @route '/pre-inscription'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\PreInscriptionController::store
* @see app/Http/Controllers/Public/PreInscriptionController.php:16
* @route '/pre-inscription'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Public\PreInscriptionController::store
* @see app/Http/Controllers/Public/PreInscriptionController.php:16
* @route '/pre-inscription'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Public\PreInscriptionController::store
* @see app/Http/Controllers/Public/PreInscriptionController.php:16
* @route '/pre-inscription'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const PreInscriptionController = { store }

export default PreInscriptionController