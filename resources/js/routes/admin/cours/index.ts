import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
export const vagues = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

vagues.definition = {
    methods: ["get","head"],
    url: '/admin/cours/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
vagues.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
vagues.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vagues.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
const vaguesForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
*/
vaguesForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::vagues
* @see app/Http/Controllers/Admin/CoursController.php:155
* @route '/admin/cours/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
export const certifications = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

certifications.definition = {
    methods: ["get","head"],
    url: '/admin/cours/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
certifications.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
certifications.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: certifications.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
const certificationsForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
*/
certificationsForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::certifications
* @see app/Http/Controllers/Admin/CoursController.php:192
* @route '/admin/cours/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
export const studentsByCertification = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentsByCertification.url(args, options),
    method: 'get',
})

studentsByCertification.definition = {
    methods: ["get","head"],
    url: '/admin/cours/students-by-certification/{certificationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
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
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
studentsByCertification.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: studentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
studentsByCertification.head = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: studentsByCertification.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
const studentsByCertificationForm = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: studentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
*/
studentsByCertificationForm.get = (args: { certificationId: string | number } | [certificationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: studentsByCertification.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\CoursController::studentsByCertification
* @see app/Http/Controllers/Admin/CoursController.php:228
* @route '/admin/cours/students-by-certification/{certificationId}'
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

const cours = {
    vagues: Object.assign(vagues, vagues),
    certifications: Object.assign(certifications, certifications),
    studentsByCertification: Object.assign(studentsByCertification, studentsByCertification),
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggleActive: Object.assign(toggleActive, toggleActive),
}

export default cours