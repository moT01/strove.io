/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
(function() {
var __m = ["exports","require","vs/base/common/platform","vs/base/common/extpath","vs/base/common/path","vs/base/common/strings","vs/base/common/uri","vs/base/common/network","vs/base/common/map","vs/base/common/async","vs/base/common/arrays","vs/base/common/glob","vs/base/common/process","vs/base/common/resources","vs/base/common/iterator","vs/base/common/lifecycle","vs/base/common/event","vs/base/common/errors","vs/base/common/cancellation","vs/workbench/contrib/output/common/outputLinkComputer","vs/editor/common/core/range"];
var __M = function(deps) {
  var result = [];
  for (var i = 0, len = deps.length; i < len; i++) {
    result[i] = __m[deps[i]];
  }
  return result;
};
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[9/*vs/base/common/async*/], __M([1/*require*/,0/*exports*/,18/*vs/base/common/cancellation*/,17/*vs/base/common/errors*/,16/*vs/base/common/event*/,15/*vs/base/common/lifecycle*/]), function (require, exports, cancellation_1, errors, event_1, lifecycle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isThenable(obj) {
        return obj && typeof obj.then === 'function';
    }
    exports.isThenable = isThenable;
    function createCancelablePromise(callback) {
        const source = new cancellation_1.CancellationTokenSource();
        const thenable = callback(source.token);
        const promise = new Promise((resolve, reject) => {
            source.token.onCancellationRequested(() => {
                reject(errors.canceled());
            });
            Promise.resolve(thenable).then(value => {
                source.dispose();
                resolve(value);
            }, err => {
                source.dispose();
                reject(err);
            });
        });
        return new class {
            cancel() {
                source.cancel();
            }
            then(resolve, reject) {
                return promise.then(resolve, reject);
            }
            catch(reject) {
                return this.then(undefined, reject);
            }
            finally(onfinally) {
                return promise.finally(onfinally);
            }
        };
    }
    exports.createCancelablePromise = createCancelablePromise;
    function raceCancellation(promise, token, defaultValue) {
        return Promise.race([promise, new Promise(resolve => token.onCancellationRequested(() => resolve(defaultValue)))]);
    }
    exports.raceCancellation = raceCancellation;
    function raceTimeout(promise, timeout, onTimeout) {
        let promiseResolve = undefined;
        const timer = setTimeout(() => {
            promiseResolve === null || promiseResolve === void 0 ? void 0 : promiseResolve();
            onTimeout === null || onTimeout === void 0 ? void 0 : onTimeout();
        }, timeout);
        return Promise.race([
            promise.finally(() => clearTimeout(timer)),
            new Promise(resolve => promiseResolve = resolve)
        ]);
    }
    exports.raceTimeout = raceTimeout;
    function asPromise(callback) {
        return new Promise((resolve, reject) => {
            const item = callback();
            if (isThenable(item)) {
                item.then(resolve, reject);
            }
            else {
                resolve(item);
            }
        });
    }
    exports.asPromise = asPromise;
    /**
     * A helper to prevent accumulation of sequential async tasks.
     *
     * Imagine a mail man with the sole task of delivering letters. As soon as
     * a letter submitted for delivery, he drives to the destination, delivers it
     * and returns to his base. Imagine that during the trip, N more letters were submitted.
     * When the mail man returns, he picks those N letters and delivers them all in a
     * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
     *
     * The throttler implements this via the queue() method, by providing it a task
     * factory. Following the example:
     *
     * 		const throttler = new Throttler();
     * 		const letters = [];
     *
     * 		function deliver() {
     * 			const lettersToDeliver = letters;
     * 			letters = [];
     * 			return makeTheTrip(lettersToDeliver);
     * 		}
     *
     * 		function onLetterReceived(l) {
     * 			letters.push(l);
     * 			throttler.queue(deliver);
     * 		}
     */
    class Throttler {
        constructor() {
            this.activePromise = null;
            this.queuedPromise = null;
            this.queuedPromiseFactory = null;
        }
        queue(promiseFactory) {
            if (this.activePromise) {
                this.queuedPromiseFactory = promiseFactory;
                if (!this.queuedPromise) {
                    const onComplete = () => {
                        this.queuedPromise = null;
                        const result = this.queue(this.queuedPromiseFactory);
                        this.queuedPromiseFactory = null;
                        return result;
                    };
                    this.queuedPromise = new Promise(c => {
                        this.activePromise.then(onComplete, onComplete).then(c);
                    });
                }
                return new Promise((c, e) => {
                    this.queuedPromise.then(c, e);
                });
            }
            this.activePromise = promiseFactory();
            return new Promise((c, e) => {
                this.activePromise.then((result) => {
                    this.activePromise = null;
                    c(result);
                }, (err) => {
                    this.activePromise = null;
                    e(err);
                });
            });
        }
    }
    exports.Throttler = Throttler;
    class Sequencer {
        constructor() {
            this.current = Promise.resolve(null);
        }
        queue(promiseTask) {
            return this.current = this.current.then(() => promiseTask());
        }
    }
    exports.Sequencer = Sequencer;
    /**
     * A helper to delay execution of a task that is being requested often.
     *
     * Following the throttler, now imagine the mail man wants to optimize the number of
     * trips proactively. The trip itself can be long, so he decides not to make the trip
     * as soon as a letter is submitted. Instead he waits a while, in case more
     * letters are submitted. After said waiting period, if no letters were submitted, he
     * decides to make the trip. Imagine that N more letters were submitted after the first
     * one, all within a short period of time between each other. Even though N+1
     * submissions occurred, only 1 delivery was made.
     *
     * The delayer offers this behavior via the trigger() method, into which both the task
     * to be executed and the waiting period (delay) must be passed in as arguments. Following
     * the example:
     *
     * 		const delayer = new Delayer(WAITING_PERIOD);
     * 		const letters = [];
     *
     * 		function letterReceived(l) {
     * 			letters.push(l);
     * 			delayer.trigger(() => { return makeTheTrip(); });
     * 		}
     */
    class Delayer {
        constructor(defaultDelay) {
            this.defaultDelay = defaultDelay;
            this.timeout = null;
            this.completionPromise = null;
            this.doResolve = null;
            this.doReject = null;
            this.task = null;
        }
        trigger(task, delay = this.defaultDelay) {
            this.task = task;
            this.cancelTimeout();
            if (!this.completionPromise) {
                this.completionPromise = new Promise((c, e) => {
                    this.doResolve = c;
                    this.doReject = e;
                }).then(() => {
                    this.completionPromise = null;
                    this.doResolve = null;
                    if (this.task) {
                        const task = this.task;
                        this.task = null;
                        return task();
                    }
                    return undefined;
                });
            }
            this.timeout = setTimeout(() => {
                this.timeout = null;
                if (this.doResolve) {
                    this.doResolve(null);
                }
            }, delay);
            return this.completionPromise;
        }
        isTriggered() {
            return this.timeout !== null;
        }
        cancel() {
            this.cancelTimeout();
            if (this.completionPromise) {
                if (this.doReject) {
                    this.doReject(errors.canceled());
                }
                this.completionPromise = null;
            }
        }
        cancelTimeout() {
            if (this.timeout !== null) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        }
        dispose() {
            this.cancelTimeout();
        }
    }
    exports.Delayer = Delayer;
    /**
     * A helper to delay execution of a task that is being requested often, while
     * preventing accumulation of consecutive executions, while the task runs.
     *
     * The mail man is clever and waits for a certain amount of time, before going
     * out to deliver letters. While the mail man is going out, more letters arrive
     * and can only be delivered once he is back. Once he is back the mail man will
     * do one more trip to deliver the letters that have accumulated while he was out.
     */
    class ThrottledDelayer {
        constructor(defaultDelay) {
            this.delayer = new Delayer(defaultDelay);
            this.throttler = new Throttler();
        }
        trigger(promiseFactory, delay) {
            return this.delayer.trigger(() => this.throttler.queue(promiseFactory), delay);
        }
        isTriggered() {
            return this.delayer.isTriggered();
        }
        cancel() {
            this.delayer.cancel();
        }
        dispose() {
            this.delayer.dispose();
        }
    }
    exports.ThrottledDelayer = ThrottledDelayer;
    /**
     * A barrier that is initially closed and then becomes opened permanently.
     */
    class Barrier {
        constructor() {
            this._isOpen = false;
            this._promise = new Promise((c, e) => {
                this._completePromise = c;
            });
        }
        isOpen() {
            return this._isOpen;
        }
        open() {
            this._isOpen = true;
            this._completePromise(true);
        }
        wait() {
            return this._promise;
        }
    }
    exports.Barrier = Barrier;
    function timeout(millis, token) {
        if (!token) {
            return createCancelablePromise(token => timeout(millis, token));
        }
        return new Promise((resolve, reject) => {
            const handle = setTimeout(resolve, millis);
            token.onCancellationRequested(() => {
                clearTimeout(handle);
                reject(errors.canceled());
            });
        });
    }
    exports.timeout = timeout;
    function disposableTimeout(handler, timeout = 0) {
        const timer = setTimeout(handler, timeout);
        return lifecycle_1.toDisposable(() => clearTimeout(timer));
    }
    exports.disposableTimeout = disposableTimeout;
    function ignoreErrors(promise) {
        return promise.then(undefined, _ => undefined);
    }
    exports.ignoreErrors = ignoreErrors;
    /**
     * Runs the provided list of promise factories in sequential order. The returned
     * promise will complete to an array of results from each promise.
     */
    function sequence(promiseFactories) {
        const results = [];
        let index = 0;
        const len = promiseFactories.length;
        function next() {
            return index < len ? promiseFactories[index++]() : null;
        }
        function thenHandler(result) {
            if (result !== undefined && result !== null) {
                results.push(result);
            }
            const n = next();
            if (n) {
                return n.then(thenHandler);
            }
            return Promise.resolve(results);
        }
        return Promise.resolve(null).then(thenHandler);
    }
    exports.sequence = sequence;
    function first(promiseFactories, shouldStop = t => !!t, defaultValue = null) {
        let index = 0;
        const len = promiseFactories.length;
        const loop = () => {
            if (index >= len) {
                return Promise.resolve(defaultValue);
            }
            const factory = promiseFactories[index++];
            const promise = Promise.resolve(factory());
            return promise.then(result => {
                if (shouldStop(result)) {
                    return Promise.resolve(result);
                }
                return loop();
            });
        };
        return loop();
    }
    exports.first = first;
    /**
     * A helper to queue N promises and run them all with a max degree of parallelism. The helper
     * ensures that at any time no more than M promises are running at the same time.
     */
    class Limiter {
        constructor(maxDegreeOfParalellism) {
            this._size = 0;
            this.maxDegreeOfParalellism = maxDegreeOfParalellism;
            this.outstandingPromises = [];
            this.runningPromises = 0;
            this._onFinished = new event_1.Emitter();
        }
        get onFinished() {
            return this._onFinished.event;
        }
        get size() {
            return this._size;
            // return this.runningPromises + this.outstandingPromises.length;
        }
        queue(factory) {
            this._size++;
            return new Promise((c, e) => {
                this.outstandingPromises.push({ factory, c, e });
                this.consume();
            });
        }
        consume() {
            while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
                const iLimitedTask = this.outstandingPromises.shift();
                this.runningPromises++;
                const promise = iLimitedTask.factory();
                promise.then(iLimitedTask.c, iLimitedTask.e);
                promise.then(() => this.consumed(), () => this.consumed());
            }
        }
        consumed() {
            this._size--;
            this.runningPromises--;
            if (this.outstandingPromises.length > 0) {
                this.consume();
            }
            else {
                this._onFinished.fire();
            }
        }
        dispose() {
            this._onFinished.dispose();
        }
    }
    exports.Limiter = Limiter;
    /**
     * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
     */
    class Queue extends Limiter {
        constructor() {
            super(1);
        }
    }
    exports.Queue = Queue;
    /**
     * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
     * by disposing them once the queue is empty.
     */
    class ResourceQueue {
        constructor() {
            this.queues = new Map();
        }
        queueFor(resource) {
            const key = resource.toString();
            if (!this.queues.has(key)) {
                const queue = new Queue();
                queue.onFinished(() => {
                    queue.dispose();
                    this.queues.delete(key);
                });
                this.queues.set(key, queue);
            }
            return this.queues.get(key);
        }
        dispose() {
            this.queues.forEach(queue => queue.dispose());
            this.queues.clear();
        }
    }
    exports.ResourceQueue = ResourceQueue;
    class TimeoutTimer {
        constructor(runner, timeout) {
            this._token = -1;
            if (typeof runner === 'function' && typeof timeout === 'number') {
                this.setIfNotSet(runner, timeout);
            }
        }
        dispose() {
            this.cancel();
        }
        cancel() {
            if (this._token !== -1) {
                clearTimeout(this._token);
                this._token = -1;
            }
        }
        cancelAndSet(runner, timeout) {
            this.cancel();
            this._token = setTimeout(() => {
                this._token = -1;
                runner();
            }, timeout);
        }
        setIfNotSet(runner, timeout) {
            if (this._token !== -1) {
                // timer is already set
                return;
            }
            this._token = setTimeout(() => {
                this._token = -1;
                runner();
            }, timeout);
        }
    }
    exports.TimeoutTimer = TimeoutTimer;
    class IntervalTimer {
        constructor() {
            this._token = -1;
        }
        dispose() {
            this.cancel();
        }
        cancel() {
            if (this._token !== -1) {
                clearInterval(this._token);
                this._token = -1;
            }
        }
        cancelAndSet(runner, interval) {
            this.cancel();
            this._token = setInterval(() => {
                runner();
            }, interval);
        }
    }
    exports.IntervalTimer = IntervalTimer;
    class RunOnceScheduler {
        constructor(runner, timeout) {
            this.timeoutToken = -1;
            this.runner = runner;
            this.timeout = timeout;
            this.timeoutHandler = this.onTimeout.bind(this);
        }
        /**
         * Dispose RunOnceScheduler
         */
        dispose() {
            this.cancel();
            this.runner = null;
        }
        /**
         * Cancel current scheduled runner (if any).
         */
        cancel() {
            if (this.isScheduled()) {
                clearTimeout(this.timeoutToken);
                this.timeoutToken = -1;
            }
        }
        /**
         * Cancel previous runner (if any) & schedule a new runner.
         */
        schedule(delay = this.timeout) {
            this.cancel();
            this.timeoutToken = setTimeout(this.timeoutHandler, delay);
        }
        /**
         * Returns true if scheduled.
         */
        isScheduled() {
            return this.timeoutToken !== -1;
        }
        onTimeout() {
            this.timeoutToken = -1;
            if (this.runner) {
                this.doRun();
            }
        }
        doRun() {
            if (this.runner) {
                this.runner();
            }
        }
    }
    exports.RunOnceScheduler = RunOnceScheduler;
    class RunOnceWorker extends RunOnceScheduler {
        constructor(runner, timeout) {
            super(runner, timeout);
            this.units = [];
        }
        work(unit) {
            this.units.push(unit);
            if (!this.isScheduled()) {
                this.schedule();
            }
        }
        doRun() {
            const units = this.units;
            this.units = [];
            if (this.runner) {
                this.runner(units);
            }
        }
        dispose() {
            this.units = [];
            super.dispose();
        }
    }
    exports.RunOnceWorker = RunOnceWorker;
    (function () {
        if (typeof requestIdleCallback !== 'function' || typeof cancelIdleCallback !== 'function') {
            const dummyIdle = Object.freeze({
                didTimeout: true,
                timeRemaining() { return 15; }
            });
            exports.runWhenIdle = (runner) => {
                const handle = setTimeout(() => runner(dummyIdle));
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                        clearTimeout(handle);
                    }
                };
            };
        }
        else {
            exports.runWhenIdle = (runner, timeout) => {
                const handle = requestIdleCallback(runner, typeof timeout === 'number' ? { timeout } : undefined);
                let disposed = false;
                return {
                    dispose() {
                        if (disposed) {
                            return;
                        }
                        disposed = true;
                        cancelIdleCallback(handle);
                    }
                };
            };
        }
    })();
    /**
     * An implementation of the "idle-until-urgent"-strategy as introduced
     * here: https://philipwalton.com/articles/idle-until-urgent/
     */
    class IdleValue {
        constructor(executor) {
            this._didRun = false;
            this._executor = () => {
                try {
                    this._value = executor();
                }
                catch (err) {
                    this._error = err;
                }
                finally {
                    this._didRun = true;
                }
            };
            this._handle = exports.runWhenIdle(() => this._executor());
        }
        dispose() {
            this._handle.dispose();
        }
        getValue() {
            if (!this._didRun) {
                this._handle.dispose();
                this._executor();
            }
            if (this._error) {
                throw this._error;
            }
            return this._value;
        }
    }
    exports.IdleValue = IdleValue;
    //#endregion
    async function retry(task, delay, retries) {
        let lastError;
        for (let i = 0; i < retries; i++) {
            try {
                return await task();
            }
            catch (error) {
                lastError = error;
                await timeout(delay);
            }
        }
        throw lastError;
    }
    exports.retry = retry;
    class TaskSequentializer {
        hasPending(taskId) {
            if (!this._pending) {
                return false;
            }
            if (typeof taskId === 'number') {
                return this._pending.taskId === taskId;
            }
            return !!this._pending;
        }
        get pending() {
            return this._pending ? this._pending.promise : undefined;
        }
        cancelPending() {
            var _a;
            (_a = this._pending) === null || _a === void 0 ? void 0 : _a.cancel();
        }
        setPending(taskId, promise, onCancel) {
            this._pending = { taskId: taskId, cancel: () => onCancel === null || onCancel === void 0 ? void 0 : onCancel(), promise };
            promise.then(() => this.donePending(taskId), () => this.donePending(taskId));
            return promise;
        }
        donePending(taskId) {
            if (this._pending && taskId === this._pending.taskId) {
                // only set pending to done if the promise finished that is associated with that taskId
                this._pending = undefined;
                // schedule the next task now that we are free if we have any
                this.triggerNext();
            }
        }
        triggerNext() {
            if (this._next) {
                const next = this._next;
                this._next = undefined;
                // Run next task and complete on the associated promise
                next.run().then(next.promiseResolve, next.promiseReject);
            }
        }
        setNext(run) {
            // this is our first next task, so we create associated promise with it
            // so that we can return a promise that completes when the task has
            // completed.
            if (!this._next) {
                let promiseResolve;
                let promiseReject;
                const promise = new Promise((resolve, reject) => {
                    promiseResolve = resolve;
                    promiseReject = reject;
                });
                this._next = {
                    run,
                    promise,
                    promiseResolve: promiseResolve,
                    promiseReject: promiseReject
                };
            }
            // we have a previous next task, just overwrite it
            else {
                this._next.run = run;
            }
            return this._next.promise;
        }
    }
    exports.TaskSequentializer = TaskSequentializer;
});
//#endregion

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[12/*vs/base/common/process*/], __M([1/*require*/,0/*exports*/,2/*vs/base/common/platform*/]), function (require, exports, platform_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const safeProcess = (typeof process === 'undefined') ? {
        cwd() { return '/'; },
        env: Object.create(null),
        get platform() { return platform_1.isWindows ? 'win32' : platform_1.isMacintosh ? 'darwin' : 'linux'; },
        nextTick(callback) { return platform_1.setImmediate(callback); }
    } : process;
    exports.cwd = safeProcess.cwd;
    exports.env = safeProcess.env;
    exports.platform = safeProcess.platform;
    exports.nextTick = safeProcess.nextTick;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[4/*vs/base/common/path*/], __M([1/*require*/,0/*exports*/,12/*vs/base/common/process*/]), function (require, exports, process) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const CHAR_UPPERCASE_A = 65; /* A */
    const CHAR_LOWERCASE_A = 97; /* a */
    const CHAR_UPPERCASE_Z = 90; /* Z */
    const CHAR_LOWERCASE_Z = 122; /* z */
    const CHAR_DOT = 46; /* . */
    const CHAR_FORWARD_SLASH = 47; /* / */
    const CHAR_BACKWARD_SLASH = 92; /* \ */
    const CHAR_COLON = 58; /* : */
    const CHAR_QUESTION_MARK = 63; /* ? */
    class ErrorInvalidArgType extends Error {
        constructor(name, expected, actual) {
            // determiner: 'must be' or 'must not be'
            let determiner;
            if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
                determiner = 'must not be';
                expected = expected.replace(/^not /, '');
            }
            else {
                determiner = 'must be';
            }
            const type = name.indexOf('.') !== -1 ? 'property' : 'argument';
            let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
            msg += `. Received type ${typeof actual}`;
            super(msg);
            this.code = 'ERR_INVALID_ARG_TYPE';
        }
    }
    function validateString(value, name) {
        if (typeof value !== 'string') {
            throw new ErrorInvalidArgType(name, 'string', value);
        }
    }
    function isPathSeparator(code) {
        return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    }
    function isPosixPathSeparator(code) {
        return code === CHAR_FORWARD_SLASH;
    }
    function isWindowsDeviceRoot(code) {
        return code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z ||
            code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z;
    }
    // Resolves . and .. elements in a path with directory names
    function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
        let res = '';
        let lastSegmentLength = 0;
        let lastSlash = -1;
        let dots = 0;
        let code;
        for (let i = 0; i <= path.length; ++i) {
            if (i < path.length) {
                code = path.charCodeAt(i);
            }
            else if (isPathSeparator(code)) {
                break;
            }
            else {
                code = CHAR_FORWARD_SLASH;
            }
            if (isPathSeparator(code)) {
                if (lastSlash === i - 1 || dots === 1) {
                    // NOOP
                }
                else if (lastSlash !== i - 1 && dots === 2) {
                    if (res.length < 2 || lastSegmentLength !== 2 ||
                        res.charCodeAt(res.length - 1) !== CHAR_DOT ||
                        res.charCodeAt(res.length - 2) !== CHAR_DOT) {
                        if (res.length > 2) {
                            const lastSlashIndex = res.lastIndexOf(separator);
                            if (lastSlashIndex === -1) {
                                res = '';
                                lastSegmentLength = 0;
                            }
                            else {
                                res = res.slice(0, lastSlashIndex);
                                lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                            }
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                        else if (res.length === 2 || res.length === 1) {
                            res = '';
                            lastSegmentLength = 0;
                            lastSlash = i;
                            dots = 0;
                            continue;
                        }
                    }
                    if (allowAboveRoot) {
                        if (res.length > 0) {
                            res += `${separator}..`;
                        }
                        else {
                            res = '..';
                        }
                        lastSegmentLength = 2;
                    }
                }
                else {
                    if (res.length > 0) {
                        res += separator + path.slice(lastSlash + 1, i);
                    }
                    else {
                        res = path.slice(lastSlash + 1, i);
                    }
                    lastSegmentLength = i - lastSlash - 1;
                }
                lastSlash = i;
                dots = 0;
            }
            else if (code === CHAR_DOT && dots !== -1) {
                ++dots;
            }
            else {
                dots = -1;
            }
        }
        return res;
    }
    function _format(sep, pathObject) {
        const dir = pathObject.dir || pathObject.root;
        const base = pathObject.base ||
            ((pathObject.name || '') + (pathObject.ext || ''));
        if (!dir) {
            return base;
        }
        if (dir === pathObject.root) {
            return dir + base;
        }
        return dir + sep + base;
    }
    exports.win32 = {
        // path.resolve([from ...], to)
        resolve(...pathSegments) {
            let resolvedDevice = '';
            let resolvedTail = '';
            let resolvedAbsolute = false;
            for (let i = pathSegments.length - 1; i >= -1; i--) {
                let path;
                if (i >= 0) {
                    path = pathSegments[i];
                }
                else if (!resolvedDevice) {
                    path = process.cwd();
                }
                else {
                    // Windows has the concept of drive-specific current working
                    // directories. If we've resolved a drive letter but not yet an
                    // absolute path, get cwd for that drive, or the process cwd if
                    // the drive cwd is not available. We're sure the device is not
                    // a UNC path at this points, because UNC paths are always absolute.
                    path = process.env['=' + resolvedDevice] || process.cwd();
                    // Verify that a cwd was found and that it actually points
                    // to our drive. If not, default to the drive's root.
                    if (path === undefined ||
                        path.slice(0, 3).toLowerCase() !==
                            resolvedDevice.toLowerCase() + '\\') {
                        path = resolvedDevice + '\\';
                    }
                }
                validateString(path, 'path');
                // Skip empty entries
                if (path.length === 0) {
                    continue;
                }
                const len = path.length;
                let rootEnd = 0;
                let device = '';
                let isAbsolute = false;
                const code = path.charCodeAt(0);
                // Try to match a root
                if (len > 1) {
                    if (isPathSeparator(code)) {
                        // Possible UNC root
                        // If we started with a separator, we know we at least have an
                        // absolute path of some kind (UNC or otherwise)
                        isAbsolute = true;
                        if (isPathSeparator(path.charCodeAt(1))) {
                            // Matched double path separator at beginning
                            let j = 2;
                            let last = j;
                            // Match 1 or more non-path separators
                            for (; j < len; ++j) {
                                if (isPathSeparator(path.charCodeAt(j))) {
                                    break;
                                }
                            }
                            if (j < len && j !== last) {
                                const firstPart = path.slice(last, j);
                                // Matched!
                                last = j;
                                // Match 1 or more path separators
                                for (; j < len; ++j) {
                                    if (!isPathSeparator(path.charCodeAt(j))) {
                                        break;
                                    }
                                }
                                if (j < len && j !== last) {
                                    // Matched!
                                    last = j;
                                    // Match 1 or more non-path separators
                                    for (; j < len; ++j) {
                                        if (isPathSeparator(path.charCodeAt(j))) {
                                            break;
                                        }
                                    }
                                    if (j === len) {
                                        // We matched a UNC root only
                                        device = '\\\\' + firstPart + '\\' + path.slice(last);
                                        rootEnd = j;
                                    }
                                    else if (j !== last) {
                                        // We matched a UNC root with leftovers
                                        device = '\\\\' + firstPart + '\\' + path.slice(last, j);
                                        rootEnd = j;
                                    }
                                }
                            }
                        }
                        else {
                            rootEnd = 1;
                        }
                    }
                    else if (isWindowsDeviceRoot(code)) {
                        // Possible device root
                        if (path.charCodeAt(1) === CHAR_COLON) {
                            device = path.slice(0, 2);
                            rootEnd = 2;
                            if (len > 2) {
                                if (isPathSeparator(path.charCodeAt(2))) {
                                    // Treat separator following drive name as an absolute path
                                    // indicator
                                    isAbsolute = true;
                                    rootEnd = 3;
                                }
                            }
                        }
                    }
                }
                else if (isPathSeparator(code)) {
                    // `path` contains just a path separator
                    rootEnd = 1;
                    isAbsolute = true;
                }
                if (device.length > 0 &&
                    resolvedDevice.length > 0 &&
                    device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                    // This path points to another device so it is not applicable
                    continue;
                }
                if (resolvedDevice.length === 0 && device.length > 0) {
                    resolvedDevice = device;
                }
                if (!resolvedAbsolute) {
                    resolvedTail = path.slice(rootEnd) + '\\' + resolvedTail;
                    resolvedAbsolute = isAbsolute;
                }
                if (resolvedDevice.length > 0 && resolvedAbsolute) {
                    break;
                }
            }
            // At this point the path should be resolved to a full absolute path,
            // but handle relative paths to be safe (might happen when process.cwd()
            // fails)
            // Normalize the tail path
            resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, '\\', isPathSeparator);
            return (resolvedDevice + (resolvedAbsolute ? '\\' : '') + resolvedTail) ||
                '.';
        },
        normalize(path) {
            validateString(path, 'path');
            const len = path.length;
            if (len === 0) {
                return '.';
            }
            let rootEnd = 0;
            let device;
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len > 1) {
                if (isPathSeparator(code)) {
                    // Possible UNC root
                    // If we started with a separator, we know we at least have an absolute
                    // path of some kind (UNC or otherwise)
                    isAbsolute = true;
                    if (isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (isPathSeparator(path.charCodeAt(j))) {
                                break;
                            }
                        }
                        if (j < len && j !== last) {
                            const firstPart = path.slice(last, j);
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            for (; j < len; ++j) {
                                if (!isPathSeparator(path.charCodeAt(j))) {
                                    break;
                                }
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                for (; j < len; ++j) {
                                    if (isPathSeparator(path.charCodeAt(j))) {
                                        break;
                                    }
                                }
                                if (j === len) {
                                    // We matched a UNC root only
                                    // Return the normalized version of the UNC root since there
                                    // is nothing left to process
                                    return '\\\\' + firstPart + '\\' + path.slice(last) + '\\';
                                }
                                else if (j !== last) {
                                    // We matched a UNC root with leftovers
                                    device = '\\\\' + firstPart + '\\' + path.slice(last, j);
                                    rootEnd = j;
                                }
                            }
                        }
                    }
                    else {
                        rootEnd = 1;
                    }
                }
                else if (isWindowsDeviceRoot(code)) {
                    // Possible device root
                    if (path.charCodeAt(1) === CHAR_COLON) {
                        device = path.slice(0, 2);
                        rootEnd = 2;
                        if (len > 2) {
                            if (isPathSeparator(path.charCodeAt(2))) {
                                // Treat separator following drive name as an absolute path
                                // indicator
                                isAbsolute = true;
                                rootEnd = 3;
                            }
                        }
                    }
                }
            }
            else if (isPathSeparator(code)) {
                // `path` contains just a path separator, exit early to avoid unnecessary
                // work
                return '\\';
            }
            let tail;
            if (rootEnd < len) {
                tail = normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator);
            }
            else {
                tail = '';
            }
            if (tail.length === 0 && !isAbsolute) {
                tail = '.';
            }
            if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
                tail += '\\';
            }
            if (device === undefined) {
                if (isAbsolute) {
                    if (tail.length > 0) {
                        return '\\' + tail;
                    }
                    else {
                        return '\\';
                    }
                }
                else if (tail.length > 0) {
                    return tail;
                }
                else {
                    return '';
                }
            }
            else if (isAbsolute) {
                if (tail.length > 0) {
                    return device + '\\' + tail;
                }
                else {
                    return device + '\\';
                }
            }
            else if (tail.length > 0) {
                return device + tail;
            }
            else {
                return device;
            }
        },
        isAbsolute(path) {
            validateString(path, 'path');
            const len = path.length;
            if (len === 0) {
                return false;
            }
            const code = path.charCodeAt(0);
            if (isPathSeparator(code)) {
                return true;
            }
            else if (isWindowsDeviceRoot(code)) {
                // Possible device root
                if (len > 2 && path.charCodeAt(1) === CHAR_COLON) {
                    if (isPathSeparator(path.charCodeAt(2))) {
                        return true;
                    }
                }
            }
            return false;
        },
        join(...paths) {
            if (paths.length === 0) {
                return '.';
            }
            let joined;
            let firstPart;
            for (let i = 0; i < paths.length; ++i) {
                const arg = paths[i];
                validateString(arg, 'path');
                if (arg.length > 0) {
                    if (joined === undefined) {
                        joined = firstPart = arg;
                    }
                    else {
                        joined += '\\' + arg;
                    }
                }
            }
            if (joined === undefined) {
                return '.';
            }
            // Make sure that the joined path doesn't start with two slashes, because
            // normalize() will mistake it for an UNC path then.
            //
            // This step is skipped when it is very clear that the user actually
            // intended to point at an UNC path. This is assumed when the first
            // non-empty string arguments starts with exactly two slashes followed by
            // at least one more non-slash character.
            //
            // Note that for normalize() to treat a path as an UNC path it needs to
            // have at least 2 components, so we don't filter for that here.
            // This means that the user can use join to construct UNC paths from
            // a server name and a share name; for example:
            //   path.join('//server', 'share') -> '\\\\server\\share\\')
            let needsReplace = true;
            let slashCount = 0;
            if (typeof firstPart === 'string' && isPathSeparator(firstPart.charCodeAt(0))) {
                ++slashCount;
                const firstLen = firstPart.length;
                if (firstLen > 1) {
                    if (isPathSeparator(firstPart.charCodeAt(1))) {
                        ++slashCount;
                        if (firstLen > 2) {
                            if (isPathSeparator(firstPart.charCodeAt(2))) {
                                ++slashCount;
                            }
                            else {
                                // We matched a UNC path in the first part
                                needsReplace = false;
                            }
                        }
                    }
                }
            }
            if (needsReplace) {
                // Find any more consecutive slashes we need to replace
                for (; slashCount < joined.length; ++slashCount) {
                    if (!isPathSeparator(joined.charCodeAt(slashCount))) {
                        break;
                    }
                }
                // Replace the slashes if needed
                if (slashCount >= 2) {
                    joined = '\\' + joined.slice(slashCount);
                }
            }
            return exports.win32.normalize(joined);
        },
        // It will solve the relative path from `from` to `to`, for instance:
        //  from = 'C:\\orandea\\test\\aaa'
        //  to = 'C:\\orandea\\impl\\bbb'
        // The output of the function should be: '..\\..\\impl\\bbb'
        relative(from, to) {
            validateString(from, 'from');
            validateString(to, 'to');
            if (from === to) {
                return '';
            }
            const fromOrig = exports.win32.resolve(from);
            const toOrig = exports.win32.resolve(to);
            if (fromOrig === toOrig) {
                return '';
            }
            from = fromOrig.toLowerCase();
            to = toOrig.toLowerCase();
            if (from === to) {
                return '';
            }
            // Trim any leading backslashes
            let fromStart = 0;
            for (; fromStart < from.length; ++fromStart) {
                if (from.charCodeAt(fromStart) !== CHAR_BACKWARD_SLASH) {
                    break;
                }
            }
            // Trim trailing backslashes (applicable to UNC paths only)
            let fromEnd = from.length;
            for (; fromEnd - 1 > fromStart; --fromEnd) {
                if (from.charCodeAt(fromEnd - 1) !== CHAR_BACKWARD_SLASH) {
                    break;
                }
            }
            const fromLen = (fromEnd - fromStart);
            // Trim any leading backslashes
            let toStart = 0;
            for (; toStart < to.length; ++toStart) {
                if (to.charCodeAt(toStart) !== CHAR_BACKWARD_SLASH) {
                    break;
                }
            }
            // Trim trailing backslashes (applicable to UNC paths only)
            let toEnd = to.length;
            for (; toEnd - 1 > toStart; --toEnd) {
                if (to.charCodeAt(toEnd - 1) !== CHAR_BACKWARD_SLASH) {
                    break;
                }
            }
            const toLen = (toEnd - toStart);
            // Compare paths to find the longest common path from root
            const length = (fromLen < toLen ? fromLen : toLen);
            let lastCommonSep = -1;
            let i = 0;
            for (; i <= length; ++i) {
                if (i === length) {
                    if (toLen > length) {
                        if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
                            // We get here if `from` is the exact base path for `to`.
                            // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                            return toOrig.slice(toStart + i + 1);
                        }
                        else if (i === 2) {
                            // We get here if `from` is the device root.
                            // For example: from='C:\\'; to='C:\\foo'
                            return toOrig.slice(toStart + i);
                        }
                    }
                    if (fromLen > length) {
                        if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
                            // We get here if `to` is the exact base path for `from`.
                            // For example: from='C:\\foo\\bar'; to='C:\\foo'
                            lastCommonSep = i;
                        }
                        else if (i === 2) {
                            // We get here if `to` is the device root.
                            // For example: from='C:\\foo\\bar'; to='C:\\'
                            lastCommonSep = 3;
                        }
                    }
                    break;
                }
                const fromCode = from.charCodeAt(fromStart + i);
                const toCode = to.charCodeAt(toStart + i);
                if (fromCode !== toCode) {
                    break;
                }
                else if (fromCode === CHAR_BACKWARD_SLASH) {
                    lastCommonSep = i;
                }
            }
            // We found a mismatch before the first common path separator was seen, so
            // return the original `to`.
            if (i !== length && lastCommonSep === -1) {
                return toOrig;
            }
            let out = '';
            if (lastCommonSep === -1) {
                lastCommonSep = 0;
            }
            // Generate the relative path based on the path difference between `to` and
            // `from`
            for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
                if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
                    if (out.length === 0) {
                        out += '..';
                    }
                    else {
                        out += '\\..';
                    }
                }
            }
            // Lastly, append the rest of the destination (`to`) path that comes after
            // the common path parts
            if (out.length > 0) {
                return out + toOrig.slice(toStart + lastCommonSep, toEnd);
            }
            else {
                toStart += lastCommonSep;
                if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
                    ++toStart;
                }
                return toOrig.slice(toStart, toEnd);
            }
        },
        toNamespacedPath(path) {
            // Note: this will *probably* throw somewhere.
            if (typeof path !== 'string') {
                return path;
            }
            if (path.length === 0) {
                return '';
            }
            const resolvedPath = exports.win32.resolve(path);
            if (resolvedPath.length >= 3) {
                if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
                    // Possible UNC root
                    if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
                        const code = resolvedPath.charCodeAt(2);
                        if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
                            // Matched non-long UNC root, convert the path to a long UNC path
                            return '\\\\?\\UNC\\' + resolvedPath.slice(2);
                        }
                    }
                }
                else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0))) {
                    // Possible device root
                    if (resolvedPath.charCodeAt(1) === CHAR_COLON &&
                        resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
                        // Matched device root, convert the path to a long UNC path
                        return '\\\\?\\' + resolvedPath;
                    }
                }
            }
            return path;
        },
        dirname(path) {
            validateString(path, 'path');
            const len = path.length;
            if (len === 0) {
                return '.';
            }
            let rootEnd = -1;
            let end = -1;
            let matchedSlash = true;
            let offset = 0;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len > 1) {
                if (isPathSeparator(code)) {
                    // Possible UNC root
                    rootEnd = offset = 1;
                    if (isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (isPathSeparator(path.charCodeAt(j))) {
                                break;
                            }
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            for (; j < len; ++j) {
                                if (!isPathSeparator(path.charCodeAt(j))) {
                                    break;
                                }
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                for (; j < len; ++j) {
                                    if (isPathSeparator(path.charCodeAt(j))) {
                                        break;
                                    }
                                }
                                if (j === len) {
                                    // We matched a UNC root only
                                    return path;
                                }
                                if (j !== last) {
                                    // We matched a UNC root with leftovers
                                    // Offset by 1 to include the separator after the UNC root to
                                    // treat it as a "normal root" on top of a (UNC) root
                                    rootEnd = offset = j + 1;
                                }
                            }
                        }
                    }
                }
                else if (isWindowsDeviceRoot(code)) {
                    // Possible device root
                    if (path.charCodeAt(1) === CHAR_COLON) {
                        rootEnd = offset = 2;
                        if (len > 2) {
                            if (isPathSeparator(path.charCodeAt(2))) {
                                rootEnd = offset = 3;
                            }
                        }
                    }
                }
            }
            else if (isPathSeparator(code)) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work
                return path;
            }
            for (let i = len - 1; i >= offset; --i) {
                if (isPathSeparator(path.charCodeAt(i))) {
                    if (!matchedSlash) {
                        end = i;
                        break;
                    }
                }
                else {
                    // We saw the first non-path separator
                    matchedSlash = false;
                }
            }
            if (end === -1) {
                if (rootEnd === -1) {
                    return '.';
                }
                else {
                    end = rootEnd;
                }
            }
            return path.slice(0, end);
        },
        basename(path, ext) {
            if (ext !== undefined) {
                validateString(ext, 'ext');
            }
            validateString(path, 'path');
            let start = 0;
            let end = -1;
            let matchedSlash = true;
            let i;
            // Check for a drive letter prefix so as not to mistake the following
            // path separator as an extra separator at the end of the path that can be
            // disregarded
            if (path.length >= 2) {
                const drive = path.charCodeAt(0);
                if (isWindowsDeviceRoot(drive)) {
                    if (path.charCodeAt(1) === CHAR_COLON) {
                        start = 2;
                    }
                }
            }
            if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
                if (ext.length === path.length && ext === path) {
                    return '';
                }
                let extIdx = ext.length - 1;
                let firstNonSlashEnd = -1;
                for (i = path.length - 1; i >= start; --i) {
                    const code = path.charCodeAt(i);
                    if (isPathSeparator(code)) {
                        // If we reached a path separator that was not part of a set of path
                        // separators at the end of the string, stop now
                        if (!matchedSlash) {
                            start = i + 1;
                            break;
                        }
                    }
                    else {
                        if (firstNonSlashEnd === -1) {
                            // We saw the first non-path separator, remember this index in case
                            // we need it if the extension ends up not matching
                            matchedSlash = false;
                            firstNonSlashEnd = i + 1;
                        }
                        if (extIdx >= 0) {
                            // Try to match the explicit extension
                            if (code === ext.charCodeAt(extIdx)) {
                                if (--extIdx === -1) {
                                    // We matched the extension, so mark this as the end of our path
                                    // component
                                    end = i;
                                }
                            }
                            else {
                                // Extension does not match, so our result is the entire path
                                // component
                                extIdx = -1;
                                end = firstNonSlashEnd;
                            }
                        }
                    }
                }
                if (start === end) {
                    end = firstNonSlashEnd;
                }
                else if (end === -1) {
                    end = path.length;
                }
                return path.slice(start, end);
            }
            else {
                for (i = path.length - 1; i >= start; --i) {
                    if (isPathSeparator(path.charCodeAt(i))) {
                        // If we reached a path separator that was not part of a set of path
                        // separators at the end of the string, stop now
                        if (!matchedSlash) {
                            start = i + 1;
                            break;
                        }
                    }
                    else if (end === -1) {
                        // We saw the first non-path separator, mark this as the end of our
                        // path component
                        matchedSlash = false;
                        end = i + 1;
                    }
                }
                if (end === -1) {
                    return '';
                }
                return path.slice(start, end);
            }
        },
        extname(path) {
            validateString(path, 'path');
            let start = 0;
            let startDot = -1;
            let startPart = 0;
            let end = -1;
            let matchedSlash = true;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            // Check for a drive letter prefix so as not to mistake the following
            // path separator as an extra separator at the end of the path that can be
            // disregarded
            if (path.length >= 2 &&
                path.charCodeAt(1) === CHAR_COLON &&
                isWindowsDeviceRoot(path.charCodeAt(0))) {
                start = startPart = 2;
            }
            for (let i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                return '';
            }
            return path.slice(startDot, end);
        },
        format(pathObject) {
            if (pathObject === null || typeof pathObject !== 'object') {
                throw new ErrorInvalidArgType('pathObject', 'Object', pathObject);
            }
            return _format('\\', pathObject);
        },
        parse(path) {
            validateString(path, 'path');
            const ret = { root: '', dir: '', base: '', ext: '', name: '' };
            if (path.length === 0) {
                return ret;
            }
            const len = path.length;
            let rootEnd = 0;
            let code = path.charCodeAt(0);
            // Try to match a root
            if (len > 1) {
                if (isPathSeparator(code)) {
                    // Possible UNC root
                    rootEnd = 1;
                    if (isPathSeparator(path.charCodeAt(1))) {
                        // Matched double path separator at beginning
                        let j = 2;
                        let last = j;
                        // Match 1 or more non-path separators
                        for (; j < len; ++j) {
                            if (isPathSeparator(path.charCodeAt(j))) {
                                break;
                            }
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more path separators
                            for (; j < len; ++j) {
                                if (!isPathSeparator(path.charCodeAt(j))) {
                                    break;
                                }
                            }
                            if (j < len && j !== last) {
                                // Matched!
                                last = j;
                                // Match 1 or more non-path separators
                                for (; j < len; ++j) {
                                    if (isPathSeparator(path.charCodeAt(j))) {
                                        break;
                                    }
                                }
                                if (j === len) {
                                    // We matched a UNC root only
                                    rootEnd = j;
                                }
                                else if (j !== last) {
                                    // We matched a UNC root with leftovers
                                    rootEnd = j + 1;
                                }
                            }
                        }
                    }
                }
                else if (isWindowsDeviceRoot(code)) {
                    // Possible device root
                    if (path.charCodeAt(1) === CHAR_COLON) {
                        rootEnd = 2;
                        if (len > 2) {
                            if (isPathSeparator(path.charCodeAt(2))) {
                                if (len === 3) {
                                    // `path` contains just a drive root, exit early to avoid
                                    // unnecessary work
                                    ret.root = ret.dir = path;
                                    return ret;
                                }
                                rootEnd = 3;
                            }
                        }
                        else {
                            // `path` contains just a drive root, exit early to avoid
                            // unnecessary work
                            ret.root = ret.dir = path;
                            return ret;
                        }
                    }
                }
            }
            else if (isPathSeparator(code)) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            if (rootEnd > 0) {
                ret.root = path.slice(0, rootEnd);
            }
            let startDot = -1;
            let startPart = rootEnd;
            let end = -1;
            let matchedSlash = true;
            let i = path.length - 1;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            // Get non-dir info
            for (; i >= rootEnd; --i) {
                code = path.charCodeAt(i);
                if (isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                if (end !== -1) {
                    ret.base = ret.name = path.slice(startPart, end);
                }
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
                ret.ext = path.slice(startDot, end);
            }
            // If the directory is the root, use the entire root as the `dir` including
            // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
            // trailing slash (`C:\abc\def` -> `C:\abc`).
            if (startPart > 0 && startPart !== rootEnd) {
                ret.dir = path.slice(0, startPart - 1);
            }
            else {
                ret.dir = ret.root;
            }
            return ret;
        },
        sep: '\\',
        delimiter: ';',
        win32: null,
        posix: null
    };
    exports.posix = {
        // path.resolve([from ...], to)
        resolve(...pathSegments) {
            let resolvedPath = '';
            let resolvedAbsolute = false;
            for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
                let path;
                if (i >= 0) {
                    path = pathSegments[i];
                }
                else {
                    path = process.cwd();
                }
                validateString(path, 'path');
                // Skip empty entries
                if (path.length === 0) {
                    continue;
                }
                resolvedPath = path + '/' + resolvedPath;
                resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            }
            // At this point the path should be resolved to a full absolute path, but
            // handle relative paths to be safe (might happen when process.cwd() fails)
            // Normalize the path
            resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);
            if (resolvedAbsolute) {
                if (resolvedPath.length > 0) {
                    return '/' + resolvedPath;
                }
                else {
                    return '/';
                }
            }
            else if (resolvedPath.length > 0) {
                return resolvedPath;
            }
            else {
                return '.';
            }
        },
        normalize(path) {
            validateString(path, 'path');
            if (path.length === 0) {
                return '.';
            }
            const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;
            // Normalize the path
            path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);
            if (path.length === 0 && !isAbsolute) {
                path = '.';
            }
            if (path.length > 0 && trailingSeparator) {
                path += '/';
            }
            if (isAbsolute) {
                return '/' + path;
            }
            return path;
        },
        isAbsolute(path) {
            validateString(path, 'path');
            return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        },
        join(...paths) {
            if (paths.length === 0) {
                return '.';
            }
            let joined;
            for (let i = 0; i < paths.length; ++i) {
                const arg = arguments[i];
                validateString(arg, 'path');
                if (arg.length > 0) {
                    if (joined === undefined) {
                        joined = arg;
                    }
                    else {
                        joined += '/' + arg;
                    }
                }
            }
            if (joined === undefined) {
                return '.';
            }
            return exports.posix.normalize(joined);
        },
        relative(from, to) {
            validateString(from, 'from');
            validateString(to, 'to');
            if (from === to) {
                return '';
            }
            from = exports.posix.resolve(from);
            to = exports.posix.resolve(to);
            if (from === to) {
                return '';
            }
            // Trim any leading backslashes
            let fromStart = 1;
            for (; fromStart < from.length; ++fromStart) {
                if (from.charCodeAt(fromStart) !== CHAR_FORWARD_SLASH) {
                    break;
                }
            }
            const fromEnd = from.length;
            const fromLen = (fromEnd - fromStart);
            // Trim any leading backslashes
            let toStart = 1;
            for (; toStart < to.length; ++toStart) {
                if (to.charCodeAt(toStart) !== CHAR_FORWARD_SLASH) {
                    break;
                }
            }
            const toEnd = to.length;
            const toLen = (toEnd - toStart);
            // Compare paths to find the longest common path from root
            const length = (fromLen < toLen ? fromLen : toLen);
            let lastCommonSep = -1;
            let i = 0;
            for (; i <= length; ++i) {
                if (i === length) {
                    if (toLen > length) {
                        if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
                            // We get here if `from` is the exact base path for `to`.
                            // For example: from='/foo/bar'; to='/foo/bar/baz'
                            return to.slice(toStart + i + 1);
                        }
                        else if (i === 0) {
                            // We get here if `from` is the root
                            // For example: from='/'; to='/foo'
                            return to.slice(toStart + i);
                        }
                    }
                    else if (fromLen > length) {
                        if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
                            // We get here if `to` is the exact base path for `from`.
                            // For example: from='/foo/bar/baz'; to='/foo/bar'
                            lastCommonSep = i;
                        }
                        else if (i === 0) {
                            // We get here if `to` is the root.
                            // For example: from='/foo'; to='/'
                            lastCommonSep = 0;
                        }
                    }
                    break;
                }
                const fromCode = from.charCodeAt(fromStart + i);
                const toCode = to.charCodeAt(toStart + i);
                if (fromCode !== toCode) {
                    break;
                }
                else if (fromCode === CHAR_FORWARD_SLASH) {
                    lastCommonSep = i;
                }
            }
            let out = '';
            // Generate the relative path based on the path difference between `to`
            // and `from`
            for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
                if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                    if (out.length === 0) {
                        out += '..';
                    }
                    else {
                        out += '/..';
                    }
                }
            }
            // Lastly, append the rest of the destination (`to`) path that comes after
            // the common path parts
            if (out.length > 0) {
                return out + to.slice(toStart + lastCommonSep);
            }
            else {
                toStart += lastCommonSep;
                if (to.charCodeAt(toStart) === CHAR_FORWARD_SLASH) {
                    ++toStart;
                }
                return to.slice(toStart);
            }
        },
        toNamespacedPath(path) {
            // Non-op on posix systems
            return path;
        },
        dirname(path) {
            validateString(path, 'path');
            if (path.length === 0) {
                return '.';
            }
            const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            let end = -1;
            let matchedSlash = true;
            for (let i = path.length - 1; i >= 1; --i) {
                if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                    if (!matchedSlash) {
                        end = i;
                        break;
                    }
                }
                else {
                    // We saw the first non-path separator
                    matchedSlash = false;
                }
            }
            if (end === -1) {
                return hasRoot ? '/' : '.';
            }
            if (hasRoot && end === 1) {
                return '//';
            }
            return path.slice(0, end);
        },
        basename(path, ext) {
            if (ext !== undefined) {
                validateString(ext, 'ext');
            }
            validateString(path, 'path');
            let start = 0;
            let end = -1;
            let matchedSlash = true;
            let i;
            if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
                if (ext.length === path.length && ext === path) {
                    return '';
                }
                let extIdx = ext.length - 1;
                let firstNonSlashEnd = -1;
                for (i = path.length - 1; i >= 0; --i) {
                    const code = path.charCodeAt(i);
                    if (code === CHAR_FORWARD_SLASH) {
                        // If we reached a path separator that was not part of a set of path
                        // separators at the end of the string, stop now
                        if (!matchedSlash) {
                            start = i + 1;
                            break;
                        }
                    }
                    else {
                        if (firstNonSlashEnd === -1) {
                            // We saw the first non-path separator, remember this index in case
                            // we need it if the extension ends up not matching
                            matchedSlash = false;
                            firstNonSlashEnd = i + 1;
                        }
                        if (extIdx >= 0) {
                            // Try to match the explicit extension
                            if (code === ext.charCodeAt(extIdx)) {
                                if (--extIdx === -1) {
                                    // We matched the extension, so mark this as the end of our path
                                    // component
                                    end = i;
                                }
                            }
                            else {
                                // Extension does not match, so our result is the entire path
                                // component
                                extIdx = -1;
                                end = firstNonSlashEnd;
                            }
                        }
                    }
                }
                if (start === end) {
                    end = firstNonSlashEnd;
                }
                else if (end === -1) {
                    end = path.length;
                }
                return path.slice(start, end);
            }
            else {
                for (i = path.length - 1; i >= 0; --i) {
                    if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                        // If we reached a path separator that was not part of a set of path
                        // separators at the end of the string, stop now
                        if (!matchedSlash) {
                            start = i + 1;
                            break;
                        }
                    }
                    else if (end === -1) {
                        // We saw the first non-path separator, mark this as the end of our
                        // path component
                        matchedSlash = false;
                        end = i + 1;
                    }
                }
                if (end === -1) {
                    return '';
                }
                return path.slice(start, end);
            }
        },
        extname(path) {
            validateString(path, 'path');
            let startDot = -1;
            let startPart = 0;
            let end = -1;
            let matchedSlash = true;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            for (let i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                return '';
            }
            return path.slice(startDot, end);
        },
        format(pathObject) {
            if (pathObject === null || typeof pathObject !== 'object') {
                throw new ErrorInvalidArgType('pathObject', 'Object', pathObject);
            }
            return _format('/', pathObject);
        },
        parse(path) {
            validateString(path, 'path');
            const ret = { root: '', dir: '', base: '', ext: '', name: '' };
            if (path.length === 0) {
                return ret;
            }
            const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
            let start;
            if (isAbsolute) {
                ret.root = '/';
                start = 1;
            }
            else {
                start = 0;
            }
            let startDot = -1;
            let startPart = 0;
            let end = -1;
            let matchedSlash = true;
            let i = path.length - 1;
            // Track the state of characters (if any) we see before our first dot and
            // after any path separator we find
            let preDotState = 0;
            // Get non-dir info
            for (; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        startPart = i + 1;
                        break;
                    }
                    continue;
                }
                if (end === -1) {
                    // We saw the first non-path separator, mark this as the end of our
                    // extension
                    matchedSlash = false;
                    end = i + 1;
                }
                if (code === CHAR_DOT) {
                    // If this is our first dot, mark it as the start of our extension
                    if (startDot === -1) {
                        startDot = i;
                    }
                    else if (preDotState !== 1) {
                        preDotState = 1;
                    }
                }
                else if (startDot !== -1) {
                    // We saw a non-dot and non-path separator before our dot, so we should
                    // have a good chance at having a non-empty extension
                    preDotState = -1;
                }
            }
            if (startDot === -1 ||
                end === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                if (end !== -1) {
                    if (startPart === 0 && isAbsolute) {
                        ret.base = ret.name = path.slice(1, end);
                    }
                    else {
                        ret.base = ret.name = path.slice(startPart, end);
                    }
                }
            }
            else {
                if (startPart === 0 && isAbsolute) {
                    ret.name = path.slice(1, startDot);
                    ret.base = path.slice(1, end);
                }
                else {
                    ret.name = path.slice(startPart, startDot);
                    ret.base = path.slice(startPart, end);
                }
                ret.ext = path.slice(startDot, end);
            }
            if (startPart > 0) {
                ret.dir = path.slice(0, startPart - 1);
            }
            else if (isAbsolute) {
                ret.dir = '/';
            }
            return ret;
        },
        sep: '/',
        delimiter: ':',
        win32: null,
        posix: null
    };
    exports.posix.win32 = exports.win32.win32 = exports.win32;
    exports.posix.posix = exports.win32.posix = exports.posix;
    exports.normalize = (process.platform === 'win32' ? exports.win32.normalize : exports.posix.normalize);
    exports.isAbsolute = (process.platform === 'win32' ? exports.win32.isAbsolute : exports.posix.isAbsolute);
    exports.join = (process.platform === 'win32' ? exports.win32.join : exports.posix.join);
    exports.resolve = (process.platform === 'win32' ? exports.win32.resolve : exports.posix.resolve);
    exports.relative = (process.platform === 'win32' ? exports.win32.relative : exports.posix.relative);
    exports.dirname = (process.platform === 'win32' ? exports.win32.dirname : exports.posix.dirname);
    exports.basename = (process.platform === 'win32' ? exports.win32.basename : exports.posix.basename);
    exports.extname = (process.platform === 'win32' ? exports.win32.extname : exports.posix.extname);
    exports.format = (process.platform === 'win32' ? exports.win32.format : exports.posix.format);
    exports.parse = (process.platform === 'win32' ? exports.win32.parse : exports.posix.parse);
    exports.toNamespacedPath = (process.platform === 'win32' ? exports.win32.toNamespacedPath : exports.posix.toNamespacedPath);
    exports.sep = (process.platform === 'win32' ? exports.win32.sep : exports.posix.sep);
    exports.delimiter = (process.platform === 'win32' ? exports.win32.delimiter : exports.posix.delimiter);
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[3/*vs/base/common/extpath*/], __M([1/*require*/,0/*exports*/,2/*vs/base/common/platform*/,5/*vs/base/common/strings*/,4/*vs/base/common/path*/]), function (require, exports, platform_1, strings_1, path_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isPathSeparator(code) {
        return code === 47 /* Slash */ || code === 92 /* Backslash */;
    }
    exports.isPathSeparator = isPathSeparator;
    /**
     * Takes a Windows OS path and changes backward slashes to forward slashes.
     * This should only be done for OS paths from Windows (or user provided paths potentially from Windows).
     * Using it on a Linux or MaxOS path might change it.
     */
    function toSlashes(osPath) {
        return osPath.replace(/[\\/]/g, path_1.posix.sep);
    }
    exports.toSlashes = toSlashes;
    /**
     * Computes the _root_ this path, like `getRoot('c:\files') === c:\`,
     * `getRoot('files:///files/path') === files:///`,
     * or `getRoot('\\server\shares\path') === \\server\shares\`
     */
    function getRoot(path, sep = path_1.posix.sep) {
        if (!path) {
            return '';
        }
        const len = path.length;
        const firstLetter = path.charCodeAt(0);
        if (isPathSeparator(firstLetter)) {
            if (isPathSeparator(path.charCodeAt(1))) {
                // UNC candidate \\localhost\shares\ddd
                //               ^^^^^^^^^^^^^^^^^^^
                if (!isPathSeparator(path.charCodeAt(2))) {
                    let pos = 3;
                    const start = pos;
                    for (; pos < len; pos++) {
                        if (isPathSeparator(path.charCodeAt(pos))) {
                            break;
                        }
                    }
                    if (start !== pos && !isPathSeparator(path.charCodeAt(pos + 1))) {
                        pos += 1;
                        for (; pos < len; pos++) {
                            if (isPathSeparator(path.charCodeAt(pos))) {
                                return path.slice(0, pos + 1) // consume this separator
                                    .replace(/[\\/]/g, sep);
                            }
                        }
                    }
                }
            }
            // /user/far
            // ^
            return sep;
        }
        else if (isWindowsDriveLetter(firstLetter)) {
            // check for windows drive letter c:\ or c:
            if (path.charCodeAt(1) === 58 /* Colon */) {
                if (isPathSeparator(path.charCodeAt(2))) {
                    // C:\fff
                    // ^^^
                    return path.slice(0, 2) + sep;
                }
                else {
                    // C:
                    // ^^
                    return path.slice(0, 2);
                }
            }
        }
        // check for URI
        // scheme://authority/path
        // ^^^^^^^^^^^^^^^^^^^
        let pos = path.indexOf('://');
        if (pos !== -1) {
            pos += 3; // 3 -> "://".length
            for (; pos < len; pos++) {
                if (isPathSeparator(path.charCodeAt(pos))) {
                    return path.slice(0, pos + 1); // consume this separator
                }
            }
        }
        return '';
    }
    exports.getRoot = getRoot;
    /**
     * Check if the path follows this pattern: `\\hostname\sharename`.
     *
     * @see https://msdn.microsoft.com/en-us/library/gg465305.aspx
     * @return A boolean indication if the path is a UNC path, on none-windows
     * always false.
     */
    function isUNC(path) {
        if (!platform_1.isWindows) {
            // UNC is a windows concept
            return false;
        }
        if (!path || path.length < 5) {
            // at least \\a\b
            return false;
        }
        let code = path.charCodeAt(0);
        if (code !== 92 /* Backslash */) {
            return false;
        }
        code = path.charCodeAt(1);
        if (code !== 92 /* Backslash */) {
            return false;
        }
        let pos = 2;
        const start = pos;
        for (; pos < path.length; pos++) {
            code = path.charCodeAt(pos);
            if (code === 92 /* Backslash */) {
                break;
            }
        }
        if (start === pos) {
            return false;
        }
        code = path.charCodeAt(pos + 1);
        if (isNaN(code) || code === 92 /* Backslash */) {
            return false;
        }
        return true;
    }
    exports.isUNC = isUNC;
    // Reference: https://en.wikipedia.org/wiki/Filename
    const WINDOWS_INVALID_FILE_CHARS = /[\\/:\*\?"<>\|]/g;
    const UNIX_INVALID_FILE_CHARS = /[\\/]/g;
    const WINDOWS_FORBIDDEN_NAMES = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])$/i;
    function isValidBasename(name, isWindowsOS = platform_1.isWindows) {
        const invalidFileChars = isWindowsOS ? WINDOWS_INVALID_FILE_CHARS : UNIX_INVALID_FILE_CHARS;
        if (!name || name.length === 0 || /^\s+$/.test(name)) {
            return false; // require a name that is not just whitespace
        }
        invalidFileChars.lastIndex = 0; // the holy grail of software development
        if (invalidFileChars.test(name)) {
            return false; // check for certain invalid file characters
        }
        if (isWindowsOS && WINDOWS_FORBIDDEN_NAMES.test(name)) {
            return false; // check for certain invalid file names
        }
        if (name === '.' || name === '..') {
            return false; // check for reserved values
        }
        if (isWindowsOS && name[name.length - 1] === '.') {
            return false; // Windows: file cannot end with a "."
        }
        if (isWindowsOS && name.length !== name.trim().length) {
            return false; // Windows: file cannot end with a whitespace
        }
        if (name.length > 255) {
            return false; // most file systems do not allow files > 255 length
        }
        return true;
    }
    exports.isValidBasename = isValidBasename;
    function isEqual(pathA, pathB, ignoreCase) {
        const identityEquals = (pathA === pathB);
        if (!ignoreCase || identityEquals) {
            return identityEquals;
        }
        if (!pathA || !pathB) {
            return false;
        }
        return strings_1.equalsIgnoreCase(pathA, pathB);
    }
    exports.isEqual = isEqual;
    function isEqualOrParent(path, candidate, ignoreCase, separator = path_1.sep) {
        if (path === candidate) {
            return true;
        }
        if (!path || !candidate) {
            return false;
        }
        if (candidate.length > path.length) {
            return false;
        }
        if (ignoreCase) {
            const beginsWith = strings_1.startsWithIgnoreCase(path, candidate);
            if (!beginsWith) {
                return false;
            }
            if (candidate.length === path.length) {
                return true; // same path, different casing
            }
            let sepOffset = candidate.length;
            if (candidate.charAt(candidate.length - 1) === separator) {
                sepOffset--; // adjust the expected sep offset in case our candidate already ends in separator character
            }
            return path.charAt(sepOffset) === separator;
        }
        if (candidate.charAt(candidate.length - 1) !== separator) {
            candidate += separator;
        }
        return path.indexOf(candidate) === 0;
    }
    exports.isEqualOrParent = isEqualOrParent;
    function isWindowsDriveLetter(char0) {
        return char0 >= 65 /* A */ && char0 <= 90 /* Z */ || char0 >= 97 /* a */ && char0 <= 122 /* z */;
    }
    exports.isWindowsDriveLetter = isWindowsDriveLetter;
    function sanitizeFilePath(candidate, cwd) {
        // Special case: allow to open a drive letter without trailing backslash
        if (platform_1.isWindows && strings_1.endsWith(candidate, ':')) {
            candidate += path_1.sep;
        }
        // Ensure absolute
        if (!path_1.isAbsolute(candidate)) {
            candidate = path_1.join(cwd, candidate);
        }
        // Ensure normalized
        candidate = path_1.normalize(candidate);
        // Ensure no trailing slash/backslash
        if (platform_1.isWindows) {
            candidate = strings_1.rtrim(candidate, path_1.sep);
            // Special case: allow to open drive root ('C:\')
            if (strings_1.endsWith(candidate, ':')) {
                candidate += path_1.sep;
            }
        }
        else {
            candidate = strings_1.rtrim(candidate, path_1.sep);
            // Special case: allow to open root ('/')
            if (!candidate) {
                candidate = path_1.sep;
            }
        }
        return candidate;
    }
    exports.sanitizeFilePath = sanitizeFilePath;
    function isRootOrDriveLetter(path) {
        const pathNormalized = path_1.normalize(path);
        if (platform_1.isWindows) {
            if (path.length > 3) {
                return false;
            }
            return isWindowsDriveLetter(pathNormalized.charCodeAt(0))
                && pathNormalized.charCodeAt(1) === 58 /* Colon */
                && (path.length === 2 || pathNormalized.charCodeAt(2) === 92 /* Backslash */);
        }
        return pathNormalized === path_1.posix.sep;
    }
    exports.isRootOrDriveLetter = isRootOrDriveLetter;
    function indexOfPath(path, candidate, ignoreCase) {
        if (candidate.length > path.length) {
            return -1;
        }
        if (path === candidate) {
            return 0;
        }
        if (ignoreCase) {
            path = path.toLowerCase();
            candidate = candidate.toLowerCase();
        }
        return path.indexOf(candidate);
    }
    exports.indexOfPath = indexOfPath;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[8/*vs/base/common/map*/], __M([1/*require*/,0/*exports*/,6/*vs/base/common/uri*/,14/*vs/base/common/iterator*/]), function (require, exports, uri_1, iterator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function values(forEachable) {
        const result = [];
        forEachable.forEach(value => result.push(value));
        return result;
    }
    exports.values = values;
    function keys(map) {
        const result = [];
        map.forEach((_value, key) => result.push(key));
        return result;
    }
    exports.keys = keys;
    function getOrSet(map, key, value) {
        let result = map.get(key);
        if (result === undefined) {
            result = value;
            map.set(key, result);
        }
        return result;
    }
    exports.getOrSet = getOrSet;
    function mapToString(map) {
        const entries = [];
        map.forEach((value, key) => {
            entries.push(`${key} => ${value}`);
        });
        return `Map(${map.size}) {${entries.join(', ')}}`;
    }
    exports.mapToString = mapToString;
    function setToString(set) {
        const entries = [];
        set.forEach(value => {
            entries.push(value);
        });
        return `Set(${set.size}) {${entries.join(', ')}}`;
    }
    exports.setToString = setToString;
    function mapToSerializable(map) {
        const serializable = [];
        map.forEach((value, key) => {
            serializable.push([key, value]);
        });
        return serializable;
    }
    exports.mapToSerializable = mapToSerializable;
    function serializableToMap(serializable) {
        const items = new Map();
        for (const [key, value] of serializable) {
            items.set(key, value);
        }
        return items;
    }
    exports.serializableToMap = serializableToMap;
    class StringIterator {
        constructor() {
            this._value = '';
            this._pos = 0;
        }
        reset(key) {
            this._value = key;
            this._pos = 0;
            return this;
        }
        next() {
            this._pos += 1;
            return this;
        }
        hasNext() {
            return this._pos < this._value.length - 1;
        }
        cmp(a) {
            const aCode = a.charCodeAt(0);
            const thisCode = this._value.charCodeAt(this._pos);
            return aCode - thisCode;
        }
        value() {
            return this._value[this._pos];
        }
    }
    exports.StringIterator = StringIterator;
    class PathIterator {
        constructor(_splitOnBackslash = true) {
            this._splitOnBackslash = _splitOnBackslash;
        }
        reset(key) {
            this._value = key.replace(/\\$|\/$/, '');
            this._from = 0;
            this._to = 0;
            return this.next();
        }
        hasNext() {
            return this._to < this._value.length;
        }
        next() {
            // this._data = key.split(/[\\/]/).filter(s => !!s);
            this._from = this._to;
            let justSeps = true;
            for (; this._to < this._value.length; this._to++) {
                const ch = this._value.charCodeAt(this._to);
                if (ch === 47 /* Slash */ || this._splitOnBackslash && ch === 92 /* Backslash */) {
                    if (justSeps) {
                        this._from++;
                    }
                    else {
                        break;
                    }
                }
                else {
                    justSeps = false;
                }
            }
            return this;
        }
        cmp(a) {
            let aPos = 0;
            const aLen = a.length;
            let thisPos = this._from;
            while (aPos < aLen && thisPos < this._to) {
                const cmp = a.charCodeAt(aPos) - this._value.charCodeAt(thisPos);
                if (cmp !== 0) {
                    return cmp;
                }
                aPos += 1;
                thisPos += 1;
            }
            if (aLen === this._to - this._from) {
                return 0;
            }
            else if (aPos < aLen) {
                return -1;
            }
            else {
                return 1;
            }
        }
        value() {
            return this._value.substring(this._from, this._to);
        }
    }
    exports.PathIterator = PathIterator;
    class TernarySearchTreeNode {
        isEmpty() {
            return !this.left && !this.mid && !this.right && !this.value;
        }
    }
    class TernarySearchTree {
        constructor(segments) {
            this._iter = segments;
        }
        static forPaths() {
            return new TernarySearchTree(new PathIterator());
        }
        static forStrings() {
            return new TernarySearchTree(new StringIterator());
        }
        clear() {
            this._root = undefined;
        }
        set(key, element) {
            const iter = this._iter.reset(key);
            let node;
            if (!this._root) {
                this._root = new TernarySearchTreeNode();
                this._root.segment = iter.value();
            }
            node = this._root;
            while (true) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    if (!node.left) {
                        node.left = new TernarySearchTreeNode();
                        node.left.segment = iter.value();
                    }
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    if (!node.right) {
                        node.right = new TernarySearchTreeNode();
                        node.right.segment = iter.value();
                    }
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    if (!node.mid) {
                        node.mid = new TernarySearchTreeNode();
                        node.mid.segment = iter.value();
                    }
                    node = node.mid;
                }
                else {
                    break;
                }
            }
            const oldElement = node.value;
            node.value = element;
            node.key = key;
            return oldElement;
        }
        get(key) {
            const iter = this._iter.reset(key);
            let node = this._root;
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    node = node.mid;
                }
                else {
                    break;
                }
            }
            return node ? node.value : undefined;
        }
        delete(key) {
            const iter = this._iter.reset(key);
            const stack = [];
            let node = this._root;
            // find and unset node
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    stack.push([1, node]);
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    stack.push([-1, node]);
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    stack.push([0, node]);
                    node = node.mid;
                }
                else {
                    // remove element
                    node.value = undefined;
                    // clean up empty nodes
                    while (stack.length > 0 && node.isEmpty()) {
                        let [dir, parent] = stack.pop();
                        switch (dir) {
                            case 1:
                                parent.left = undefined;
                                break;
                            case 0:
                                parent.mid = undefined;
                                break;
                            case -1:
                                parent.right = undefined;
                                break;
                        }
                        node = parent;
                    }
                    break;
                }
            }
        }
        findSubstr(key) {
            const iter = this._iter.reset(key);
            let node = this._root;
            let candidate = undefined;
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    candidate = node.value || candidate;
                    node = node.mid;
                }
                else {
                    break;
                }
            }
            return node && node.value || candidate;
        }
        findSuperstr(key) {
            const iter = this._iter.reset(key);
            let node = this._root;
            while (node) {
                const val = iter.cmp(node.segment);
                if (val > 0) {
                    // left
                    node = node.left;
                }
                else if (val < 0) {
                    // right
                    node = node.right;
                }
                else if (iter.hasNext()) {
                    // mid
                    iter.next();
                    node = node.mid;
                }
                else {
                    // collect
                    if (!node.mid) {
                        return undefined;
                    }
                    else {
                        return this._nodeIterator(node.mid);
                    }
                }
            }
            return undefined;
        }
        _nodeIterator(node) {
            let res;
            let idx;
            let data;
            const next = () => {
                if (!data) {
                    // lazy till first invocation
                    data = [];
                    idx = 0;
                    this._forEach(node, value => data.push(value));
                }
                if (idx >= data.length) {
                    return iterator_1.FIN;
                }
                if (!res) {
                    res = { done: false, value: data[idx++] };
                }
                else {
                    res.value = data[idx++];
                }
                return res;
            };
            return { next };
        }
        forEach(callback) {
            this._forEach(this._root, callback);
        }
        _forEach(node, callback) {
            if (node) {
                // left
                this._forEach(node.left, callback);
                // node
                if (node.value) {
                    // callback(node.value, this._iter.join(parts));
                    callback(node.value, node.key);
                }
                // mid
                this._forEach(node.mid, callback);
                // right
                this._forEach(node.right, callback);
            }
        }
    }
    exports.TernarySearchTree = TernarySearchTree;
    class ResourceMap {
        constructor() {
            this.map = new Map();
            this.ignoreCase = false; // in the future this should be an uri-comparator
        }
        set(resource, value) {
            this.map.set(this.toKey(resource), value);
        }
        get(resource) {
            return this.map.get(this.toKey(resource));
        }
        has(resource) {
            return this.map.has(this.toKey(resource));
        }
        get size() {
            return this.map.size;
        }
        clear() {
            this.map.clear();
        }
        delete(resource) {
            return this.map.delete(this.toKey(resource));
        }
        forEach(clb) {
            this.map.forEach((value, index) => clb(value, uri_1.URI.parse(index)));
        }
        values() {
            return values(this.map);
        }
        toKey(resource) {
            let key = resource.toString();
            if (this.ignoreCase) {
                key = key.toLowerCase();
            }
            return key;
        }
        keys() {
            return keys(this.map).map(k => uri_1.URI.parse(k));
        }
        clone() {
            const resourceMap = new ResourceMap();
            this.map.forEach((value, key) => resourceMap.map.set(key, value));
            return resourceMap;
        }
    }
    exports.ResourceMap = ResourceMap;
    var Touch;
    (function (Touch) {
        Touch[Touch["None"] = 0] = "None";
        Touch[Touch["AsOld"] = 1] = "AsOld";
        Touch[Touch["AsNew"] = 2] = "AsNew";
    })(Touch = exports.Touch || (exports.Touch = {}));
    class LinkedMap {
        constructor() {
            this._map = new Map();
            this._head = undefined;
            this._tail = undefined;
            this._size = 0;
        }
        clear() {
            this._map.clear();
            this._head = undefined;
            this._tail = undefined;
            this._size = 0;
        }
        isEmpty() {
            return !this._head && !this._tail;
        }
        get size() {
            return this._size;
        }
        get first() {
            var _a;
            return (_a = this._head) === null || _a === void 0 ? void 0 : _a.value;
        }
        get last() {
            var _a;
            return (_a = this._tail) === null || _a === void 0 ? void 0 : _a.value;
        }
        has(key) {
            return this._map.has(key);
        }
        get(key, touch = 0 /* None */) {
            const item = this._map.get(key);
            if (!item) {
                return undefined;
            }
            if (touch !== 0 /* None */) {
                this.touch(item, touch);
            }
            return item.value;
        }
        set(key, value, touch = 0 /* None */) {
            let item = this._map.get(key);
            if (item) {
                item.value = value;
                if (touch !== 0 /* None */) {
                    this.touch(item, touch);
                }
            }
            else {
                item = { key, value, next: undefined, previous: undefined };
                switch (touch) {
                    case 0 /* None */:
                        this.addItemLast(item);
                        break;
                    case 1 /* AsOld */:
                        this.addItemFirst(item);
                        break;
                    case 2 /* AsNew */:
                        this.addItemLast(item);
                        break;
                    default:
                        this.addItemLast(item);
                        break;
                }
                this._map.set(key, item);
                this._size++;
            }
        }
        delete(key) {
            return !!this.remove(key);
        }
        remove(key) {
            const item = this._map.get(key);
            if (!item) {
                return undefined;
            }
            this._map.delete(key);
            this.removeItem(item);
            this._size--;
            return item.value;
        }
        shift() {
            if (!this._head && !this._tail) {
                return undefined;
            }
            if (!this._head || !this._tail) {
                throw new Error('Invalid list');
            }
            const item = this._head;
            this._map.delete(item.key);
            this.removeItem(item);
            this._size--;
            return item.value;
        }
        forEach(callbackfn, thisArg) {
            let current = this._head;
            while (current) {
                if (thisArg) {
                    callbackfn.bind(thisArg)(current.value, current.key, this);
                }
                else {
                    callbackfn(current.value, current.key, this);
                }
                current = current.next;
            }
        }
        values() {
            const result = [];
            let current = this._head;
            while (current) {
                result.push(current.value);
                current = current.next;
            }
            return result;
        }
        keys() {
            const result = [];
            let current = this._head;
            while (current) {
                result.push(current.key);
                current = current.next;
            }
            return result;
        }
        /* VS Code / Monaco editor runs on es5 which has no Symbol.iterator
        keys(): IterableIterator<K> {
            const current = this._head;
            const iterator: IterableIterator<K> = {
                [Symbol.iterator]() {
                    return iterator;
                },
                next():IteratorResult<K> {
                    if (current) {
                        const result = { value: current.key, done: false };
                        current = current.next;
                        return result;
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
            return iterator;
        }
    
        values(): IterableIterator<V> {
            const current = this._head;
            const iterator: IterableIterator<V> = {
                [Symbol.iterator]() {
                    return iterator;
                },
                next():IteratorResult<V> {
                    if (current) {
                        const result = { value: current.value, done: false };
                        current = current.next;
                        return result;
                    } else {
                        return { value: undefined, done: true };
                    }
                }
            };
            return iterator;
        }
        */
        trimOld(newSize) {
            if (newSize >= this.size) {
                return;
            }
            if (newSize === 0) {
                this.clear();
                return;
            }
            let current = this._head;
            let currentSize = this.size;
            while (current && currentSize > newSize) {
                this._map.delete(current.key);
                current = current.next;
                currentSize--;
            }
            this._head = current;
            this._size = currentSize;
            if (current) {
                current.previous = undefined;
            }
        }
        addItemFirst(item) {
            // First time Insert
            if (!this._head && !this._tail) {
                this._tail = item;
            }
            else if (!this._head) {
                throw new Error('Invalid list');
            }
            else {
                item.next = this._head;
                this._head.previous = item;
            }
            this._head = item;
        }
        addItemLast(item) {
            // First time Insert
            if (!this._head && !this._tail) {
                this._head = item;
            }
            else if (!this._tail) {
                throw new Error('Invalid list');
            }
            else {
                item.previous = this._tail;
                this._tail.next = item;
            }
            this._tail = item;
        }
        removeItem(item) {
            if (item === this._head && item === this._tail) {
                this._head = undefined;
                this._tail = undefined;
            }
            else if (item === this._head) {
                // This can only happend if size === 1 which is handle
                // by the case above.
                if (!item.next) {
                    throw new Error('Invalid list');
                }
                item.next.previous = undefined;
                this._head = item.next;
            }
            else if (item === this._tail) {
                // This can only happend if size === 1 which is handle
                // by the case above.
                if (!item.previous) {
                    throw new Error('Invalid list');
                }
                item.previous.next = undefined;
                this._tail = item.previous;
            }
            else {
                const next = item.next;
                const previous = item.previous;
                if (!next || !previous) {
                    throw new Error('Invalid list');
                }
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = undefined;
        }
        touch(item, touch) {
            if (!this._head || !this._tail) {
                throw new Error('Invalid list');
            }
            if ((touch !== 1 /* AsOld */ && touch !== 2 /* AsNew */)) {
                return;
            }
            if (touch === 1 /* AsOld */) {
                if (item === this._head) {
                    return;
                }
                const next = item.next;
                const previous = item.previous;
                // Unlink the item
                if (item === this._tail) {
                    // previous must be defined since item was not head but is tail
                    // So there are more than on item in the map
                    previous.next = undefined;
                    this._tail = previous;
                }
                else {
                    // Both next and previous are not undefined since item was neither head nor tail.
                    next.previous = previous;
                    previous.next = next;
                }
                // Insert the node at head
                item.previous = undefined;
                item.next = this._head;
                this._head.previous = item;
                this._head = item;
            }
            else if (touch === 2 /* AsNew */) {
                if (item === this._tail) {
                    return;
                }
                const next = item.next;
                const previous = item.previous;
                // Unlink the item.
                if (item === this._head) {
                    // next must be defined since item was not tail but is head
                    // So there are more than on item in the map
                    next.previous = undefined;
                    this._head = next;
                }
                else {
                    // Both next and previous are not undefined since item was neither head nor tail.
                    next.previous = previous;
                    previous.next = next;
                }
                item.next = undefined;
                item.previous = this._tail;
                this._tail.next = item;
                this._tail = item;
            }
        }
        toJSON() {
            const data = [];
            this.forEach((value, key) => {
                data.push([key, value]);
            });
            return data;
        }
        fromJSON(data) {
            this.clear();
            for (const [key, value] of data) {
                this.set(key, value);
            }
        }
    }
    exports.LinkedMap = LinkedMap;
    class LRUCache extends LinkedMap {
        constructor(limit, ratio = 1) {
            super();
            this._limit = limit;
            this._ratio = Math.min(Math.max(0, ratio), 1);
        }
        get limit() {
            return this._limit;
        }
        set limit(limit) {
            this._limit = limit;
            this.checkTrim();
        }
        get ratio() {
            return this._ratio;
        }
        set ratio(ratio) {
            this._ratio = Math.min(Math.max(0, ratio), 1);
            this.checkTrim();
        }
        get(key) {
            return super.get(key, 2 /* AsNew */);
        }
        peek(key) {
            return super.get(key, 0 /* None */);
        }
        set(key, value) {
            super.set(key, value, 2 /* AsNew */);
            this.checkTrim();
        }
        checkTrim() {
            if (this.size > this._limit) {
                this.trimOld(Math.round(this._limit * this._ratio));
            }
        }
    }
    exports.LRUCache = LRUCache;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[11/*vs/base/common/glob*/], __M([1/*require*/,0/*exports*/,10/*vs/base/common/arrays*/,5/*vs/base/common/strings*/,3/*vs/base/common/extpath*/,4/*vs/base/common/path*/,8/*vs/base/common/map*/,9/*vs/base/common/async*/]), function (require, exports, arrays, strings, extpath, paths, map_1, async_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getEmptyExpression() {
        return Object.create(null);
    }
    exports.getEmptyExpression = getEmptyExpression;
    const GLOBSTAR = '**';
    const GLOB_SPLIT = '/';
    const PATH_REGEX = '[/\\\\]'; // any slash or backslash
    const NO_PATH_REGEX = '[^/\\\\]'; // any non-slash and non-backslash
    const ALL_FORWARD_SLASHES = /\//g;
    function starsToRegExp(starCount) {
        switch (starCount) {
            case 0:
                return '';
            case 1:
                return `${NO_PATH_REGEX}*?`; // 1 star matches any number of characters except path separator (/ and \) - non greedy (?)
            default:
                // Matches:  (Path Sep OR Path Val followed by Path Sep OR Path Sep followed by Path Val) 0-many times
                // Group is non capturing because we don't need to capture at all (?:...)
                // Overall we use non-greedy matching because it could be that we match too much
                return `(?:${PATH_REGEX}|${NO_PATH_REGEX}+${PATH_REGEX}|${PATH_REGEX}${NO_PATH_REGEX}+)*?`;
        }
    }
    function splitGlobAware(pattern, splitChar) {
        if (!pattern) {
            return [];
        }
        const segments = [];
        let inBraces = false;
        let inBrackets = false;
        let curVal = '';
        for (const char of pattern) {
            switch (char) {
                case splitChar:
                    if (!inBraces && !inBrackets) {
                        segments.push(curVal);
                        curVal = '';
                        continue;
                    }
                    break;
                case '{':
                    inBraces = true;
                    break;
                case '}':
                    inBraces = false;
                    break;
                case '[':
                    inBrackets = true;
                    break;
                case ']':
                    inBrackets = false;
                    break;
            }
            curVal += char;
        }
        // Tail
        if (curVal) {
            segments.push(curVal);
        }
        return segments;
    }
    exports.splitGlobAware = splitGlobAware;
    function parseRegExp(pattern) {
        if (!pattern) {
            return '';
        }
        let regEx = '';
        // Split up into segments for each slash found
        const segments = splitGlobAware(pattern, GLOB_SPLIT);
        // Special case where we only have globstars
        if (segments.every(s => s === GLOBSTAR)) {
            regEx = '.*';
        }
        // Build regex over segments
        else {
            let previousSegmentWasGlobStar = false;
            segments.forEach((segment, index) => {
                // Globstar is special
                if (segment === GLOBSTAR) {
                    // if we have more than one globstar after another, just ignore it
                    if (!previousSegmentWasGlobStar) {
                        regEx += starsToRegExp(2);
                        previousSegmentWasGlobStar = true;
                    }
                    return;
                }
                // States
                let inBraces = false;
                let braceVal = '';
                let inBrackets = false;
                let bracketVal = '';
                for (const char of segment) {
                    // Support brace expansion
                    if (char !== '}' && inBraces) {
                        braceVal += char;
                        continue;
                    }
                    // Support brackets
                    if (inBrackets && (char !== ']' || !bracketVal) /* ] is literally only allowed as first character in brackets to match it */) {
                        let res;
                        // range operator
                        if (char === '-') {
                            res = char;
                        }
                        // negation operator (only valid on first index in bracket)
                        else if ((char === '^' || char === '!') && !bracketVal) {
                            res = '^';
                        }
                        // glob split matching is not allowed within character ranges
                        // see http://man7.org/linux/man-pages/man7/glob.7.html
                        else if (char === GLOB_SPLIT) {
                            res = '';
                        }
                        // anything else gets escaped
                        else {
                            res = strings.escapeRegExpCharacters(char);
                        }
                        bracketVal += res;
                        continue;
                    }
                    switch (char) {
                        case '{':
                            inBraces = true;
                            continue;
                        case '[':
                            inBrackets = true;
                            continue;
                        case '}':
                            const choices = splitGlobAware(braceVal, ',');
                            // Converts {foo,bar} => [foo|bar]
                            const braceRegExp = `(?:${choices.map(c => parseRegExp(c)).join('|')})`;
                            regEx += braceRegExp;
                            inBraces = false;
                            braceVal = '';
                            break;
                        case ']':
                            regEx += ('[' + bracketVal + ']');
                            inBrackets = false;
                            bracketVal = '';
                            break;
                        case '?':
                            regEx += NO_PATH_REGEX; // 1 ? matches any single character except path separator (/ and \)
                            continue;
                        case '*':
                            regEx += starsToRegExp(1);
                            continue;
                        default:
                            regEx += strings.escapeRegExpCharacters(char);
                    }
                }
                // Tail: Add the slash we had split on if there is more to come and the remaining pattern is not a globstar
                // For example if pattern: some/**/*.js we want the "/" after some to be included in the RegEx to prevent
                // a folder called "something" to match as well.
                // However, if pattern: some/**, we tolerate that we also match on "something" because our globstar behaviour
                // is to match 0-N segments.
                if (index < segments.length - 1 && (segments[index + 1] !== GLOBSTAR || index + 2 < segments.length)) {
                    regEx += PATH_REGEX;
                }
                // reset state
                previousSegmentWasGlobStar = false;
            });
        }
        return regEx;
    }
    // regexes to check for trival glob patterns that just check for String#endsWith
    const T1 = /^\*\*\/\*\.[\w\.-]+$/; // **/*.something
    const T2 = /^\*\*\/([\w\.-]+)\/?$/; // **/something
    const T3 = /^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/; // {**/*.something,**/*.else} or {**/package.json,**/project.json}
    const T3_2 = /^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/; // Like T3, with optional trailing /**
    const T4 = /^\*\*((\/[\w\.-]+)+)\/?$/; // **/something/else
    const T5 = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/; // something/else
    const CACHE = new map_1.LRUCache(10000); // bounded to 10000 elements
    const FALSE = function () {
        return false;
    };
    const NULL = function () {
        return null;
    };
    function parsePattern(arg1, options) {
        if (!arg1) {
            return NULL;
        }
        // Handle IRelativePattern
        let pattern;
        if (typeof arg1 !== 'string') {
            pattern = arg1.pattern;
        }
        else {
            pattern = arg1;
        }
        // Whitespace trimming
        pattern = pattern.trim();
        // Check cache
        const patternKey = `${pattern}_${!!options.trimForExclusions}`;
        let parsedPattern = CACHE.get(patternKey);
        if (parsedPattern) {
            return wrapRelativePattern(parsedPattern, arg1);
        }
        // Check for Trivias
        let match;
        if (T1.test(pattern)) { // common pattern: **/*.txt just need endsWith check
            const base = pattern.substr(4); // '**/*'.length === 4
            parsedPattern = function (path, basename) {
                return typeof path === 'string' && strings.endsWith(path, base) ? pattern : null;
            };
        }
        else if (match = T2.exec(trimForExclusions(pattern, options))) { // common pattern: **/some.txt just need basename check
            parsedPattern = trivia2(match[1], pattern);
        }
        else if ((options.trimForExclusions ? T3_2 : T3).test(pattern)) { // repetition of common patterns (see above) {**/*.txt,**/*.png}
            parsedPattern = trivia3(pattern, options);
        }
        else if (match = T4.exec(trimForExclusions(pattern, options))) { // common pattern: **/something/else just need endsWith check
            parsedPattern = trivia4and5(match[1].substr(1), pattern, true);
        }
        else if (match = T5.exec(trimForExclusions(pattern, options))) { // common pattern: something/else just need equals check
            parsedPattern = trivia4and5(match[1], pattern, false);
        }
        // Otherwise convert to pattern
        else {
            parsedPattern = toRegExp(pattern);
        }
        // Cache
        CACHE.set(patternKey, parsedPattern);
        return wrapRelativePattern(parsedPattern, arg1);
    }
    function wrapRelativePattern(parsedPattern, arg2) {
        if (typeof arg2 === 'string') {
            return parsedPattern;
        }
        return function (path, basename) {
            if (!extpath.isEqualOrParent(path, arg2.base)) {
                return null;
            }
            return parsedPattern(paths.relative(arg2.base, path), basename);
        };
    }
    function trimForExclusions(pattern, options) {
        return options.trimForExclusions && strings.endsWith(pattern, '/**') ? pattern.substr(0, pattern.length - 2) : pattern; // dropping **, tailing / is dropped later
    }
    // common pattern: **/some.txt just need basename check
    function trivia2(base, originalPattern) {
        const slashBase = `/${base}`;
        const backslashBase = `\\${base}`;
        const parsedPattern = function (path, basename) {
            if (typeof path !== 'string') {
                return null;
            }
            if (basename) {
                return basename === base ? originalPattern : null;
            }
            return path === base || strings.endsWith(path, slashBase) || strings.endsWith(path, backslashBase) ? originalPattern : null;
        };
        const basenames = [base];
        parsedPattern.basenames = basenames;
        parsedPattern.patterns = [originalPattern];
        parsedPattern.allBasenames = basenames;
        return parsedPattern;
    }
    // repetition of common patterns (see above) {**/*.txt,**/*.png}
    function trivia3(pattern, options) {
        const parsedPatterns = aggregateBasenameMatches(pattern.slice(1, -1).split(',')
            .map(pattern => parsePattern(pattern, options))
            .filter(pattern => pattern !== NULL), pattern);
        const n = parsedPatterns.length;
        if (!n) {
            return NULL;
        }
        if (n === 1) {
            return parsedPatterns[0];
        }
        const parsedPattern = function (path, basename) {
            for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                if (parsedPatterns[i](path, basename)) {
                    return pattern;
                }
            }
            return null;
        };
        const withBasenames = arrays.first(parsedPatterns, pattern => !!pattern.allBasenames);
        if (withBasenames) {
            parsedPattern.allBasenames = withBasenames.allBasenames;
        }
        const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
        if (allPaths.length) {
            parsedPattern.allPaths = allPaths;
        }
        return parsedPattern;
    }
    // common patterns: **/something/else just need endsWith check, something/else just needs and equals check
    function trivia4and5(path, pattern, matchPathEnds) {
        const nativePath = paths.sep !== paths.posix.sep ? path.replace(ALL_FORWARD_SLASHES, paths.sep) : path;
        const nativePathEnd = paths.sep + nativePath;
        const parsedPattern = matchPathEnds ? function (path, basename) {
            return typeof path === 'string' && (path === nativePath || strings.endsWith(path, nativePathEnd)) ? pattern : null;
        } : function (path, basename) {
            return typeof path === 'string' && path === nativePath ? pattern : null;
        };
        parsedPattern.allPaths = [(matchPathEnds ? '*/' : './') + path];
        return parsedPattern;
    }
    function toRegExp(pattern) {
        try {
            const regExp = new RegExp(`^${parseRegExp(pattern)}$`);
            return function (path) {
                regExp.lastIndex = 0; // reset RegExp to its initial state to reuse it!
                return typeof path === 'string' && regExp.test(path) ? pattern : null;
            };
        }
        catch (error) {
            return NULL;
        }
    }
    function match(arg1, path, hasSibling) {
        if (!arg1 || typeof path !== 'string') {
            return false;
        }
        return parse(arg1)(path, undefined, hasSibling);
    }
    exports.match = match;
    function parse(arg1, options = {}) {
        if (!arg1) {
            return FALSE;
        }
        // Glob with String
        if (typeof arg1 === 'string' || isRelativePattern(arg1)) {
            const parsedPattern = parsePattern(arg1, options);
            if (parsedPattern === NULL) {
                return FALSE;
            }
            const resultPattern = function (path, basename) {
                return !!parsedPattern(path, basename);
            };
            if (parsedPattern.allBasenames) {
                resultPattern.allBasenames = parsedPattern.allBasenames;
            }
            if (parsedPattern.allPaths) {
                resultPattern.allPaths = parsedPattern.allPaths;
            }
            return resultPattern;
        }
        // Glob with Expression
        return parsedExpression(arg1, options);
    }
    exports.parse = parse;
    function hasSiblingPromiseFn(siblingsFn) {
        if (!siblingsFn) {
            return undefined;
        }
        let siblings;
        return (name) => {
            if (!siblings) {
                siblings = (siblingsFn() || Promise.resolve([]))
                    .then(list => list ? listToMap(list) : {});
            }
            return siblings.then(map => !!map[name]);
        };
    }
    exports.hasSiblingPromiseFn = hasSiblingPromiseFn;
    function hasSiblingFn(siblingsFn) {
        if (!siblingsFn) {
            return undefined;
        }
        let siblings;
        return (name) => {
            if (!siblings) {
                const list = siblingsFn();
                siblings = list ? listToMap(list) : {};
            }
            return !!siblings[name];
        };
    }
    exports.hasSiblingFn = hasSiblingFn;
    function listToMap(list) {
        const map = {};
        for (const key of list) {
            map[key] = true;
        }
        return map;
    }
    function isRelativePattern(obj) {
        const rp = obj;
        return rp && typeof rp.base === 'string' && typeof rp.pattern === 'string';
    }
    exports.isRelativePattern = isRelativePattern;
    function getBasenameTerms(patternOrExpression) {
        return patternOrExpression.allBasenames || [];
    }
    exports.getBasenameTerms = getBasenameTerms;
    function getPathTerms(patternOrExpression) {
        return patternOrExpression.allPaths || [];
    }
    exports.getPathTerms = getPathTerms;
    function parsedExpression(expression, options) {
        const parsedPatterns = aggregateBasenameMatches(Object.getOwnPropertyNames(expression)
            .map(pattern => parseExpressionPattern(pattern, expression[pattern], options))
            .filter(pattern => pattern !== NULL));
        const n = parsedPatterns.length;
        if (!n) {
            return NULL;
        }
        if (!parsedPatterns.some(parsedPattern => !!parsedPattern.requiresSiblings)) {
            if (n === 1) {
                return parsedPatterns[0];
            }
            const resultExpression = function (path, basename) {
                for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                    // Pattern matches path
                    const result = parsedPatterns[i](path, basename);
                    if (result) {
                        return result;
                    }
                }
                return null;
            };
            const withBasenames = arrays.first(parsedPatterns, pattern => !!pattern.allBasenames);
            if (withBasenames) {
                resultExpression.allBasenames = withBasenames.allBasenames;
            }
            const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
            if (allPaths.length) {
                resultExpression.allPaths = allPaths;
            }
            return resultExpression;
        }
        const resultExpression = function (path, basename, hasSibling) {
            let name = undefined;
            for (let i = 0, n = parsedPatterns.length; i < n; i++) {
                // Pattern matches path
                const parsedPattern = parsedPatterns[i];
                if (parsedPattern.requiresSiblings && hasSibling) {
                    if (!basename) {
                        basename = paths.basename(path);
                    }
                    if (!name) {
                        name = basename.substr(0, basename.length - paths.extname(path).length);
                    }
                }
                const result = parsedPattern(path, basename, name, hasSibling);
                if (result) {
                    return result;
                }
            }
            return null;
        };
        const withBasenames = arrays.first(parsedPatterns, pattern => !!pattern.allBasenames);
        if (withBasenames) {
            resultExpression.allBasenames = withBasenames.allBasenames;
        }
        const allPaths = parsedPatterns.reduce((all, current) => current.allPaths ? all.concat(current.allPaths) : all, []);
        if (allPaths.length) {
            resultExpression.allPaths = allPaths;
        }
        return resultExpression;
    }
    function parseExpressionPattern(pattern, value, options) {
        if (value === false) {
            return NULL; // pattern is disabled
        }
        const parsedPattern = parsePattern(pattern, options);
        if (parsedPattern === NULL) {
            return NULL;
        }
        // Expression Pattern is <boolean>
        if (typeof value === 'boolean') {
            return parsedPattern;
        }
        // Expression Pattern is <SiblingClause>
        if (value) {
            const when = value.when;
            if (typeof when === 'string') {
                const result = (path, basename, name, hasSibling) => {
                    if (!hasSibling || !parsedPattern(path, basename)) {
                        return null;
                    }
                    const clausePattern = when.replace('$(basename)', name);
                    const matched = hasSibling(clausePattern);
                    return async_1.isThenable(matched) ?
                        matched.then(m => m ? pattern : null) :
                        matched ? pattern : null;
                };
                result.requiresSiblings = true;
                return result;
            }
        }
        // Expression is Anything
        return parsedPattern;
    }
    function aggregateBasenameMatches(parsedPatterns, result) {
        const basenamePatterns = parsedPatterns.filter(parsedPattern => !!parsedPattern.basenames);
        if (basenamePatterns.length < 2) {
            return parsedPatterns;
        }
        const basenames = basenamePatterns.reduce((all, current) => {
            const basenames = current.basenames;
            return basenames ? all.concat(basenames) : all;
        }, []);
        let patterns;
        if (result) {
            patterns = [];
            for (let i = 0, n = basenames.length; i < n; i++) {
                patterns.push(result);
            }
        }
        else {
            patterns = basenamePatterns.reduce((all, current) => {
                const patterns = current.patterns;
                return patterns ? all.concat(patterns) : all;
            }, []);
        }
        const aggregate = function (path, basename) {
            if (typeof path !== 'string') {
                return null;
            }
            if (!basename) {
                let i;
                for (i = path.length; i > 0; i--) {
                    const ch = path.charCodeAt(i - 1);
                    if (ch === 47 /* Slash */ || ch === 92 /* Backslash */) {
                        break;
                    }
                }
                basename = path.substr(i);
            }
            const index = basenames.indexOf(basename);
            return index !== -1 ? patterns[index] : null;
        };
        aggregate.basenames = basenames;
        aggregate.patterns = patterns;
        aggregate.allBasenames = basenames;
        const aggregatedPatterns = parsedPatterns.filter(parsedPattern => !parsedPattern.basenames);
        aggregatedPatterns.push(aggregate);
        return aggregatedPatterns;
    }
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[7/*vs/base/common/network*/], __M([1/*require*/,0/*exports*/,6/*vs/base/common/uri*/,2/*vs/base/common/platform*/]), function (require, exports, uri_1, platform) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Schemas;
    (function (Schemas) {
        /**
         * A schema that is used for models that exist in memory
         * only and that have no correspondence on a server or such.
         */
        Schemas.inMemory = 'inmemory';
        /**
         * A schema that is used for setting files
         */
        Schemas.vscode = 'vscode';
        /**
         * A schema that is used for internal private files
         */
        Schemas.internal = 'private';
        /**
         * A walk-through document.
         */
        Schemas.walkThrough = 'walkThrough';
        /**
         * An embedded code snippet.
         */
        Schemas.walkThroughSnippet = 'walkThroughSnippet';
        Schemas.http = 'http';
        Schemas.https = 'https';
        Schemas.file = 'file';
        Schemas.mailto = 'mailto';
        Schemas.untitled = 'untitled';
        Schemas.data = 'data';
        Schemas.command = 'command';
        Schemas.vscodeRemote = 'vscode-remote';
        Schemas.vscodeRemoteResource = 'vscode-remote-resource';
        Schemas.userData = 'vscode-userdata';
    })(Schemas = exports.Schemas || (exports.Schemas = {}));
    class RemoteAuthoritiesImpl {
        constructor() {
            this._hosts = Object.create(null);
            this._ports = Object.create(null);
            this._connectionTokens = Object.create(null);
            this._preferredWebSchema = 'http';
            this._delegate = null;
        }
        setPreferredWebSchema(schema) {
            this._preferredWebSchema = schema;
        }
        setDelegate(delegate) {
            this._delegate = delegate;
        }
        set(authority, host, port) {
            this._hosts[authority] = host;
            this._ports[authority] = port;
        }
        setConnectionToken(authority, connectionToken) {
            this._connectionTokens[authority] = connectionToken;
        }
        rewrite(uri) {
            if (this._delegate) {
                return this._delegate(uri);
            }
            const authority = uri.authority;
            let host = this._hosts[authority];
            if (host && host.indexOf(':') !== -1) {
                host = `[${host}]`;
            }
            // const port = this._ports[authority];
            const connectionToken = this._connectionTokens[authority];
            let query = `path=${encodeURIComponent(uri.path)}`;
            if (typeof connectionToken === 'string') {
                query += `&tkn=${encodeURIComponent(connectionToken)}`;
            }
            // NOTE@coder: Changed this to work against the current path.
            return uri_1.URI.from({
                scheme: platform.isWeb ? this._preferredWebSchema : Schemas.vscodeRemoteResource,
                authority: window.location.host,
                path: `${window.location.pathname.replace(/\/+$/, '')}/vscode-remote-resource`,
                query
            });
        }
    }
    exports.RemoteAuthorities = new RemoteAuthoritiesImpl();
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[13/*vs/base/common/resources*/], __M([1/*require*/,0/*exports*/,3/*vs/base/common/extpath*/,4/*vs/base/common/path*/,6/*vs/base/common/uri*/,5/*vs/base/common/strings*/,7/*vs/base/common/network*/,2/*vs/base/common/platform*/,11/*vs/base/common/glob*/,8/*vs/base/common/map*/]), function (require, exports, extpath, paths, uri_1, strings_1, network_1, platform_1, glob_1, map_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getComparisonKey(resource) {
        return hasToIgnoreCase(resource) ? resource.toString().toLowerCase() : resource.toString();
    }
    exports.getComparisonKey = getComparisonKey;
    function hasToIgnoreCase(resource) {
        // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
        // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
        return resource && resource.scheme === network_1.Schemas.file ? !platform_1.isLinux : true;
    }
    exports.hasToIgnoreCase = hasToIgnoreCase;
    function basenameOrAuthority(resource) {
        return basename(resource) || resource.authority;
    }
    exports.basenameOrAuthority = basenameOrAuthority;
    /**
     * Tests whether a `candidate` URI is a parent or equal of a given `base` URI.
     * @param base A uri which is "longer"
     * @param parentCandidate A uri which is "shorter" then `base`
     */
    function isEqualOrParent(base, parentCandidate, ignoreCase = hasToIgnoreCase(base)) {
        if (base.scheme === parentCandidate.scheme) {
            if (base.scheme === network_1.Schemas.file) {
                return extpath.isEqualOrParent(originalFSPath(base), originalFSPath(parentCandidate), ignoreCase);
            }
            if (isEqualAuthority(base.authority, parentCandidate.authority)) {
                return extpath.isEqualOrParent(base.path, parentCandidate.path, ignoreCase, '/');
            }
        }
        return false;
    }
    exports.isEqualOrParent = isEqualOrParent;
    /**
     * Tests wheter the two authorities are the same
     */
    function isEqualAuthority(a1, a2) {
        return a1 === a2 || strings_1.equalsIgnoreCase(a1, a2);
    }
    exports.isEqualAuthority = isEqualAuthority;
    function isEqual(first, second, ignoreCase = hasToIgnoreCase(first)) {
        if (first === second) {
            return true;
        }
        if (!first || !second) {
            return false;
        }
        if (first.scheme !== second.scheme || !isEqualAuthority(first.authority, second.authority)) {
            return false;
        }
        const p1 = first.path || '/', p2 = second.path || '/';
        return p1 === p2 || ignoreCase && strings_1.equalsIgnoreCase(p1 || '/', p2 || '/');
    }
    exports.isEqual = isEqual;
    function basename(resource) {
        return paths.posix.basename(resource.path);
    }
    exports.basename = basename;
    function extname(resource) {
        return paths.posix.extname(resource.path);
    }
    exports.extname = extname;
    /**
     * Return a URI representing the directory of a URI path.
     *
     * @param resource The input URI.
     * @returns The URI representing the directory of the input URI.
     */
    function dirname(resource) {
        if (resource.path.length === 0) {
            return resource;
        }
        if (resource.scheme === network_1.Schemas.file) {
            return uri_1.URI.file(paths.dirname(originalFSPath(resource)));
        }
        let dirname = paths.posix.dirname(resource.path);
        if (resource.authority && dirname.length && dirname.charCodeAt(0) !== 47 /* Slash */) {
            console.error(`dirname("${resource.toString})) resulted in a relative path`);
            dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
        }
        return resource.with({
            path: dirname
        });
    }
    exports.dirname = dirname;
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @param resource The input URI.
     * @param pathFragment The path fragment to add to the URI path.
     * @returns The resulting URI.
     */
    function joinPath(resource, ...pathFragment) {
        let joinedPath;
        if (resource.scheme === network_1.Schemas.file) {
            joinedPath = uri_1.URI.file(paths.join(originalFSPath(resource), ...pathFragment)).path;
        }
        else {
            joinedPath = paths.posix.join(resource.path || '/', ...pathFragment);
        }
        return resource.with({
            path: joinedPath
        });
    }
    exports.joinPath = joinPath;
    /**
     * Normalizes the path part of a URI: Resolves `.` and `..` elements with directory names.
     *
     * @param resource The URI to normalize the path.
     * @returns The URI with the normalized path.
     */
    function normalizePath(resource) {
        if (!resource.path.length) {
            return resource;
        }
        let normalizedPath;
        if (resource.scheme === network_1.Schemas.file) {
            normalizedPath = uri_1.URI.file(paths.normalize(originalFSPath(resource))).path;
        }
        else {
            normalizedPath = paths.posix.normalize(resource.path);
        }
        return resource.with({
            path: normalizedPath
        });
    }
    exports.normalizePath = normalizePath;
    /**
     * Returns the fsPath of an URI where the drive letter is not normalized.
     * See #56403.
     */
    function originalFSPath(uri) {
        let value;
        const uriPath = uri.path;
        if (uri.authority && uriPath.length > 1 && uri.scheme === network_1.Schemas.file) {
            // unc path: file://shares/c$/far/boo
            value = `//${uri.authority}${uriPath}`;
        }
        else if (platform_1.isWindows
            && uriPath.charCodeAt(0) === 47 /* Slash */
            && extpath.isWindowsDriveLetter(uriPath.charCodeAt(1))
            && uriPath.charCodeAt(2) === 58 /* Colon */) {
            value = uriPath.substr(1);
        }
        else {
            // other path
            value = uriPath;
        }
        if (platform_1.isWindows) {
            value = value.replace(/\//g, '\\');
        }
        return value;
    }
    exports.originalFSPath = originalFSPath;
    /**
     * Returns true if the URI path is absolute.
     */
    function isAbsolutePath(resource) {
        return !!resource.path && resource.path[0] === '/';
    }
    exports.isAbsolutePath = isAbsolutePath;
    /**
     * Returns true if the URI path has a trailing path separator
     */
    function hasTrailingPathSeparator(resource, sep = paths.sep) {
        if (resource.scheme === network_1.Schemas.file) {
            const fsp = originalFSPath(resource);
            return fsp.length > extpath.getRoot(fsp).length && fsp[fsp.length - 1] === sep;
        }
        else {
            const p = resource.path;
            return (p.length > 1 && p.charCodeAt(p.length - 1) === 47 /* Slash */) && !(/^[a-zA-Z]:(\/$|\\$)/.test(resource.fsPath)); // ignore the slash at offset 0
        }
    }
    exports.hasTrailingPathSeparator = hasTrailingPathSeparator;
    /**
     * Removes a trailing path separator, if there's one.
     * Important: Doesn't remove the first slash, it would make the URI invalid
     */
    function removeTrailingPathSeparator(resource, sep = paths.sep) {
        // Make sure that the path isn't a drive letter. A trailing separator there is not removable.
        if (hasTrailingPathSeparator(resource, sep)) {
            return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
        }
        return resource;
    }
    exports.removeTrailingPathSeparator = removeTrailingPathSeparator;
    /**
     * Adds a trailing path separator to the URI if there isn't one already.
     * For example, c:\ would be unchanged, but c:\users would become c:\users\
     */
    function addTrailingPathSeparator(resource, sep = paths.sep) {
        let isRootSep = false;
        if (resource.scheme === network_1.Schemas.file) {
            const fsp = originalFSPath(resource);
            isRootSep = ((fsp !== undefined) && (fsp.length === extpath.getRoot(fsp).length) && (fsp[fsp.length - 1] === sep));
        }
        else {
            sep = '/';
            const p = resource.path;
            isRootSep = p.length === 1 && p.charCodeAt(p.length - 1) === 47 /* Slash */;
        }
        if (!isRootSep && !hasTrailingPathSeparator(resource, sep)) {
            return resource.with({ path: resource.path + '/' });
        }
        return resource;
    }
    exports.addTrailingPathSeparator = addTrailingPathSeparator;
    /**
     * Returns a relative path between two URIs. If the URIs don't have the same schema or authority, `undefined` is returned.
     * The returned relative path always uses forward slashes.
     */
    function relativePath(from, to, ignoreCase = hasToIgnoreCase(from)) {
        if (from.scheme !== to.scheme || !isEqualAuthority(from.authority, to.authority)) {
            return undefined;
        }
        if (from.scheme === network_1.Schemas.file) {
            const relativePath = paths.relative(originalFSPath(from), originalFSPath(to));
            return platform_1.isWindows ? extpath.toSlashes(relativePath) : relativePath;
        }
        let fromPath = from.path || '/', toPath = to.path || '/';
        if (ignoreCase) {
            // make casing of fromPath match toPath
            let i = 0;
            for (const len = Math.min(fromPath.length, toPath.length); i < len; i++) {
                if (fromPath.charCodeAt(i) !== toPath.charCodeAt(i)) {
                    if (fromPath.charAt(i).toLowerCase() !== toPath.charAt(i).toLowerCase()) {
                        break;
                    }
                }
            }
            fromPath = toPath.substr(0, i) + fromPath.substr(i);
        }
        return paths.posix.relative(fromPath, toPath);
    }
    exports.relativePath = relativePath;
    /**
     * Resolves an absolute or relative path against a base URI.
     * The path can be relative or absolute posix or a Windows path
     */
    function resolvePath(base, path) {
        if (base.scheme === network_1.Schemas.file) {
            const newURI = uri_1.URI.file(paths.resolve(originalFSPath(base), path));
            return base.with({
                authority: newURI.authority,
                path: newURI.path
            });
        }
        if (path.indexOf('/') === -1) { // no slashes? it's likely a Windows path
            path = extpath.toSlashes(path);
            if (/^[a-zA-Z]:(\/|$)/.test(path)) { // starts with a drive letter
                path = '/' + path;
            }
        }
        return base.with({
            path: paths.posix.resolve(base.path, path)
        });
    }
    exports.resolvePath = resolvePath;
    function distinctParents(items, resourceAccessor) {
        const distinctParents = [];
        for (let i = 0; i < items.length; i++) {
            const candidateResource = resourceAccessor(items[i]);
            if (items.some((otherItem, index) => {
                if (index === i) {
                    return false;
                }
                return isEqualOrParent(candidateResource, resourceAccessor(otherItem));
            })) {
                continue;
            }
            distinctParents.push(items[i]);
        }
        return distinctParents;
    }
    exports.distinctParents = distinctParents;
    /**
     * Data URI related helpers.
     */
    var DataUri;
    (function (DataUri) {
        DataUri.META_DATA_LABEL = 'label';
        DataUri.META_DATA_DESCRIPTION = 'description';
        DataUri.META_DATA_SIZE = 'size';
        DataUri.META_DATA_MIME = 'mime';
        function parseMetaData(dataUri) {
            const metadata = new Map();
            // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
            // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
            const meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
            meta.split(';').forEach(property => {
                const [key, value] = property.split(':');
                if (key && value) {
                    metadata.set(key, value);
                }
            });
            // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
            // the mime is: image/png
            const mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
            if (mime) {
                metadata.set(DataUri.META_DATA_MIME, mime);
            }
            return metadata;
        }
        DataUri.parseMetaData = parseMetaData;
    })(DataUri = exports.DataUri || (exports.DataUri = {}));
    class ResourceGlobMatcher {
        constructor(globalExpression, rootExpressions) {
            this.expressionsByRoot = map_1.TernarySearchTree.forPaths();
            this.globalExpression = glob_1.parse(globalExpression);
            for (const expression of rootExpressions) {
                this.expressionsByRoot.set(expression.root.toString(), { root: expression.root, expression: glob_1.parse(expression.expression) });
            }
        }
        matches(resource) {
            const rootExpression = this.expressionsByRoot.findSubstr(resource.toString());
            if (rootExpression) {
                const path = relativePath(rootExpression.root, resource);
                if (path && !!rootExpression.expression(path)) {
                    return true;
                }
            }
            return !!this.globalExpression(resource.path);
        }
    }
    exports.ResourceGlobMatcher = ResourceGlobMatcher;
    function toLocalResource(resource, authority) {
        if (authority) {
            let path = resource.path;
            if (path && path[0] !== paths.posix.sep) {
                path = paths.posix.sep + path;
            }
            return resource.with({ scheme: network_1.Schemas.vscodeRemote, authority, path });
        }
        return resource.with({ scheme: network_1.Schemas.file });
    }
    exports.toLocalResource = toLocalResource;
});

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(__m[19/*vs/workbench/contrib/output/common/outputLinkComputer*/], __M([1/*require*/,0/*exports*/,6/*vs/base/common/uri*/,3/*vs/base/common/extpath*/,13/*vs/base/common/resources*/,5/*vs/base/common/strings*/,20/*vs/editor/common/core/range*/,2/*vs/base/common/platform*/,7/*vs/base/common/network*/,10/*vs/base/common/arrays*/]), function (require, exports, uri_1, extpath, resources, strings, range_1, platform_1, network_1, arrays_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OutputLinkComputer {
        constructor(ctx, createData) {
            this.ctx = ctx;
            this.patterns = new Map();
            this.computePatterns(createData);
        }
        computePatterns(createData) {
            // Produce patterns for each workspace root we are configured with
            // This means that we will be able to detect links for paths that
            // contain any of the workspace roots as segments.
            const workspaceFolders = createData.workspaceFolders
                .sort((resourceStrA, resourceStrB) => resourceStrB.length - resourceStrA.length) // longest paths first (for https://github.com/microsoft/vscode/issues/88121)
                .map(resourceStr => uri_1.URI.parse(resourceStr));
            for (const workspaceFolder of workspaceFolders) {
                const patterns = OutputLinkComputer.createPatterns(workspaceFolder);
                this.patterns.set(workspaceFolder, patterns);
            }
        }
        getModel(uri) {
            const models = this.ctx.getMirrorModels();
            return arrays_1.find(models, model => model.uri.toString() === uri);
        }
        computeLinks(uri) {
            const model = this.getModel(uri);
            if (!model) {
                return [];
            }
            const links = [];
            const lines = model.getValue().split(/\r\n|\r|\n/);
            // For each workspace root patterns
            for (const [folderUri, folderPatterns] of this.patterns) {
                const resourceCreator = {
                    toResource: (folderRelativePath) => {
                        if (typeof folderRelativePath === 'string') {
                            return resources.joinPath(folderUri, folderRelativePath);
                        }
                        return null;
                    }
                };
                for (let i = 0, len = lines.length; i < len; i++) {
                    links.push(...OutputLinkComputer.detectLinks(lines[i], i + 1, folderPatterns, resourceCreator));
                }
            }
            return links;
        }
        static createPatterns(workspaceFolder) {
            const patterns = [];
            const workspaceFolderPath = workspaceFolder.scheme === network_1.Schemas.file ? workspaceFolder.fsPath : workspaceFolder.path;
            const workspaceFolderVariants = [workspaceFolderPath];
            if (platform_1.isWindows && workspaceFolder.scheme === network_1.Schemas.file) {
                workspaceFolderVariants.push(extpath.toSlashes(workspaceFolderPath));
            }
            for (const workspaceFolderVariant of workspaceFolderVariants) {
                const validPathCharacterPattern = '[^\\s\\(\\):<>"]';
                const validPathCharacterOrSpacePattern = `(?:${validPathCharacterPattern}| ${validPathCharacterPattern})`;
                const pathPattern = `${validPathCharacterOrSpacePattern}+\\.${validPathCharacterPattern}+`;
                const strictPathPattern = `${validPathCharacterPattern}+`;
                // Example: /workspaces/express/server.js on line 8, column 13
                patterns.push(new RegExp(strings.escapeRegExpCharacters(workspaceFolderVariant) + `(${pathPattern}) on line ((\\d+)(, column (\\d+))?)`, 'gi'));
                // Example: /workspaces/express/server.js:line 8, column 13
                patterns.push(new RegExp(strings.escapeRegExpCharacters(workspaceFolderVariant) + `(${pathPattern}):line ((\\d+)(, column (\\d+))?)`, 'gi'));
                // Example: /workspaces/mankala/Features.ts(45): error
                // Example: /workspaces/mankala/Features.ts (45): error
                // Example: /workspaces/mankala/Features.ts(45,18): error
                // Example: /workspaces/mankala/Features.ts (45,18): error
                // Example: /workspaces/mankala/Features Special.ts (45,18): error
                patterns.push(new RegExp(strings.escapeRegExpCharacters(workspaceFolderVariant) + `(${pathPattern})(\\s?\\((\\d+)(,(\\d+))?)\\)`, 'gi'));
                // Example: at /workspaces/mankala/Game.ts
                // Example: at /workspaces/mankala/Game.ts:336
                // Example: at /workspaces/mankala/Game.ts:336:9
                patterns.push(new RegExp(strings.escapeRegExpCharacters(workspaceFolderVariant) + `(${strictPathPattern})(:(\\d+))?(:(\\d+))?`, 'gi'));
            }
            return patterns;
        }
        /**
         * Detect links. Made static to allow for tests.
         */
        static detectLinks(line, lineIndex, patterns, resourceCreator) {
            const links = [];
            patterns.forEach(pattern => {
                pattern.lastIndex = 0; // the holy grail of software development
                let match;
                let offset = 0;
                while ((match = pattern.exec(line)) !== null) {
                    // Convert the relative path information to a resource that we can use in links
                    const folderRelativePath = strings.rtrim(match[1], '.').replace(/\\/g, '/'); // remove trailing "." that likely indicate end of sentence
                    let resourceString;
                    try {
                        const resource = resourceCreator.toResource(folderRelativePath);
                        if (resource) {
                            resourceString = resource.toString();
                        }
                    }
                    catch (error) {
                        continue; // we might find an invalid URI and then we dont want to loose all other links
                    }
                    // Append line/col information to URI if matching
                    if (match[3]) {
                        const lineNumber = match[3];
                        if (match[5]) {
                            const columnNumber = match[5];
                            resourceString = strings.format('{0}#{1},{2}', resourceString, lineNumber, columnNumber);
                        }
                        else {
                            resourceString = strings.format('{0}#{1}', resourceString, lineNumber);
                        }
                    }
                    const fullMatch = strings.rtrim(match[0], '.'); // remove trailing "." that likely indicate end of sentence
                    const index = line.indexOf(fullMatch, offset);
                    offset += index + fullMatch.length;
                    const linkRange = {
                        startColumn: index + 1,
                        startLineNumber: lineIndex,
                        endColumn: index + 1 + fullMatch.length,
                        endLineNumber: lineIndex
                    };
                    if (links.some(link => range_1.Range.areIntersectingOrTouching(link.range, linkRange))) {
                        return; // Do not detect duplicate links
                    }
                    links.push({
                        range: linkRange,
                        url: resourceString
                    });
                }
            });
            return links;
        }
    }
    exports.OutputLinkComputer = OutputLinkComputer;
    function create(ctx, createData) {
        return new OutputLinkComputer(ctx, createData);
    }
    exports.create = create;
});

}).call(this);
//# sourceMappingURL=outputLinkComputer.js.map
