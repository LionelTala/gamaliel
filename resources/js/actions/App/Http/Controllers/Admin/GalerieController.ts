import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/galerie',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::index
* @see app/Http/Controllers/Admin/GalerieController.php:14
* @route '/admin/galerie'
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
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/galerie/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::create
* @see app/Http/Controllers/Admin/GalerieController.php:65
* @route '/admin/galerie/create'
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
* @see \App\Http\Controllers\Admin\GalerieController::store
* @see app/Http/Controllers/Admin/GalerieController.php:70
* @route '/admin/galerie'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/galerie',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::store
* @see app/Http/Controllers/Admin/GalerieController.php:70
* @route '/admin/galerie'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::store
* @see app/Http/Controllers/Admin/GalerieController.php:70
* @route '/admin/galerie'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::store
* @see app/Http/Controllers/Admin/GalerieController.php:70
* @route '/admin/galerie'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::store
* @see app/Http/Controllers/Admin/GalerieController.php:70
* @route '/admin/galerie'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
export const edit = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/galerie/{galerie}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
edit.url = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galerie: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galerie: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galerie: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galerie: typeof args.galerie === 'object'
        ? args.galerie.id
        : args.galerie,
    }

    return edit.definition.url
            .replace('{galerie}', parsedArgs.galerie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
edit.get = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
edit.head = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
const editForm = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
editForm.get = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::edit
* @see app/Http/Controllers/Admin/GalerieController.php:128
* @route '/admin/galerie/{galerie}/edit'
*/
editForm.head = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
export const update = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/galerie/{galerie}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
update.url = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galerie: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galerie: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galerie: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galerie: typeof args.galerie === 'object'
        ? args.galerie.id
        : args.galerie,
    }

    return update.definition.url
            .replace('{galerie}', parsedArgs.galerie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
update.post = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
update.put = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
const updateForm = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
updateForm.post = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::update
* @see app/Http/Controllers/Admin/GalerieController.php:147
* @route '/admin/galerie/{galerie}'
*/
updateForm.put = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GalerieController::destroy
* @see app/Http/Controllers/Admin/GalerieController.php:215
* @route '/admin/galerie/{galerie}'
*/
export const destroy = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/galerie/{galerie}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::destroy
* @see app/Http/Controllers/Admin/GalerieController.php:215
* @route '/admin/galerie/{galerie}'
*/
destroy.url = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galerie: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galerie: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galerie: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galerie: typeof args.galerie === 'object'
        ? args.galerie.id
        : args.galerie,
    }

    return destroy.definition.url
            .replace('{galerie}', parsedArgs.galerie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::destroy
* @see app/Http/Controllers/Admin/GalerieController.php:215
* @route '/admin/galerie/{galerie}'
*/
destroy.delete = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::destroy
* @see app/Http/Controllers/Admin/GalerieController.php:215
* @route '/admin/galerie/{galerie}'
*/
const destroyForm = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::destroy
* @see app/Http/Controllers/Admin/GalerieController.php:215
* @route '/admin/galerie/{galerie}'
*/
destroyForm.delete = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\GalerieController::toggleActive
* @see app/Http/Controllers/Admin/GalerieController.php:248
* @route '/admin/galerie/{galerie}/toggle-active'
*/
export const toggleActive = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/galerie/{galerie}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\GalerieController::toggleActive
* @see app/Http/Controllers/Admin/GalerieController.php:248
* @route '/admin/galerie/{galerie}/toggle-active'
*/
toggleActive.url = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { galerie: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { galerie: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            galerie: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        galerie: typeof args.galerie === 'object'
        ? args.galerie.id
        : args.galerie,
    }

    return toggleActive.definition.url
            .replace('{galerie}', parsedArgs.galerie.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\GalerieController::toggleActive
* @see app/Http/Controllers/Admin/GalerieController.php:248
* @route '/admin/galerie/{galerie}/toggle-active'
*/
toggleActive.post = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::toggleActive
* @see app/Http/Controllers/Admin/GalerieController.php:248
* @route '/admin/galerie/{galerie}/toggle-active'
*/
const toggleActiveForm = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\GalerieController::toggleActive
* @see app/Http/Controllers/Admin/GalerieController.php:248
* @route '/admin/galerie/{galerie}/toggle-active'
*/
toggleActiveForm.post = (args: { galerie: number | { id: number } } | [galerie: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const GalerieController = { index, create, store, edit, update, destroy, toggleActive }

export default GalerieController