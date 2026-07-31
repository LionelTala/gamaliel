import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DevoirController::corriger
* @see app/Http/Controllers/Admin/DevoirController.php:680
* @route '/admin/soumissions/{soumission}/corriger'
*/
export const corriger = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: corriger.url(args, options),
    method: 'post',
})

corriger.definition = {
    methods: ["post"],
    url: '/admin/soumissions/{soumission}/corriger',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::corriger
* @see app/Http/Controllers/Admin/DevoirController.php:680
* @route '/admin/soumissions/{soumission}/corriger'
*/
corriger.url = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { soumission: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { soumission: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            soumission: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        soumission: typeof args.soumission === 'object'
        ? args.soumission.id
        : args.soumission,
    }

    return corriger.definition.url
            .replace('{soumission}', parsedArgs.soumission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::corriger
* @see app/Http/Controllers/Admin/DevoirController.php:680
* @route '/admin/soumissions/{soumission}/corriger'
*/
corriger.post = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: corriger.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::corriger
* @see app/Http/Controllers/Admin/DevoirController.php:680
* @route '/admin/soumissions/{soumission}/corriger'
*/
const corrigerForm = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: corriger.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::corriger
* @see app/Http/Controllers/Admin/DevoirController.php:680
* @route '/admin/soumissions/{soumission}/corriger'
*/
corrigerForm.post = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: corriger.url(args, options),
    method: 'post',
})

corriger.form = corrigerForm

const soumissions = {
    corriger: Object.assign(corriger, corriger),
}

export default soumissions