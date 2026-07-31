import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/pre-inscriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::index
* @see app/Http/Controllers/Admin/PreInscriptionController.php:12
* @route '/admin/pre-inscriptions'
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
* @see \App\Http\Controllers\Admin\PreInscriptionController::update
* @see app/Http/Controllers/Admin/PreInscriptionController.php:86
* @route '/admin/pre-inscriptions/{preInscription}'
*/
export const update = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/pre-inscriptions/{preInscription}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::update
* @see app/Http/Controllers/Admin/PreInscriptionController.php:86
* @route '/admin/pre-inscriptions/{preInscription}'
*/
update.url = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { preInscription: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { preInscription: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            preInscription: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        preInscription: typeof args.preInscription === 'object'
        ? args.preInscription.id
        : args.preInscription,
    }

    return update.definition.url
            .replace('{preInscription}', parsedArgs.preInscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::update
* @see app/Http/Controllers/Admin/PreInscriptionController.php:86
* @route '/admin/pre-inscriptions/{preInscription}'
*/
update.put = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::update
* @see app/Http/Controllers/Admin/PreInscriptionController.php:86
* @route '/admin/pre-inscriptions/{preInscription}'
*/
const updateForm = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::update
* @see app/Http/Controllers/Admin/PreInscriptionController.php:86
* @route '/admin/pre-inscriptions/{preInscription}'
*/
updateForm.put = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\PreInscriptionController::destroy
* @see app/Http/Controllers/Admin/PreInscriptionController.php:102
* @route '/admin/pre-inscriptions/{preInscription}'
*/
export const destroy = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/pre-inscriptions/{preInscription}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::destroy
* @see app/Http/Controllers/Admin/PreInscriptionController.php:102
* @route '/admin/pre-inscriptions/{preInscription}'
*/
destroy.url = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { preInscription: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { preInscription: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            preInscription: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        preInscription: typeof args.preInscription === 'object'
        ? args.preInscription.id
        : args.preInscription,
    }

    return destroy.definition.url
            .replace('{preInscription}', parsedArgs.preInscription.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::destroy
* @see app/Http/Controllers/Admin/PreInscriptionController.php:102
* @route '/admin/pre-inscriptions/{preInscription}'
*/
destroy.delete = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::destroy
* @see app/Http/Controllers/Admin/PreInscriptionController.php:102
* @route '/admin/pre-inscriptions/{preInscription}'
*/
const destroyForm = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\PreInscriptionController::destroy
* @see app/Http/Controllers/Admin/PreInscriptionController.php:102
* @route '/admin/pre-inscriptions/{preInscription}'
*/
destroyForm.delete = (args: { preInscription: number | { id: number } } | [preInscription: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const preInscriptions = {
    index: Object.assign(index, index),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
}

export default preInscriptions