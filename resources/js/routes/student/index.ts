import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import cours from './cours'
import devoirsFf4cb6 from './devoirs'
import evaluationsC33e2b from './evaluations'
/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/student/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DashboardController::dashboard
* @see app/Http/Controllers/Student/DashboardController.php:19
* @route '/student/dashboard'
*/
dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: dashboard.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

dashboard.form = dashboardForm

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
export const devoirs = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: devoirs.url(options),
    method: 'get',
})

devoirs.definition = {
    methods: ["get","head"],
    url: '/student/devoirs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
devoirs.url = (options?: RouteQueryOptions) => {
    return devoirs.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
devoirs.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: devoirs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
devoirs.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: devoirs.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
const devoirsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: devoirs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
devoirsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: devoirs.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\DevoirController::devoirs
* @see app/Http/Controllers/Student/DevoirController.php:21
* @route '/student/devoirs'
*/
devoirsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: devoirs.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

devoirs.form = devoirsForm

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
export const evaluations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evaluations.url(options),
    method: 'get',
})

evaluations.definition = {
    methods: ["get","head"],
    url: '/student/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
evaluations.url = (options?: RouteQueryOptions) => {
    return evaluations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
evaluations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: evaluations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
evaluations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: evaluations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
const evaluationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: evaluations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
evaluationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: evaluations.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\EvaluationController::evaluations
* @see app/Http/Controllers/Student/EvaluationController.php:21
* @route '/student/evaluations'
*/
evaluationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: evaluations.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

evaluations.form = evaluationsForm

const student = {
    dashboard: Object.assign(dashboard, dashboard),
    cours: Object.assign(cours, cours),
    devoirs: Object.assign(devoirs, devoirsFf4cb6),
    evaluations: Object.assign(evaluations, evaluationsC33e2b),
}

export default student