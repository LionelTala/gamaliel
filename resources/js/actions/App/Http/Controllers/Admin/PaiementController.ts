import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/paiements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::index
* @see app/Http/Controllers/Admin/PaiementController.php:17
* @route '/admin/paiements'
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
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/paiements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::create
* @see app/Http/Controllers/Admin/PaiementController.php:101
* @route '/admin/paiements/create'
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
* @see \App\Http\Controllers\Admin\PaiementController::store
* @see app/Http/Controllers/Admin/PaiementController.php:133
* @route '/admin/paiements'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/paiements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::store
* @see app/Http/Controllers/Admin/PaiementController.php:133
* @route '/admin/paiements'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::store
* @see app/Http/Controllers/Admin/PaiementController.php:133
* @route '/admin/paiements'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::store
* @see app/Http/Controllers/Admin/PaiementController.php:133
* @route '/admin/paiements'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::store
* @see app/Http/Controllers/Admin/PaiementController.php:133
* @route '/admin/paiements'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
export const edit = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/paiements/{paiement}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
edit.url = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { paiement: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { paiement: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            paiement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        paiement: typeof args.paiement === 'object'
        ? args.paiement.id
        : args.paiement,
    }

    return edit.definition.url
            .replace('{paiement}', parsedArgs.paiement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
edit.get = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
edit.head = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
const editForm = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
editForm.get = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::edit
* @see app/Http/Controllers/Admin/PaiementController.php:169
* @route '/admin/paiements/{paiement}/edit'
*/
editForm.head = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\PaiementController::update
* @see app/Http/Controllers/Admin/PaiementController.php:179
* @route '/admin/paiements/{paiement}'
*/
export const update = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/paiements/{paiement}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::update
* @see app/Http/Controllers/Admin/PaiementController.php:179
* @route '/admin/paiements/{paiement}'
*/
update.url = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { paiement: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { paiement: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            paiement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        paiement: typeof args.paiement === 'object'
        ? args.paiement.id
        : args.paiement,
    }

    return update.definition.url
            .replace('{paiement}', parsedArgs.paiement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::update
* @see app/Http/Controllers/Admin/PaiementController.php:179
* @route '/admin/paiements/{paiement}'
*/
update.put = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::update
* @see app/Http/Controllers/Admin/PaiementController.php:179
* @route '/admin/paiements/{paiement}'
*/
const updateForm = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::update
* @see app/Http/Controllers/Admin/PaiementController.php:179
* @route '/admin/paiements/{paiement}'
*/
updateForm.put = (args: { paiement: number | { id: number } } | [paiement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PaiementController::confirmer
* @see app/Http/Controllers/Admin/PaiementController.php:72
* @route '/admin/paiements/{student}/{tranche}/confirmer'
*/
export const confirmer = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmer.url(args, options),
    method: 'post',
})

confirmer.definition = {
    methods: ["post"],
    url: '/admin/paiements/{student}/{tranche}/confirmer',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::confirmer
* @see app/Http/Controllers/Admin/PaiementController.php:72
* @route '/admin/paiements/{student}/{tranche}/confirmer'
*/
confirmer.url = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            student: args[0],
            tranche: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
        tranche: typeof args.tranche === 'object'
        ? args.tranche.id
        : args.tranche,
    }

    return confirmer.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace('{tranche}', parsedArgs.tranche.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::confirmer
* @see app/Http/Controllers/Admin/PaiementController.php:72
* @route '/admin/paiements/{student}/{tranche}/confirmer'
*/
confirmer.post = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: confirmer.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::confirmer
* @see app/Http/Controllers/Admin/PaiementController.php:72
* @route '/admin/paiements/{student}/{tranche}/confirmer'
*/
const confirmerForm = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: confirmer.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::confirmer
* @see app/Http/Controllers/Admin/PaiementController.php:72
* @route '/admin/paiements/{student}/{tranche}/confirmer'
*/
confirmerForm.post = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: confirmer.url(args, options),
    method: 'post',
})

confirmer.form = confirmerForm

/**
* @see \App\Http\Controllers\Admin\PaiementController::annuler
* @see app/Http/Controllers/Admin/PaiementController.php:91
* @route '/admin/paiements/{student}/{tranche}/annuler'
*/
export const annuler = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: annuler.url(args, options),
    method: 'delete',
})

annuler.definition = {
    methods: ["delete"],
    url: '/admin/paiements/{student}/{tranche}/annuler',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PaiementController::annuler
* @see app/Http/Controllers/Admin/PaiementController.php:91
* @route '/admin/paiements/{student}/{tranche}/annuler'
*/
annuler.url = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            student: args[0],
            tranche: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
        tranche: typeof args.tranche === 'object'
        ? args.tranche.id
        : args.tranche,
    }

    return annuler.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace('{tranche}', parsedArgs.tranche.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaiementController::annuler
* @see app/Http/Controllers/Admin/PaiementController.php:91
* @route '/admin/paiements/{student}/{tranche}/annuler'
*/
annuler.delete = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: annuler.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::annuler
* @see app/Http/Controllers/Admin/PaiementController.php:91
* @route '/admin/paiements/{student}/{tranche}/annuler'
*/
const annulerForm = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: annuler.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PaiementController::annuler
* @see app/Http/Controllers/Admin/PaiementController.php:91
* @route '/admin/paiements/{student}/{tranche}/annuler'
*/
annulerForm.delete = (args: { student: number | { id: number }, tranche: number | { id: number } } | [student: number | { id: number }, tranche: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: annuler.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

annuler.form = annulerForm

const PaiementController = { index, create, store, edit, update, confirmer, annuler }

export default PaiementController