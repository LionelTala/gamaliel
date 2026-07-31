import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/certification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::index
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
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

const CertificationController = { index }

export default CertificationController