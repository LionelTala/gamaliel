import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/candidatures',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::index
* @see app/Http/Controllers/Admin/CandidatureController.php:21
* @route '/admin/candidatures'
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

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
export const show = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/candidatures/{candidature}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
show.url = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { candidature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            candidature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        candidature: typeof args.candidature === 'object'
        ? args.candidature.id
        : args.candidature,
    }

    return show.definition.url
            .replace('{candidature}', parsedArgs.candidature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
show.get = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
show.head = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
const showForm = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
showForm.get = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::show
* @see app/Http/Controllers/Admin/CandidatureController.php:108
* @route '/admin/candidatures/{candidature}'
*/
showForm.head = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\Admin\CandidatureController::accepter
* @see app/Http/Controllers/Admin/CandidatureController.php:197
* @route '/admin/candidatures/{candidature}/accepter'
*/
export const accepter = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accepter.url(args, options),
    method: 'post',
})

accepter.definition = {
    methods: ["post"],
    url: '/admin/candidatures/{candidature}/accepter',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CandidatureController::accepter
* @see app/Http/Controllers/Admin/CandidatureController.php:197
* @route '/admin/candidatures/{candidature}/accepter'
*/
accepter.url = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { candidature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            candidature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        candidature: typeof args.candidature === 'object'
        ? args.candidature.id
        : args.candidature,
    }

    return accepter.definition.url
            .replace('{candidature}', parsedArgs.candidature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CandidatureController::accepter
* @see app/Http/Controllers/Admin/CandidatureController.php:197
* @route '/admin/candidatures/{candidature}/accepter'
*/
accepter.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: accepter.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::accepter
* @see app/Http/Controllers/Admin/CandidatureController.php:197
* @route '/admin/candidatures/{candidature}/accepter'
*/
const accepterForm = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accepter.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::accepter
* @see app/Http/Controllers/Admin/CandidatureController.php:197
* @route '/admin/candidatures/{candidature}/accepter'
*/
accepterForm.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: accepter.url(args, options),
    method: 'post',
})

accepter.form = accepterForm

/**
* @see \App\Http\Controllers\Admin\CandidatureController::refuser
* @see app/Http/Controllers/Admin/CandidatureController.php:378
* @route '/admin/candidatures/{candidature}/refuser'
*/
export const refuser = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refuser.url(args, options),
    method: 'post',
})

refuser.definition = {
    methods: ["post"],
    url: '/admin/candidatures/{candidature}/refuser',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CandidatureController::refuser
* @see app/Http/Controllers/Admin/CandidatureController.php:378
* @route '/admin/candidatures/{candidature}/refuser'
*/
refuser.url = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { candidature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            candidature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        candidature: typeof args.candidature === 'object'
        ? args.candidature.id
        : args.candidature,
    }

    return refuser.definition.url
            .replace('{candidature}', parsedArgs.candidature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CandidatureController::refuser
* @see app/Http/Controllers/Admin/CandidatureController.php:378
* @route '/admin/candidatures/{candidature}/refuser'
*/
refuser.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refuser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::refuser
* @see app/Http/Controllers/Admin/CandidatureController.php:378
* @route '/admin/candidatures/{candidature}/refuser'
*/
const refuserForm = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refuser.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::refuser
* @see app/Http/Controllers/Admin/CandidatureController.php:378
* @route '/admin/candidatures/{candidature}/refuser'
*/
refuserForm.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: refuser.url(args, options),
    method: 'post',
})

refuser.form = refuserForm

/**
* @see \App\Http\Controllers\Admin\CandidatureController::enCours
* @see app/Http/Controllers/Admin/CandidatureController.php:413
* @route '/admin/candidatures/{candidature}/en-cours'
*/
export const enCours = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enCours.url(args, options),
    method: 'post',
})

enCours.definition = {
    methods: ["post"],
    url: '/admin/candidatures/{candidature}/en-cours',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CandidatureController::enCours
* @see app/Http/Controllers/Admin/CandidatureController.php:413
* @route '/admin/candidatures/{candidature}/en-cours'
*/
enCours.url = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { candidature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            candidature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        candidature: typeof args.candidature === 'object'
        ? args.candidature.id
        : args.candidature,
    }

    return enCours.definition.url
            .replace('{candidature}', parsedArgs.candidature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CandidatureController::enCours
* @see app/Http/Controllers/Admin/CandidatureController.php:413
* @route '/admin/candidatures/{candidature}/en-cours'
*/
enCours.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: enCours.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::enCours
* @see app/Http/Controllers/Admin/CandidatureController.php:413
* @route '/admin/candidatures/{candidature}/en-cours'
*/
const enCoursForm = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enCours.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::enCours
* @see app/Http/Controllers/Admin/CandidatureController.php:413
* @route '/admin/candidatures/{candidature}/en-cours'
*/
enCoursForm.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: enCours.url(args, options),
    method: 'post',
})

enCours.form = enCoursForm

/**
* @see \App\Http\Controllers\Admin\CandidatureController::attribuerVague
* @see app/Http/Controllers/Admin/CandidatureController.php:441
* @route '/admin/candidatures/{candidature}/attribuer-vague'
*/
export const attribuerVague = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attribuerVague.url(args, options),
    method: 'post',
})

attribuerVague.definition = {
    methods: ["post"],
    url: '/admin/candidatures/{candidature}/attribuer-vague',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CandidatureController::attribuerVague
* @see app/Http/Controllers/Admin/CandidatureController.php:441
* @route '/admin/candidatures/{candidature}/attribuer-vague'
*/
attribuerVague.url = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { candidature: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { candidature: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            candidature: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        candidature: typeof args.candidature === 'object'
        ? args.candidature.id
        : args.candidature,
    }

    return attribuerVague.definition.url
            .replace('{candidature}', parsedArgs.candidature.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CandidatureController::attribuerVague
* @see app/Http/Controllers/Admin/CandidatureController.php:441
* @route '/admin/candidatures/{candidature}/attribuer-vague'
*/
attribuerVague.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attribuerVague.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::attribuerVague
* @see app/Http/Controllers/Admin/CandidatureController.php:441
* @route '/admin/candidatures/{candidature}/attribuer-vague'
*/
const attribuerVagueForm = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attribuerVague.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CandidatureController::attribuerVague
* @see app/Http/Controllers/Admin/CandidatureController.php:441
* @route '/admin/candidatures/{candidature}/attribuer-vague'
*/
attribuerVagueForm.post = (args: { candidature: number | { id: number } } | [candidature: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attribuerVague.url(args, options),
    method: 'post',
})

attribuerVague.form = attribuerVagueForm

const candidatures = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    accepter: Object.assign(accepter, accepter),
    refuser: Object.assign(refuser, refuser),
    enCours: Object.assign(enCours, enCours),
    attribuerVague: Object.assign(attribuerVague, attribuerVague),
}

export default candidatures