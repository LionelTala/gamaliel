import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import stats from './stats'
import users from './users'
import formations from './formations'
import certifications from './certifications'
import vagues from './vagues'
import candidatures from './candidatures'
import students from './students'
import cours from './cours'
import devoirs from './devoirs'
import soumissions from './soumissions'
import evaluations from './evaluations'
import soumissionsEvaluations from './soumissions-evaluations'
import galerie from './galerie'
import activites from './activites'
import bibliotheque from './bibliotheque'
import tranches from './tranches'
import paiements from './paiements'
import preInscriptions from './pre-inscriptions'
import lessons from './lessons'
import admin from './admin'
import video from './video'
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:18
 * @route '/admin/dashboard'
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
const adminNamespace = {
    stats: Object.assign(stats, stats),
dashboard: Object.assign(dashboard, dashboard),
users: Object.assign(users, users),
formations: Object.assign(formations, formations),
certifications: Object.assign(certifications, certifications),
vagues: Object.assign(vagues, vagues),
candidatures: Object.assign(candidatures, candidatures),
students: Object.assign(students, students),
cours: Object.assign(cours, cours),
devoirs: Object.assign(devoirs, devoirs),
soumissions: Object.assign(soumissions, soumissions),
evaluations: Object.assign(evaluations, evaluations),
soumissionsEvaluations: Object.assign(soumissionsEvaluations, soumissionsEvaluations),
galerie: Object.assign(galerie, galerie),
activites: Object.assign(activites, activites),
bibliotheque: Object.assign(bibliotheque, bibliotheque),
tranches: Object.assign(tranches, tranches),
paiements: Object.assign(paiements, paiements),
preInscriptions: Object.assign(preInscriptions, preInscriptions),
lessons: Object.assign(lessons, lessons),
admin: Object.assign(admin, admin),
video: Object.assign(video, video),
}

export default adminNamespace