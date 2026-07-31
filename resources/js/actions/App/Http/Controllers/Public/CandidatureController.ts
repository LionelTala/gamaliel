import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/preinscription',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::create
* @see app/Http/Controllers/Public/CandidatureController.php:21
* @route '/preinscription'
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
* @see \App\Http\Controllers\Public\CandidatureController::store
* @see app/Http/Controllers/Public/CandidatureController.php:62
* @route '/candidatures'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/candidatures',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Public\CandidatureController::store
* @see app/Http/Controllers/Public/CandidatureController.php:62
* @route '/candidatures'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\CandidatureController::store
* @see app/Http/Controllers/Public/CandidatureController.php:62
* @route '/candidatures'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::store
* @see app/Http/Controllers/Public/CandidatureController.php:62
* @route '/candidatures'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::store
* @see app/Http/Controllers/Public/CandidatureController.php:62
* @route '/candidatures'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/candidature/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Public\CandidatureController::success
* @see app/Http/Controllers/Public/CandidatureController.php:138
* @route '/candidature/success'
*/
successForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: success.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

success.form = successForm

const CandidatureController = { create, store, success }

export default CandidatureController