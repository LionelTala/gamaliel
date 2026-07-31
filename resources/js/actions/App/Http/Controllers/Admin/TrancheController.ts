import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tranches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::index
* @see app/Http/Controllers/Admin/TrancheController.php:17
* @route '/admin/tranches'
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
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tranches/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::create
* @see app/Http/Controllers/Admin/TrancheController.php:51
* @route '/admin/tranches/create'
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
* @see \App\Http\Controllers\Admin\TrancheController::store
* @see app/Http/Controllers/Admin/TrancheController.php:64
* @route '/admin/tranches'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tranches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::store
* @see app/Http/Controllers/Admin/TrancheController.php:64
* @route '/admin/tranches'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::store
* @see app/Http/Controllers/Admin/TrancheController.php:64
* @route '/admin/tranches'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::store
* @see app/Http/Controllers/Admin/TrancheController.php:64
* @route '/admin/tranches'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::store
* @see app/Http/Controllers/Admin/TrancheController.php:64
* @route '/admin/tranches'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
export const edit = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tranches/{tranche}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
edit.url = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tranche: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tranche: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tranche: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tranche: typeof args.tranche === 'object'
        ? args.tranche.id
        : args.tranche,
    }

    return edit.definition.url
            .replace('{tranche}', parsedArgs.tranche.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
edit.get = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
edit.head = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
const editForm = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
editForm.get = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::edit
* @see app/Http/Controllers/Admin/TrancheController.php:86
* @route '/admin/tranches/{tranche}/edit'
*/
editForm.head = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\TrancheController::update
* @see app/Http/Controllers/Admin/TrancheController.php:109
* @route '/admin/tranches/{tranche}'
*/
export const update = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/tranches/{tranche}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::update
* @see app/Http/Controllers/Admin/TrancheController.php:109
* @route '/admin/tranches/{tranche}'
*/
update.url = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tranche: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tranche: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tranche: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tranche: typeof args.tranche === 'object'
        ? args.tranche.id
        : args.tranche,
    }

    return update.definition.url
            .replace('{tranche}', parsedArgs.tranche.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::update
* @see app/Http/Controllers/Admin/TrancheController.php:109
* @route '/admin/tranches/{tranche}'
*/
update.put = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::update
* @see app/Http/Controllers/Admin/TrancheController.php:109
* @route '/admin/tranches/{tranche}'
*/
const updateForm = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::update
* @see app/Http/Controllers/Admin/TrancheController.php:109
* @route '/admin/tranches/{tranche}'
*/
updateForm.put = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TrancheController::destroy
* @see app/Http/Controllers/Admin/TrancheController.php:126
* @route '/admin/tranches/{tranche}'
*/
export const destroy = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tranches/{tranche}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::destroy
* @see app/Http/Controllers/Admin/TrancheController.php:126
* @route '/admin/tranches/{tranche}'
*/
destroy.url = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tranche: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { tranche: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            tranche: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        tranche: typeof args.tranche === 'object'
        ? args.tranche.id
        : args.tranche,
    }

    return destroy.definition.url
            .replace('{tranche}', parsedArgs.tranche.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::destroy
* @see app/Http/Controllers/Admin/TrancheController.php:126
* @route '/admin/tranches/{tranche}'
*/
destroy.delete = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::destroy
* @see app/Http/Controllers/Admin/TrancheController.php:126
* @route '/admin/tranches/{tranche}'
*/
const destroyForm = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::destroy
* @see app/Http/Controllers/Admin/TrancheController.php:126
* @route '/admin/tranches/{tranche}'
*/
destroyForm.delete = (args: { tranche: number | { id: number } } | [tranche: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
export const getByFormation = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByFormation.url(args, options),
    method: 'get',
})

getByFormation.definition = {
    methods: ["get","head"],
    url: '/admin/tranches/by-formation/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
getByFormation.url = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getByFormation.definition.url
            .replace('{formationId}', parsedArgs.formationId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
getByFormation.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
getByFormation.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getByFormation.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
const getByFormationForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
getByFormationForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getByFormation.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::getByFormation
* @see app/Http/Controllers/Admin/TrancheController.php:172
* @route '/admin/tranches/by-formation/{formationId}'
*/
getByFormationForm.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getByFormation.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getByFormation.form = getByFormationForm

/**
* @see \App\Http\Controllers\Admin\TrancheController::updateLienTotal
* @see app/Http/Controllers/Admin/TrancheController.php:156
* @route '/admin/formations/{formation}/lien-paiement-total'
*/
export const updateLienTotal = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLienTotal.url(args, options),
    method: 'put',
})

updateLienTotal.definition = {
    methods: ["put"],
    url: '/admin/formations/{formation}/lien-paiement-total',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TrancheController::updateLienTotal
* @see app/Http/Controllers/Admin/TrancheController.php:156
* @route '/admin/formations/{formation}/lien-paiement-total'
*/
updateLienTotal.url = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { formation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { formation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            formation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        formation: typeof args.formation === 'object'
        ? args.formation.id
        : args.formation,
    }

    return updateLienTotal.definition.url
            .replace('{formation}', parsedArgs.formation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TrancheController::updateLienTotal
* @see app/Http/Controllers/Admin/TrancheController.php:156
* @route '/admin/formations/{formation}/lien-paiement-total'
*/
updateLienTotal.put = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLienTotal.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::updateLienTotal
* @see app/Http/Controllers/Admin/TrancheController.php:156
* @route '/admin/formations/{formation}/lien-paiement-total'
*/
const updateLienTotalForm = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateLienTotal.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\TrancheController::updateLienTotal
* @see app/Http/Controllers/Admin/TrancheController.php:156
* @route '/admin/formations/{formation}/lien-paiement-total'
*/
updateLienTotalForm.put = (args: { formation: number | { id: number } } | [formation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateLienTotal.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateLienTotal.form = updateLienTotalForm

const TrancheController = { index, create, store, edit, update, destroy, getByFormation, updateLienTotal }

export default TrancheController