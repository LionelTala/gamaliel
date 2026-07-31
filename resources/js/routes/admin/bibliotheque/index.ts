import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/bibliotheque',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::index
* @see app/Http/Controllers/Admin/LivreController.php:14
* @route '/admin/bibliotheque'
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
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/bibliotheque/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::create
* @see app/Http/Controllers/Admin/LivreController.php:67
* @route '/admin/bibliotheque/create'
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
* @see \App\Http\Controllers\Admin\LivreController::store
* @see app/Http/Controllers/Admin/LivreController.php:72
* @route '/admin/bibliotheque'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/bibliotheque',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::store
* @see app/Http/Controllers/Admin/LivreController.php:72
* @route '/admin/bibliotheque'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::store
* @see app/Http/Controllers/Admin/LivreController.php:72
* @route '/admin/bibliotheque'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::store
* @see app/Http/Controllers/Admin/LivreController.php:72
* @route '/admin/bibliotheque'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::store
* @see app/Http/Controllers/Admin/LivreController.php:72
* @route '/admin/bibliotheque'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
export const edit = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/bibliotheque/{livre}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
edit.url = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { livre: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { livre: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            livre: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        livre: typeof args.livre === 'object'
        ? args.livre.id
        : args.livre,
    }

    return edit.definition.url
            .replace('{livre}', parsedArgs.livre.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
edit.get = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
edit.head = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
const editForm = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
editForm.get = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::edit
* @see app/Http/Controllers/Admin/LivreController.php:113
* @route '/admin/bibliotheque/{livre}/edit'
*/
editForm.head = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
export const update = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/bibliotheque/{livre}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
update.url = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { livre: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { livre: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            livre: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        livre: typeof args.livre === 'object'
        ? args.livre.id
        : args.livre,
    }

    return update.definition.url
            .replace('{livre}', parsedArgs.livre.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
update.post = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
update.put = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
const updateForm = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
updateForm.post = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::update
* @see app/Http/Controllers/Admin/LivreController.php:138
* @route '/admin/bibliotheque/{livre}'
*/
updateForm.put = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\LivreController::destroy
* @see app/Http/Controllers/Admin/LivreController.php:183
* @route '/admin/bibliotheque/{livre}'
*/
export const destroy = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/bibliotheque/{livre}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::destroy
* @see app/Http/Controllers/Admin/LivreController.php:183
* @route '/admin/bibliotheque/{livre}'
*/
destroy.url = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { livre: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { livre: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            livre: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        livre: typeof args.livre === 'object'
        ? args.livre.id
        : args.livre,
    }

    return destroy.definition.url
            .replace('{livre}', parsedArgs.livre.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::destroy
* @see app/Http/Controllers/Admin/LivreController.php:183
* @route '/admin/bibliotheque/{livre}'
*/
destroy.delete = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::destroy
* @see app/Http/Controllers/Admin/LivreController.php:183
* @route '/admin/bibliotheque/{livre}'
*/
const destroyForm = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::destroy
* @see app/Http/Controllers/Admin/LivreController.php:183
* @route '/admin/bibliotheque/{livre}'
*/
destroyForm.delete = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\LivreController::toggle
* @see app/Http/Controllers/Admin/LivreController.php:209
* @route '/admin/bibliotheque/{livre}/toggle'
*/
export const toggle = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

toggle.definition = {
    methods: ["patch"],
    url: '/admin/bibliotheque/{livre}/toggle',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\LivreController::toggle
* @see app/Http/Controllers/Admin/LivreController.php:209
* @route '/admin/bibliotheque/{livre}/toggle'
*/
toggle.url = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { livre: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { livre: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            livre: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        livre: typeof args.livre === 'object'
        ? args.livre.id
        : args.livre,
    }

    return toggle.definition.url
            .replace('{livre}', parsedArgs.livre.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LivreController::toggle
* @see app/Http/Controllers/Admin/LivreController.php:209
* @route '/admin/bibliotheque/{livre}/toggle'
*/
toggle.patch = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggle.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::toggle
* @see app/Http/Controllers/Admin/LivreController.php:209
* @route '/admin/bibliotheque/{livre}/toggle'
*/
const toggleForm = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LivreController::toggle
* @see app/Http/Controllers/Admin/LivreController.php:209
* @route '/admin/bibliotheque/{livre}/toggle'
*/
toggleForm.patch = (args: { livre: number | { id: number } } | [livre: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggle.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

toggle.form = toggleForm

const bibliotheque = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    store: Object.assign(store, store),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    toggle: Object.assign(toggle, toggle),
}

export default bibliotheque