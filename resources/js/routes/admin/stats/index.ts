import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
export const visites = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: visites.url(options),
    method: 'get',
})

visites.definition = {
    methods: ["get","head"],
    url: '/admin/stats-visites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
visites.url = (options?: RouteQueryOptions) => {
    return visites.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
visites.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: visites.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
visites.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: visites.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
const visitesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: visites.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
visitesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: visites.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VisitStatsController::visites
* @see app/Http/Controllers/Admin/VisitStatsController.php:19
* @route '/admin/stats-visites'
*/
visitesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: visites.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

visites.form = visitesForm

const stats = {
    visites: Object.assign(visites, visites),
}

export default stats