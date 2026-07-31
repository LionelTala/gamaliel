import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/formations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\FormationController::index
* @see app/Http/Controllers/Public/FormationController.php:12
* @route '/formations'
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

const FormationController = { index }

export default FormationController