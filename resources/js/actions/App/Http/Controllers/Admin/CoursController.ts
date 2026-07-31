import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
export const getVaguesByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'get',
})

getVaguesByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/cours/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
getVaguesByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
getVaguesByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getVaguesByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
const getVaguesByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
getVaguesByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getVaguesByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getVaguesByFormation
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
export const getCertificationsByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'get',
})

getCertificationsByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/cours/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
getCertificationsByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
getCertificationsByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getCertificationsByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
const getCertificationsByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
getCertificationsByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getCertificationsByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getCertificationsByFormation
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
export const getStudentsByCertification = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'get',
})

getStudentsByCertification.definition = {
    methods: ["get","head"],
    url: '/admin/cours/students-by-certification/{certificationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
getStudentsByCertification.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
getStudentsByCertification.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStudentsByCertification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
const getStudentsByCertificationForm = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
getStudentsByCertificationForm.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getStudentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::getStudentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/cours',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::index
* @see app/Http/Controllers/Admin/CoursController.php:23
* @route '/admin/cours'
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
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/cours/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::create
* @see app/Http/Controllers/Admin/CoursController.php:125
* @route '/admin/cours/create'
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
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:286
* @route '/admin/cours'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/cours',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:286
* @route '/admin/cours'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:286
* @route '/admin/cours'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:286
* @route '/admin/cours'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::store
* @see app/Http/Controllers/Admin/CoursController.php:286
* @route '/admin/cours'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
export const show = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/cours/{cours}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
show.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return show.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
show.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
show.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
const showForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
showForm.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::show
* @see app/Http/Controllers/Admin/CoursController.php:515
* @route '/admin/cours/{cours}'
*/
showForm.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
export const edit = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/cours/{cours}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
edit.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return edit.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
edit.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
edit.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
const editForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
editForm.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::edit
* @see app/Http/Controllers/Admin/CoursController.php:619
* @route '/admin/cours/{cours}/edit'
*/
editForm.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
export const update = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/cours/{cours}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
update.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return update.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
update.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
update.put = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
const updateForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
updateForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::update
* @see app/Http/Controllers/Admin/CoursController.php:670
* @route '/admin/cours/{cours}'
*/
updateForm.put = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:784
* @route '/admin/cours/{cours}'
*/
export const destroy = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/cours/{cours}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:784
* @route '/admin/cours/{cours}'
*/
destroy.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return destroy.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:784
* @route '/admin/cours/{cours}'
*/
destroy.delete = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:784
* @route '/admin/cours/{cours}'
*/
const destroyForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::destroy
* @see app/Http/Controllers/Admin/CoursController.php:784
* @route '/admin/cours/{cours}'
*/
destroyForm.delete = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:860
* @route '/admin/cours/{cours}/toggle-active'
*/
export const toggleActive = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/cours/{cours}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:860
* @route '/admin/cours/{cours}/toggle-active'
*/
toggleActive.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cours: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { cours: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            cours: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cours: typeof args.cours === 'object'
        ? args.cours.id
        : args.cours,
    }

    return toggleActive.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:860
* @route '/admin/cours/{cours}/toggle-active'
*/
toggleActive.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:860
* @route '/admin/cours/{cours}/toggle-active'
*/
const toggleActiveForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::toggleActive
* @see app/Http/Controllers/Admin/CoursController.php:860
* @route '/admin/cours/{cours}/toggle-active'
*/
toggleActiveForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const CoursController = { getVaguesByFormation, getCertificationsByFormation, getStudentsByCertification, index, create, store, show, edit, update, destroy, toggleActive }

export default CoursController