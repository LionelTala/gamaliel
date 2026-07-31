import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
export const getVaguesByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'get',
})

getVaguesByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
getVaguesByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
getVaguesByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
const getVaguesByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
getVaguesByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getVaguesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
export const getCertificationsByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'get',
})

getCertificationsByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
getCertificationsByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
getCertificationsByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
const getCertificationsByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
getCertificationsByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
export const getStudentsByCertification = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'get',
})

getStudentsByCertification.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/students-by-certification/{certificationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
getStudentsByCertification.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
getStudentsByCertification.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
const getStudentsByCertificationForm = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
getStudentsByCertificationForm.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getStudentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
export const getTranchesByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTranchesByFormation.url(args, options),
    method: 'get',
})

getTranchesByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/tranches/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
getTranchesByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getTranchesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
getTranchesByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getTranchesByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
const getTranchesByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTranchesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
getTranchesByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getTranchesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::getTranchesByFormation
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
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
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::index
* @see app/Http/Controllers/Admin/DevoirController.php:24
* @route '/admin/devoirs'
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
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::create
* @see app/Http/Controllers/Admin/DevoirController.php:87
* @route '/admin/devoirs/create'
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
* @see \App\Http\Controllers\Admin\DevoirController::store
* @see app/Http/Controllers/Admin/DevoirController.php:179
* @route '/admin/devoirs'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/devoirs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::store
* @see app/Http/Controllers/Admin/DevoirController.php:179
* @route '/admin/devoirs'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::store
* @see app/Http/Controllers/Admin/DevoirController.php:179
* @route '/admin/devoirs'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::store
* @see app/Http/Controllers/Admin/DevoirController.php:179
* @route '/admin/devoirs'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::store
* @see app/Http/Controllers/Admin/DevoirController.php:179
* @route '/admin/devoirs'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
export const show = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/{devoir}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
show.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return show.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
show.get = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
show.head = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
const showForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
showForm.get = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::show
* @see app/Http/Controllers/Admin/DevoirController.php:417
* @route '/admin/devoirs/{devoir}'
*/
showForm.head = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
export const edit = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/{devoir}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
edit.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return edit.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
edit.get = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
edit.head = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
const editForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
editForm.get = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::edit
* @see app/Http/Controllers/Admin/DevoirController.php:498
* @route '/admin/devoirs/{devoir}/edit'
*/
editForm.head = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
export const update = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/devoirs/{devoir}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
update.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return update.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
update.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
update.put = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
const updateForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
updateForm.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::update
* @see app/Http/Controllers/Admin/DevoirController.php:532
* @route '/admin/devoirs/{devoir}'
*/
updateForm.put = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\DevoirController::destroy
* @see app/Http/Controllers/Admin/DevoirController.php:604
* @route '/admin/devoirs/{devoir}'
*/
export const destroy = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/devoirs/{devoir}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::destroy
* @see app/Http/Controllers/Admin/DevoirController.php:604
* @route '/admin/devoirs/{devoir}'
*/
destroy.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return destroy.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::destroy
* @see app/Http/Controllers/Admin/DevoirController.php:604
* @route '/admin/devoirs/{devoir}'
*/
destroy.delete = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::destroy
* @see app/Http/Controllers/Admin/DevoirController.php:604
* @route '/admin/devoirs/{devoir}'
*/
const destroyForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::destroy
* @see app/Http/Controllers/Admin/DevoirController.php:604
* @route '/admin/devoirs/{devoir}'
*/
destroyForm.delete = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\DevoirController::toggleActive
* @see app/Http/Controllers/Admin/DevoirController.php:635
* @route '/admin/devoirs/{devoir}/toggle-active'
*/
export const toggleActive = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/devoirs/{devoir}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::toggleActive
* @see app/Http/Controllers/Admin/DevoirController.php:635
* @route '/admin/devoirs/{devoir}/toggle-active'
*/
toggleActive.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return toggleActive.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::toggleActive
* @see app/Http/Controllers/Admin/DevoirController.php:635
* @route '/admin/devoirs/{devoir}/toggle-active'
*/
toggleActive.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::toggleActive
* @see app/Http/Controllers/Admin/DevoirController.php:635
* @route '/admin/devoirs/{devoir}/toggle-active'
*/
const toggleActiveForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::toggleActive
* @see app/Http/Controllers/Admin/DevoirController.php:635
* @route '/admin/devoirs/{devoir}/toggle-active'
*/
toggleActiveForm.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

/**
* @see \App\Http\Controllers\Admin\DevoirController::resendNotifications
* @see app/Http/Controllers/Admin/DevoirController.php:656
* @route '/admin/devoirs/{devoir}/resend-notifications'
*/
export const resendNotifications = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendNotifications.url(args, options),
    method: 'post',
})

resendNotifications.definition = {
    methods: ["post"],
    url: '/admin/devoirs/{devoir}/resend-notifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::resendNotifications
* @see app/Http/Controllers/Admin/DevoirController.php:656
* @route '/admin/devoirs/{devoir}/resend-notifications'
*/
resendNotifications.url = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { devoir: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { devoir: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            devoir: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        devoir: typeof args.devoir === 'object'
        ? args.devoir.id
        : args.devoir,
    }

    return resendNotifications.definition.url
            .replace('{devoir}', parsedArgs.devoir.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::resendNotifications
* @see app/Http/Controllers/Admin/DevoirController.php:656
* @route '/admin/devoirs/{devoir}/resend-notifications'
*/
resendNotifications.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendNotifications.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::resendNotifications
* @see app/Http/Controllers/Admin/DevoirController.php:656
* @route '/admin/devoirs/{devoir}/resend-notifications'
*/
const resendNotificationsForm = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendNotifications.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::resendNotifications
* @see app/Http/Controllers/Admin/DevoirController.php:656
* @route '/admin/devoirs/{devoir}/resend-notifications'
*/
resendNotificationsForm.post = (args: { devoir: number | { id: number } } | [devoir: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resendNotifications.url(args, options),
    method: 'post',
})

resendNotifications.form = resendNotificationsForm

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

const DevoirController = { getVaguesByFormation, getCertificationsByFormation, getStudentsByCertification, getTranchesByFormation, index, create, store, show, edit, update, destroy, toggleActive, resendNotifications, corriger }

export default DevoirController