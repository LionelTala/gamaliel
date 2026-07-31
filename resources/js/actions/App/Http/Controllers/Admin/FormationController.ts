import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/formations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::index
* @see app/Http/Controllers/Admin/FormationController.php:17
* @route '/admin/formations'
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
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/formations/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::create
* @see app/Http/Controllers/Admin/FormationController.php:95
* @route '/admin/formations/create'
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
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
export const createPresentiel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createPresentiel.url(options),
    method: 'get',
})

createPresentiel.definition = {
    methods: ["get","head"],
    url: '/admin/formations/create-presentiel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
createPresentiel.url = (options?: RouteQueryOptions) => {
    return createPresentiel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
createPresentiel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createPresentiel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
createPresentiel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createPresentiel.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
const createPresentielForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPresentiel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
createPresentielForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPresentiel.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::createPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:108
* @route '/admin/formations/create-presentiel'
*/
createPresentielForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createPresentiel.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createPresentiel.form = createPresentielForm

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:113
* @route '/admin/formations'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/formations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:113
* @route '/admin/formations'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:113
* @route '/admin/formations'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:113
* @route '/admin/formations'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::store
* @see app/Http/Controllers/Admin/FormationController.php:113
* @route '/admin/formations'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/formations/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::edit
* @see app/Http/Controllers/Admin/FormationController.php:256
* @route '/admin/formations/{id}/edit'
*/
editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
export const editPresentiel = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editPresentiel.url(args, options),
    method: 'get',
})

editPresentiel.definition = {
    methods: ["get","head"],
    url: '/admin/formations/{id}/edit-presentiel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
editPresentiel.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return editPresentiel.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
editPresentiel.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editPresentiel.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
editPresentiel.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editPresentiel.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
const editPresentielForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editPresentiel.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
editPresentielForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editPresentiel.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::editPresentiel
* @see app/Http/Controllers/Admin/FormationController.php:296
* @route '/admin/formations/{id}/edit-presentiel'
*/
editPresentielForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: editPresentiel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

editPresentiel.form = editPresentielForm

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/formations/{id}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::update
* @see app/Http/Controllers/Admin/FormationController.php:324
* @route '/admin/formations/{id}'
*/
updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:474
* @route '/admin/formations/{id}'
*/
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/formations/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:474
* @route '/admin/formations/{id}'
*/
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:474
* @route '/admin/formations/{id}'
*/
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:474
* @route '/admin/formations/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::destroy
* @see app/Http/Controllers/Admin/FormationController.php:474
* @route '/admin/formations/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:530
* @route '/admin/formations/{id}/toggle-active'
*/
export const toggleActive = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/formations/{id}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:530
* @route '/admin/formations/{id}/toggle-active'
*/
toggleActive.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return toggleActive.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:530
* @route '/admin/formations/{id}/toggle-active'
*/
toggleActive.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:530
* @route '/admin/formations/{id}/toggle-active'
*/
const toggleActiveForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\FormationController::toggleActive
* @see app/Http/Controllers/Admin/FormationController.php:530
* @route '/admin/formations/{id}/toggle-active'
*/
toggleActiveForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const FormationController = { index, create, createPresentiel, store, edit, editPresentiel, update, destroy, toggleActive }

export default FormationController