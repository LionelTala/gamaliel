import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\LessonController::store
* @see app/Http/Controllers/Admin/LessonController.php:137
* @route '/admin/cours/{cours}/lessons'
*/
export const store = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/cours/{cours}/lessons',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonController::store
* @see app/Http/Controllers/Admin/LessonController.php:137
* @route '/admin/cours/{cours}/lessons'
*/
store.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonController::store
* @see app/Http/Controllers/Admin/LessonController.php:137
* @route '/admin/cours/{cours}/lessons'
*/
store.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::store
* @see app/Http/Controllers/Admin/LessonController.php:137
* @route '/admin/cours/{cours}/lessons'
*/
const storeForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::store
* @see app/Http/Controllers/Admin/LessonController.php:137
* @route '/admin/cours/{cours}/lessons'
*/
storeForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
export const show = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/cours/lesson/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
show.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return show.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
show.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
show.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
const showForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
showForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::show
* @see app/Http/Controllers/Admin/LessonController.php:18
* @route '/admin/cours/lesson/{lesson}'
*/
showForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
export const edit = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/cours/lesson/{lesson}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
edit.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return edit.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
edit.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
edit.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
const editForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
editForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::edit
* @see app/Http/Controllers/Admin/LessonController.php:99
* @route '/admin/cours/lesson/{lesson}/edit'
*/
editForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
export const update = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post","put"],
    url: '/admin/cours/lesson/{lesson}',
} satisfies RouteDefinition<["post","put"]>

/**
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
update.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return update.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
update.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
update.put = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
const updateForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
updateForm.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::update
* @see app/Http/Controllers/Admin/LessonController.php:227
* @route '/admin/cours/lesson/{lesson}'
*/
updateForm.put = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\LessonController::destroy
* @see app/Http/Controllers/Admin/LessonController.php:311
* @route '/admin/cours/lesson/{lesson}'
*/
export const destroy = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/cours/lesson/{lesson}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\LessonController::destroy
* @see app/Http/Controllers/Admin/LessonController.php:311
* @route '/admin/cours/lesson/{lesson}'
*/
destroy.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return destroy.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonController::destroy
* @see app/Http/Controllers/Admin/LessonController.php:311
* @route '/admin/cours/lesson/{lesson}'
*/
destroy.delete = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::destroy
* @see app/Http/Controllers/Admin/LessonController.php:311
* @route '/admin/cours/lesson/{lesson}'
*/
const destroyForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::destroy
* @see app/Http/Controllers/Admin/LessonController.php:311
* @route '/admin/cours/lesson/{lesson}'
*/
destroyForm.delete = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\LessonController::toggleActive
* @see app/Http/Controllers/Admin/LessonController.php:361
* @route '/admin/cours/lesson/{lesson}/toggle-active'
*/
export const toggleActive = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/cours/lesson/{lesson}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\LessonController::toggleActive
* @see app/Http/Controllers/Admin/LessonController.php:361
* @route '/admin/cours/lesson/{lesson}/toggle-active'
*/
toggleActive.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return toggleActive.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\LessonController::toggleActive
* @see app/Http/Controllers/Admin/LessonController.php:361
* @route '/admin/cours/lesson/{lesson}/toggle-active'
*/
toggleActive.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::toggleActive
* @see app/Http/Controllers/Admin/LessonController.php:361
* @route '/admin/cours/lesson/{lesson}/toggle-active'
*/
const toggleActiveForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\LessonController::toggleActive
* @see app/Http/Controllers/Admin/LessonController.php:361
* @route '/admin/cours/lesson/{lesson}/toggle-active'
*/
toggleActiveForm.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

const LessonController = { store, show, edit, update, destroy, toggleActive }

export default LessonController