import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/students',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::index
* @see app/Http/Controllers/Admin/StudentController.php:20
* @route '/admin/students'
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
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
export const show = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
show.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return show.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
show.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
show.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
const showForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
showForm.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::show
* @see app/Http/Controllers/Admin/StudentController.php:192
* @route '/admin/students/{student}'
*/
showForm.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
export const edit = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/students/{student}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
edit.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return edit.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
edit.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
edit.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
const editForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
editForm.get = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::edit
* @see app/Http/Controllers/Admin/StudentController.php:250
* @route '/admin/students/{student}/edit'
*/
editForm.head = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\StudentController::update
* @see app/Http/Controllers/Admin/StudentController.php:318
* @route '/admin/students/{student}'
*/
export const update = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::update
* @see app/Http/Controllers/Admin/StudentController.php:318
* @route '/admin/students/{student}'
*/
update.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return update.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::update
* @see app/Http/Controllers/Admin/StudentController.php:318
* @route '/admin/students/{student}'
*/
update.put = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::update
* @see app/Http/Controllers/Admin/StudentController.php:318
* @route '/admin/students/{student}'
*/
const updateForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::update
* @see app/Http/Controllers/Admin/StudentController.php:318
* @route '/admin/students/{student}'
*/
updateForm.put = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\StudentController::toggleActive
* @see app/Http/Controllers/Admin/StudentController.php:378
* @route '/admin/students/{student}/toggle-active'
*/
export const toggleActive = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.definition = {
    methods: ["post"],
    url: '/admin/students/{student}/toggle-active',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::toggleActive
* @see app/Http/Controllers/Admin/StudentController.php:378
* @route '/admin/students/{student}/toggle-active'
*/
toggleActive.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return toggleActive.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::toggleActive
* @see app/Http/Controllers/Admin/StudentController.php:378
* @route '/admin/students/{student}/toggle-active'
*/
toggleActive.post = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::toggleActive
* @see app/Http/Controllers/Admin/StudentController.php:378
* @route '/admin/students/{student}/toggle-active'
*/
const toggleActiveForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::toggleActive
* @see app/Http/Controllers/Admin/StudentController.php:378
* @route '/admin/students/{student}/toggle-active'
*/
toggleActiveForm.post = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: toggleActive.url(args, options),
    method: 'post',
})

toggleActive.form = toggleActiveForm

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
* @see app/Http/Controllers/Admin/StudentController.php:410
* @route '/admin/students/{student}'
*/
export const destroy = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/students/{student}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
* @see app/Http/Controllers/Admin/StudentController.php:410
* @route '/admin/students/{student}'
*/
destroy.url = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { student: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { student: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            student: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        student: typeof args.student === 'object'
        ? args.student.id
        : args.student,
    }

    return destroy.definition.url
            .replace('{student}', parsedArgs.student.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
* @see app/Http/Controllers/Admin/StudentController.php:410
* @route '/admin/students/{student}'
*/
destroy.delete = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
* @see app/Http/Controllers/Admin/StudentController.php:410
* @route '/admin/students/{student}'
*/
const destroyForm = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::destroy
* @see app/Http/Controllers/Admin/StudentController.php:410
* @route '/admin/students/{student}'
*/
destroyForm.delete = (args: { student: number | { id: number } } | [student: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
*/
export const vagues = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

vagues.definition = {
    methods: ["get","head"],
    url: '/admin/students/vagues/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
*/
vagues.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
*/
vagues.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: vagues.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
*/
const vaguesForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
*/
vaguesForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: vagues.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::vagues
* @see app/Http/Controllers/Admin/StudentController.php:445
* @route '/admin/students/vagues/{formationId}'
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
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
*/
export const certifications = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

certifications.definition = {
    methods: ["get","head"],
    url: '/admin/students/certifications/{formationId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
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
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
*/
certifications.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
*/
certifications.head = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: certifications.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
*/
const certificationsForm = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
*/
certificationsForm.get = (args: { formationId: string | number } | [formationId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: certifications.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Admin\StudentController::certifications
* @see app/Http/Controllers/Admin/StudentController.php:459
* @route '/admin/students/certifications/{formationId}'
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

const students = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    toggleActive: Object.assign(toggleActive, toggleActive),
    destroy: Object.assign(destroy, destroy),
    vagues: Object.assign(vagues, vagues),
    certifications: Object.assign(certifications, certifications),
}

export default students