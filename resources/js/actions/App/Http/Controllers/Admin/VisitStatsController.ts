import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/stats-visites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::index
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
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

const VisitStatsController = { index }

export default VisitStatsController