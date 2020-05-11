## Async + Await Flow Control
### Async Await - Native Promises Review
Lots of newer browser APIs uses Promises instead of callbacks for success and error, so understanding how Promises work is pretty important for being able to work with modern JavaScript. The super quick version is: Promises return a promise object, and in order to handle their responses you chain `.then()` calls to them, and `.catch()` methods at the end to pick up any errors you might have encountered. Instead of specifying a callback, you pass your handler into one of those two different methods.

### Async Await - Custom Promises Review
If you have your own function that needs to take some time and you don't want to get stuck in callback hell, you can make your own Promise instead. Here's an example:
```js
function breathe(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`Done for ${duration}ms`), duration);
    })
}

breathe(1000).then(res => {
    console.log(res);
    return breathe(1000);
}).then(res => {
    console.log(res);
    return breathe(1000);
}).then(res => {
    console.log(res);
    return breathe(1000);
}).then(res => {
    console.log(res);
    return breathe(1000);
}).then(res => {
    console.log(res);
    return breathe(1000);
});
```

If you want to handle errors, you can do that with `.catch()` at the end, and you can expose it through `reject()` from your promise.

```js
function breathe(duration) {
    return new Promise((resolve, reject) => {
        if (duration < 500) reject("Too short!");
        setTimeout(() => resolve(`Done for ${duration}ms`), duration);
    })
}

breathe(1000).then(res => {
    console.log(res);
    return breathe(200);
}).then(res => {
    console.log(res);
    return breathe(1000);
}).then(res => {
    console.log(res);
    return breathe(1000);
}).catch(err => {
    console.error("Error encountered: " + err);
})
```

### All About Async + Await
Async + await are built on top of Promises and allow you to get away from these gnarly chained functions. To use the `await` keyword, you need to be inside a function that's been defined with the `async` keyword:
```js
async function() { // When used with an arrow function, it'd be like `const getThing = async () => { ... }
    console.log("Start");
    await breathe(1000); // This works because it's inside an async function
    console.log("End");
}
```

You cannot call `await` unless you are inside an `async` function scope!
You can use `await` in front of your function to tell the browser to wait until the promise is either resolved or rejected before resolving a value. For example:
```js
async function doBreathing() {
    const res1 = await breathe(1000);
    console.log(res1);
    const res2 = await breathe(200);
    console.log(res2);
    const res3 = await breathe(3000);
    console.log(res3);
}
```

### Async + Await Error Handling
If you want to catch errors instead of letting them get dumped out as an uncaught exception, you can do it by wrapping all your awaits in `try-catch`:
```js
async function doBreathing() {
    try {
        const res1 = await breathe(1000);
        console.log(res1);
        const res2 = await breathe(200);
        console.log(res2);
        const res3 = await breathe(3000);
        console.log(res3);
    } catch (err) {
        console.log(err);
    }
}
```

However, this might not be practical for your use case -- like a situation where you've got a whole ton of these you have to wait for. So that's where a _high-order function_ can be useful. Essentially, a high-order function is a function that takes a function in and puts a new function out. It's a way of taking a function and changing it without modifying the original function code:
```js
function catchErrors(fn) {
    return function () {
        return fn().catch((err) => {
            console.error("Uh oh!");
            console.error(err);
        });
    }
}

function breathe(duration) {
    return new Promise((resolve, reject) => {
        if (duration < 500) reject("Too short!");
        setTimeout(() => resolve(`Done for ${duration}ms`), duration);
    })
}

async function doBreathing() {
    const res1 = await breathe(1000);
    console.log(res1);
    const res2 = await breathe(200);
    console.log(res2);
    const res3 = await breathe(3000);
    console.log(res3);
}

const wrappedFunction = catchErrors(doBreathing);
```

If you're reading that and thinking "Okay, but what if I need to pass arguments to `doBreathing`?" No problem! Use rest and spread:
```js
function catchErrors(fn) {
    return function (...args) {
        return fn(...args).catch((err) => {
            console.error("Uh oh!");
            console.error(err);
        });
    }
}
```

As an aside, you don't always want to catch errors this way -- sometimes it might be most appropriate to catch the error just in your own function! But in case you need to, you can do it.

### Waiting on Multiple Promises
If you want to wait on multiple Promises to resolve, you can do that with `Promise.all()`:
```js
async function go() {
    const p1 = fetch(".../user123");
    const p2 = fetch(".../user456");

    const res = await Promise.all([p1, p2]);
    console.log(res);
}
```

If you just want to wait for the first one to come back, you can do that also with the `race()` method instead of `all()`:
```js
const res = await Promise.race([p1, p2]);
```

### Promisifying Callback Based Functions
Promises and async and await are much more pleasant to work with than callbacks, but maybe you're working on some legacy code that's not working with promises yet. If you want to "promisify" your legacy code, it's not that hard.

```js
navigator.geolocation.getCurrentPosition(function(pos) { // Success function
    console.log("Success!");
    console.log(pos);
}, function(err) { // Error function
    console.log("Failed!");
    console.error(err);
})
```

Now let's say you want to use promises here instead? No problemo:
```js
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function go() {
    const pos = await getCurrentPosition();
    console.log(pos);
}
```

You can see above we're taking the resolve and reject arguments from the Promise and passing them into the native `navigator.geolocation.getCurrentPosition()` call.