import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/cours',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::index
* @see app/Http/Controllers/Student/CoursController.php:21
* @route '/student/cours'
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
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
export const show = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/cours/{cours}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
show.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
show.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
show.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
const showForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
showForm.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::show
* @see app/Http/Controllers/Student/CoursController.php:132
* @route '/student/cours/{cours}'
*/
showForm.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
export const showLesson = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLesson.url(args, options),
    method: 'get',
})

showLesson.definition = {
    methods: ["get","head"],
    url: '/student/cours/lesson/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showLesson.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showLesson.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showLesson.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showLesson.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showLesson.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
const showLessonForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLesson.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showLessonForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLesson.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Student\CoursController::showLesson
* @see app/Http/Controllers/Student/CoursController.php:268
* @route '/student/cours/lesson/{lesson}'
*/
showLessonForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showLesson.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showLesson.form = showLessonForm

/**
* @see \App\Http\Controllers\Student\CoursController::markLessonAsViewed
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
export const markLessonAsViewed = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markLessonAsViewed.url(args, options),
    method: 'post',
})

markLessonAsViewed.definition = {
    methods: ["post"],
    url: '/student/cours/lesson/{lesson}/view',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CoursController::markLessonAsViewed
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
markLessonAsViewed.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markLessonAsViewed.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::markLessonAsViewed
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
markLessonAsViewed.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markLessonAsViewed.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::markLessonAsViewed
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
const markLessonAsViewedForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markLessonAsViewed.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::markLessonAsViewed
* @see app/Http/Controllers/Student/CoursController.php:357
* @route '/student/cours/lesson/{lesson}/view'
*/
markLessonAsViewedForm.post = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markLessonAsViewed.url(args, options),
    method: 'post',
})

markLessonAsViewed.form = markLessonAsViewedForm

/**
* @see \App\Http\Controllers\Student\CoursController::markAsViewed
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
export const markAsViewed = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsViewed.url(args, options),
    method: 'post',
})

markAsViewed.definition = {
    methods: ["post"],
    url: '/student/cours/{cours}/view',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Student\CoursController::markAsViewed
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
markAsViewed.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markAsViewed.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\CoursController::markAsViewed
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
markAsViewed.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markAsViewed.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::markAsViewed
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
const markAsViewedForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsViewed.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Student\CoursController::markAsViewed
* @see app/Http/Controllers/Student/CoursController.php:411
* @route '/student/cours/{cours}/view'
*/
markAsViewedForm.post = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: markAsViewed.url(args, options),
    method: 'post',
})

markAsViewed.form = markAsViewedForm

const CoursController = { index, show, showLesson, markLessonAsViewed, markAsViewed }

export default CoursController