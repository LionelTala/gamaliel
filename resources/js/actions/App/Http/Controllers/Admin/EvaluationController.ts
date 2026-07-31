import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
export const getVaguesByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'get',
})

getVaguesByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
getVaguesByFormation.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            formationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formationId: args.formationId,
    }

    return getVaguesByFormation.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
getVaguesByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
getVaguesByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
const getVaguesByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
getVaguesByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getVaguesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:106
* @route '/admin/evaluations/vagues/{formationId}'
*/
getVaguesByFormationForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getVaguesByFormation.form = getVaguesByFormationForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
export const getCertificationsByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'get',
})

getCertificationsByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
getCertificationsByFormation.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            formationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formationId: args.formationId,
    }

    return getCertificationsByFormation.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
getCertificationsByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
getCertificationsByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
const getCertificationsByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
getCertificationsByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:124
* @route '/admin/evaluations/certifications/{formationId}'
*/
getCertificationsByFormationForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getCertificationsByFormation.form = getCertificationsByFormationForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
export const getStudentsByCertification = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'get',
})

getStudentsByCertification.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/students-by-certification/{certificationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
getStudentsByCertification.url = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            certificationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        certificationId: args.certificationId,
    }

    return getStudentsByCertification.definition.url
            .replace('{certificationId}', parsedArgs.certificationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
getStudentsByCertification.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
getStudentsByCertification.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
const getStudentsByCertificationForm = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
getStudentsByCertificationForm.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getStudentsByCertification
* @see app/Http/Controllers/Admin/EvaluationController.php:141
* @route '/admin/evaluations/students-by-certification/{certificationId}'
*/
getStudentsByCertificationForm.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getStudentsByCertification.form = getStudentsByCertificationForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
export const getTranchesByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTranchesByFormation.url(args, options),
    method: 'get',
})

getTranchesByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/tranches/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
getTranchesByFormation.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formationId: args }
    }

    if (Array.isArray(args)) {
        args = {
            formationId: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formationId: args.formationId,
    }

    return getTranchesByFormation.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
getTranchesByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTranchesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
getTranchesByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTranchesByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
const getTranchesByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTranchesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
getTranchesByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTranchesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::getTranchesByFormation
* @see app/Http/Controllers/Admin/EvaluationController.php:158
* @route '/admin/evaluations/tranches/{formationId}'
*/
getTranchesByFormationForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTranchesByFormation.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getTranchesByFormation.form = getTranchesByFormationForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::index
* @see app/Http/Controllers/Admin/EvaluationController.php:24
* @route '/admin/evaluations'
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
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::create
* @see app/Http/Controllers/Admin/EvaluationController.php:88
* @route '/admin/evaluations/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::store
* @see app/Http/Controllers/Admin/EvaluationController.php:180
* @route '/admin/evaluations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/evaluations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::store
* @see app/Http/Controllers/Admin/EvaluationController.php:180
* @route '/admin/evaluations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::store
* @see app/Http/Controllers/Admin/EvaluationController.php:180
* @route '/admin/evaluations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::store
* @see app/Http/Controllers/Admin/EvaluationController.php:180
* @route '/admin/evaluations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::store
* @see app/Http/Controllers/Admin/EvaluationController.php:180
* @route '/admin/evaluations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
export const show = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/{evaluation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
show.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return show.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
show.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
show.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
const showForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
showForm.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::show
* @see app/Http/Controllers/Admin/EvaluationController.php:421
* @route '/admin/evaluations/{evaluation}'
*/
showForm.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
export const edit = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/evaluations/{evaluation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
edit.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return edit.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
edit.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
edit.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
const editForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
editForm.get = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::edit
* @see app/Http/Controllers/Admin/EvaluationController.php:503
* @route '/admin/evaluations/{evaluation}/edit'
*/
editForm.head = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
export const update = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/evaluations/{evaluation}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
update.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return update.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
update.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
update.put = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
const updateForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
updateForm.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::update
* @see app/Http/Controllers/Admin/EvaluationController.php:538
* @route '/admin/evaluations/{evaluation}'
*/
updateForm.put = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::destroy
* @see app/Http/Controllers/Admin/EvaluationController.php:612
* @route '/admin/evaluations/{evaluation}'
*/
export const destroy = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/evaluations/{evaluation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::destroy
* @see app/Http/Controllers/Admin/EvaluationController.php:612
* @route '/admin/evaluations/{evaluation}'
*/
destroy.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return destroy.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::destroy
* @see app/Http/Controllers/Admin/EvaluationController.php:612
* @route '/admin/evaluations/{evaluation}'
*/
destroy.delete = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::destroy
* @see app/Http/Controllers/Admin/EvaluationController.php:612
* @route '/admin/evaluations/{evaluation}'
*/
const destroyForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::destroy
* @see app/Http/Controllers/Admin/EvaluationController.php:612
* @route '/admin/evaluations/{evaluation}'
*/
destroyForm.delete = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::toggleActive
* @see app/Http/Controllers/Admin/EvaluationController.php:643
* @route '/admin/evaluations/{evaluation}/toggle-active'
*/
export const toggleActive = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/evaluations/{evaluation}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::toggleActive
* @see app/Http/Controllers/Admin/EvaluationController.php:643
* @route '/admin/evaluations/{evaluation}/toggle-active'
*/
toggleActive.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return toggleActive.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::toggleActive
* @see app/Http/Controllers/Admin/EvaluationController.php:643
* @route '/admin/evaluations/{evaluation}/toggle-active'
*/
toggleActive.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::toggleActive
* @see app/Http/Controllers/Admin/EvaluationController.php:643
* @route '/admin/evaluations/{evaluation}/toggle-active'
*/
const toggleActiveForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::toggleActive
* @see app/Http/Controllers/Admin/EvaluationController.php:643
* @route '/admin/evaluations/{evaluation}/toggle-active'
*/
toggleActiveForm.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::resendNotifications
* @see app/Http/Controllers/Admin/EvaluationController.php:664
* @route '/admin/evaluations/{evaluation}/resend-notifications'
*/
export const resendNotifications = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendNotifications.url(args, options),
    method: 'post',
})

resendNotifications.definition = {
    methods: ["post"],
    url: '/admin/evaluations/{evaluation}/resend-notifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::resendNotifications
* @see app/Http/Controllers/Admin/EvaluationController.php:664
* @route '/admin/evaluations/{evaluation}/resend-notifications'
*/
resendNotifications.url = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { evaluation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { evaluation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            evaluation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        evaluation: typeof args.evaluation === 'object'
        ? args.evaluation.id
        : args.evaluation,
    }

    return resendNotifications.definition.url
            .replace('{evaluation}', parsedArgs.evaluation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\EvaluationController::resendNotifications
* @see app/Http/Controllers/Admin/EvaluationController.php:664
* @route '/admin/evaluations/{evaluation}/resend-notifications'
*/
resendNotifications.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendNotifications.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::resendNotifications
* @see app/Http/Controllers/Admin/EvaluationController.php:664
* @route '/admin/evaluations/{evaluation}/resend-notifications'
*/
const resendNotificationsForm = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendNotifications.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::resendNotifications
* @see app/Http/Controllers/Admin/EvaluationController.php:664
* @route '/admin/evaluations/{evaluation}/resend-notifications'
*/
resendNotificationsForm.post = (args: { evaluation: number | { id: number } } | [evaluation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendNotifications.url(args, options),
    method: 'post',
})

resendNotifications.form = resendNotificationsForm

/**
* @see \App\Http\Controllers\Admin\EvaluationController::corriger
* @see app/Http/Controllers/Admin/EvaluationController.php:688
* @route '/admin/soumissions-evaluations/{soumission}/corriger'
*/
export const corriger = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: corriger.url(args, options),
    method: 'post',
})

corriger.definition = {
    methods: ["post"],
    url: '/admin/soumissions-evaluations/{soumission}/corriger',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\EvaluationController::corriger
* @see app/Http/Controllers/Admin/EvaluationController.php:688
* @route '/admin/soumissions-evaluations/{soumission}/corriger'
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
* @see \App\Http\Controllers\Admin\EvaluationController::corriger
* @see app/Http/Controllers/Admin/EvaluationController.php:688
* @route '/admin/soumissions-evaluations/{soumission}/corriger'
*/
corriger.post = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: corriger.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::corriger
* @see app/Http/Controllers/Admin/EvaluationController.php:688
* @route '/admin/soumissions-evaluations/{soumission}/corriger'
*/
const corrigerForm = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: corriger.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\EvaluationController::corriger
* @see app/Http/Controllers/Admin/EvaluationController.php:688
* @route '/admin/soumissions-evaluations/{soumission}/corriger'
*/
corrigerForm.post = (args: { soumission: number | { id: number } } | [soumission: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: corriger.url(args, options),
    method: 'post',
})

corriger.form = corrigerForm

const EvaluationController = { getVaguesByFormation, getCertificationsByFormation, getStudentsByCertification, getTranchesByFormation, index, create, store, show, edit, update, destroy, toggleActive, resendNotifications, corriger }

export default EvaluationController