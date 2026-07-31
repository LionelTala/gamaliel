import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/vagues',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::index
* @see app/Http/Controllers/Admin/VagueController.php:16
* @route '/admin/vagues'
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
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/vagues/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::create
* @see app/Http/Controllers/Admin/VagueController.php:58
* @route '/admin/vagues/create'
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
* @see \App\Http\Controllers\Admin\VagueController::store
* @see app/Http/Controllers/Admin/VagueController.php:76
* @route '/admin/vagues'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/vagues',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::store
* @see app/Http/Controllers/Admin/VagueController.php:76
* @route '/admin/vagues'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::store
* @see app/Http/Controllers/Admin/VagueController.php:76
* @route '/admin/vagues'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::store
* @see app/Http/Controllers/Admin/VagueController.php:76
* @route '/admin/vagues'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::store
* @see app/Http/Controllers/Admin/VagueController.php:76
* @route '/admin/vagues'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
export const show = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/vagues/{vague}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
show.url = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vague: args }
    }

    if (Array.isArray(args)) {
        args = {
            vague: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vague: args.vague,
    }

    return show.definition.url
            .replace('{vague}', parsedArgs.vague.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
show.get = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
show.head = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
const showForm = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
showForm.get = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::show
* @see app/Http/Controllers/Admin/VagueController.php:0
* @route '/admin/vagues/{vague}'
*/
showForm.head = (args: { vague: string | number } | [vague: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
export const edit = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/vagues/{vague}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
edit.url = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vague: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vague: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vague: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vague: typeof args.vague === 'object'
        ? args.vague.id
        : args.vague,
    }

    return edit.definition.url
            .replace('{vague}', parsedArgs.vague.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
edit.get = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
edit.head = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
const editForm = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
editForm.get = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::edit
* @see app/Http/Controllers/Admin/VagueController.php:123
* @route '/admin/vagues/{vague}/edit'
*/
editForm.head = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
export const update = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/vagues/{vague}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
update.url = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vague: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vague: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vague: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vague: typeof args.vague === 'object'
        ? args.vague.id
        : args.vague,
    }

    return update.definition.url
            .replace('{vague}', parsedArgs.vague.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
update.put = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
update.patch = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
const updateForm = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
updateForm.put = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::update
* @see app/Http/Controllers/Admin/VagueController.php:151
* @route '/admin/vagues/{vague}'
*/
updateForm.patch = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\VagueController::destroy
* @see app/Http/Controllers/Admin/VagueController.php:198
* @route '/admin/vagues/{vague}'
*/
export const destroy = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/vagues/{vague}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::destroy
* @see app/Http/Controllers/Admin/VagueController.php:198
* @route '/admin/vagues/{vague}'
*/
destroy.url = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vague: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vague: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vague: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vague: typeof args.vague === 'object'
        ? args.vague.id
        : args.vague,
    }

    return destroy.definition.url
            .replace('{vague}', parsedArgs.vague.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::destroy
* @see app/Http/Controllers/Admin/VagueController.php:198
* @route '/admin/vagues/{vague}'
*/
destroy.delete = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::destroy
* @see app/Http/Controllers/Admin/VagueController.php:198
* @route '/admin/vagues/{vague}'
*/
const destroyForm = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::destroy
* @see app/Http/Controllers/Admin/VagueController.php:198
* @route '/admin/vagues/{vague}'
*/
destroyForm.delete = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\VagueController::toggleActive
* @see app/Http/Controllers/Admin/VagueController.php:234
* @route '/admin/vagues/{vague}/toggle-active'
*/
export const toggleActive = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/vagues/{vague}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VagueController::toggleActive
* @see app/Http/Controllers/Admin/VagueController.php:234
* @route '/admin/vagues/{vague}/toggle-active'
*/
toggleActive.url = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { vague: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { vague: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            vague: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        vague: typeof args.vague === 'object'
        ? args.vague.id
        : args.vague,
    }

    return toggleActive.definition.url
            .replace('{vague}', parsedArgs.vague.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VagueController::toggleActive
* @see app/Http/Controllers/Admin/VagueController.php:234
* @route '/admin/vagues/{vague}/toggle-active'
*/
toggleActive.post = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::toggleActive
* @see app/Http/Controllers/Admin/VagueController.php:234
* @route '/admin/vagues/{vague}/toggle-active'
*/
const toggleActiveForm = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VagueController::toggleActive
* @see app/Http/Controllers/Admin/VagueController.php:234
* @route '/admin/vagues/{vague}/toggle-active'
*/
toggleActiveForm.post = (args: { vague: number | { id: number } } | [vague: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const VagueController = { index, create, store, show, edit, update, destroy, toggleActive }

export default VagueController