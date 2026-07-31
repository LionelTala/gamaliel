import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/activites',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::index
* @see app/Http/Controllers/Admin/ActiviteController.php:14
* @route '/admin/activites'
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
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/activites/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::create
* @see app/Http/Controllers/Admin/ActiviteController.php:66
* @route '/admin/activites/create'
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
* @see \App\Http\Controllers\Admin\ActiviteController::store
* @see app/Http/Controllers/Admin/ActiviteController.php:71
* @route '/admin/activites'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/activites',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::store
* @see app/Http/Controllers/Admin/ActiviteController.php:71
* @route '/admin/activites'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::store
* @see app/Http/Controllers/Admin/ActiviteController.php:71
* @route '/admin/activites'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::store
* @see app/Http/Controllers/Admin/ActiviteController.php:71
* @route '/admin/activites'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::store
* @see app/Http/Controllers/Admin/ActiviteController.php:71
* @route '/admin/activites'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
export const show = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/activites/{activite}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
show.url = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activite: args }
    }

    if (Array.isArray(args)) {
        args = {
            activite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activite: args.activite,
    }

    return show.definition.url
            .replace('{activite}', parsedArgs.activite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
show.get = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
show.head = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
const showForm = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
showForm.get = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::show
* @see app/Http/Controllers/Admin/ActiviteController.php:0
* @route '/admin/activites/{activite}'
*/
showForm.head = (args: { activite: string | number } | [activite: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
export const edit = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/activites/{activite}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
edit.url = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activite: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { activite: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            activite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activite: typeof args.activite === 'object'
        ? args.activite.id
        : args.activite,
    }

    return edit.definition.url
            .replace('{activite}', parsedArgs.activite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
edit.get = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
edit.head = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
const editForm = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
editForm.get = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::edit
* @see app/Http/Controllers/Admin/ActiviteController.php:129
* @route '/admin/activites/{activite}/edit'
*/
editForm.head = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
export const update = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/activites/{activite}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
update.url = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activite: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { activite: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            activite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activite: typeof args.activite === 'object'
        ? args.activite.id
        : args.activite,
    }

    return update.definition.url
            .replace('{activite}', parsedArgs.activite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
update.put = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
update.patch = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
const updateForm = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
updateForm.put = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::update
* @see app/Http/Controllers/Admin/ActiviteController.php:151
* @route '/admin/activites/{activite}'
*/
updateForm.patch = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\Admin\ActiviteController::destroy
* @see app/Http/Controllers/Admin/ActiviteController.php:211
* @route '/admin/activites/{activite}'
*/
export const destroy = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/activites/{activite}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::destroy
* @see app/Http/Controllers/Admin/ActiviteController.php:211
* @route '/admin/activites/{activite}'
*/
destroy.url = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activite: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { activite: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            activite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activite: typeof args.activite === 'object'
        ? args.activite.id
        : args.activite,
    }

    return destroy.definition.url
            .replace('{activite}', parsedArgs.activite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::destroy
* @see app/Http/Controllers/Admin/ActiviteController.php:211
* @route '/admin/activites/{activite}'
*/
destroy.delete = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::destroy
* @see app/Http/Controllers/Admin/ActiviteController.php:211
* @route '/admin/activites/{activite}'
*/
const destroyForm = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::destroy
* @see app/Http/Controllers/Admin/ActiviteController.php:211
* @route '/admin/activites/{activite}'
*/
destroyForm.delete = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\ActiviteController::toggleActive
* @see app/Http/Controllers/Admin/ActiviteController.php:243
* @route '/admin/activites/{activite}/toggle-active'
*/
export const toggleActive = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/activites/{activite}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ActiviteController::toggleActive
* @see app/Http/Controllers/Admin/ActiviteController.php:243
* @route '/admin/activites/{activite}/toggle-active'
*/
toggleActive.url = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activite: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { activite: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            activite: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activite: typeof args.activite === 'object'
        ? args.activite.id
        : args.activite,
    }

    return toggleActive.definition.url
            .replace('{activite}', parsedArgs.activite.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ActiviteController::toggleActive
* @see app/Http/Controllers/Admin/ActiviteController.php:243
* @route '/admin/activites/{activite}/toggle-active'
*/
toggleActive.post = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::toggleActive
* @see app/Http/Controllers/Admin/ActiviteController.php:243
* @route '/admin/activites/{activite}/toggle-active'
*/
const toggleActiveForm = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\ActiviteController::toggleActive
* @see app/Http/Controllers/Admin/ActiviteController.php:243
* @route '/admin/activites/{activite}/toggle-active'
*/
toggleActiveForm.post = (args: { activite: number | { id: number } } | [activite: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const ActiviteController = { index, create, store, show, edit, update, destroy, toggleActive }

export default ActiviteController