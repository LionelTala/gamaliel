import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
export const publicMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

publicMethod.definition = {
    methods: ["get","head"],
    url: '/formations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
publicMethod.url = (options?: RouteQueryOptions) => {
    return publicMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
publicMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
publicMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: publicMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
const publicMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
publicMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: publicMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\FormationController::publicMethod
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
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

const formations = {
    public: Object.assign(publicMethod, publicMethod),
}

export default formations