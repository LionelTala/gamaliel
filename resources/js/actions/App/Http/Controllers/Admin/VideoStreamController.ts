import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
export const streamCours = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamCours.url(args, options),
    method: 'get',
})

streamCours.definition = {
    methods: ["get","head"],
    url: '/admin/stream/cours/{cours}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
streamCours.url = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return streamCours.definition.url
            .replace('{cours}', parsedArgs.cours.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
streamCours.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamCours.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
streamCours.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamCours.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
    const streamCoursForm = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: streamCours.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
        streamCoursForm.get = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: streamCours.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamCours
 * @see app/Http/Controllers/Admin/VideoStreamController.php:13
 * @route '/admin/stream/cours/{cours}'
 */
        streamCoursForm.head = (args: { cours: number | { id: number } } | [cours: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: streamCours.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    streamCours.form = streamCoursForm
/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
export const streamLesson = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamLesson.url(args, options),
    method: 'get',
})

streamLesson.definition = {
    methods: ["get","head"],
    url: '/admin/stream/lesson/{lesson}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
streamLesson.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return streamLesson.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
streamLesson.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamLesson.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
streamLesson.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamLesson.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
    const streamLessonForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: streamLesson.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
        streamLessonForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: streamLesson.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\VideoStreamController::streamLesson
 * @see app/Http/Controllers/Admin/VideoStreamController.php:21
 * @route '/admin/stream/lesson/{lesson}'
 */
        streamLessonForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: streamLesson.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    streamLesson.form = streamLessonForm
const VideoStreamController = { streamCours, streamLesson }

export default VideoStreamController