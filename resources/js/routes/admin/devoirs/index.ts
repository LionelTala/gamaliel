import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
export const vagues = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

vagues.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
vagues.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return vagues.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
vagues.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
vagues.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vagues.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
const vaguesForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
vaguesForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::vagues
* @see app/Http/Controllers/Admin/DevoirController.php:105
* @route '/admin/devoirs/vagues/{formationId}'
*/
vaguesForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

vagues.form = vaguesForm

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
export const certifications = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

certifications.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
certifications.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return certifications.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
certifications.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
certifications.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: certifications.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
const certificationsForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
certificationsForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::certifications
* @see app/Http/Controllers/Admin/DevoirController.php:123
* @route '/admin/devoirs/certifications/{formationId}'
*/
certificationsForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

certifications.form = certificationsForm

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
export const studentsByCertification = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentsByCertification.url(args, options),
    method: 'get',
})

studentsByCertification.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/students-by-certification/{certificationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
studentsByCertification.url = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return studentsByCertification.definition.url
            .replace('{certificationId}', parsedArgs.certificationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
studentsByCertification.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
studentsByCertification.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentsByCertification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
const studentsByCertificationForm = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: studentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
studentsByCertificationForm.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: studentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::studentsByCertification
* @see app/Http/Controllers/Admin/DevoirController.php:140
* @route '/admin/devoirs/students-by-certification/{certificationId}'
*/
studentsByCertificationForm.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: studentsByCertification.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

studentsByCertification.form = studentsByCertificationForm

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
export const tranches = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tranches.url(args, options),
    method: 'get',
})

tranches.definition = {
    methods: ["get","head"],
    url: '/admin/devoirs/tranches/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
tranches.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return tranches.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
tranches.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: tranches.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
tranches.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: tranches.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
const tranchesForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tranches.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
tranchesForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tranches.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\DevoirController::tranches
* @see app/Http/Controllers/Admin/DevoirController.php:157
* @route '/admin/devoirs/tranches/{formationId}'
*/
tranchesForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: tranches.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

tranches.form = tranchesForm

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

const devoirs = {
    vagues: Object.assign(vagues, vagues),
    certifications: Object.assign(certifications, certifications),
    studentsByCertification: Object.assign(studentsByCertification, studentsByCertification),
    tranches: Object.assign(tranches, tranches),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggleActive: Object.assign(toggleActive, toggleActive),
    resendNotifications: Object.assign(resendNotifications, resendNotifications),
}

export default devoirs