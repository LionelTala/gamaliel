import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
export const cours = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cours.url(args, options),
    method: 'get',
})

cours.definition = {
    methods: ["get","head"],
    url: '/stream/cours/{cours}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
cours.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cours.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
cours.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cours.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
cours.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cours.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
    const coursForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cours.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
        coursForm.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cours.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\VideoStreamController::cours
 * @see app/Http/Controllers/Student/VideoStreamController.php:14
 * @route '/stream/cours/{cours}'
 */
        coursForm.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cours.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cours.form = coursForm
/**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
export const lesson = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lesson.url(args, options),
    method: 'get',
})

lesson.definition = {
    methods: ["get","head"],
    url: '/stream/lesson/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
lesson.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return lesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
lesson.get = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lesson.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
lesson.head = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lesson.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
    const lessonForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lesson.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
        lessonForm.get = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lesson.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Student\VideoStreamController::lesson
 * @see app/Http/Controllers/Student/VideoStreamController.php:26
 * @route '/stream/lesson/{lesson}'
 */
        lessonForm.head = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lesson.form = lessonForm
const stream = {
    cours: Object.assign(cours, cours),
lesson: Object.assign(lesson, lesson),
}

export default stream