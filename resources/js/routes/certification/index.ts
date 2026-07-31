import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
export const publicMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

publicMethod.definition = {
    methods: ["get","head"],
    url: '/certification',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
publicMethod.url = (options?: RouteQueryOptions) => {
    return publicMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
publicMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
publicMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
const publicMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
*/
publicMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CertificationController::publicMethod
* @see app/Http/Controllers/Public/CertificationController.php:11
* @route '/certification'
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

const certification = {
    public: Object.assign(publicMethod, publicMethod),
}

export default certification