## Module 16: Generators
### Introducing Generators
Functions and methods in JavaScript historically have run from top to bottom, all the way until the end or hitting a return statement. Generators however allow you to stop and start, picking back up where you left off. To create a generator function, use the `*` syntax:
```js
function* getGreeting() {
    ...
}
```

We also use the `yield` keyword, which can be thought of as "`return` for now":
```js
function* getGreeting() {
    yield 'What\'s up?';
    yield 'Que tal?';
    yield 'Ça va?';
}
```

To call our generator, we store it in a variable and call `.next()` on it:
```js
const greeting = getGreeting();

greeting.next(); // Returns an object with a `value` property of "What's up?" and a `done` value of false.
greeting.next(); // Returns an object with a `value` property of "Que tal?" and a `done` value of false.
greeting.next(); // Returns an object with a `value` property of "Ça va?" and a `done` value of false.
greeting.next(); // Returns an object with a `value` property of undefined and a `done` value of true.
```

And of course, you can set up a loop inside your generator and do this all with a single yield keyword instead -- the state of the last iteration will be preserved.

### Using Generators for Ajax Flow Control
Generators can also give you a way to work around a "callback hell" problem where several things need to happen in a certain sequence because each step is dependent on the one before it.

```js
function ajax(url) {
    fetch(url)
        .then(data => data.json()).then(data => dataGen.next(data))
}

function* steps() {
    bestSellingBooksUrl = "...";
    goodReadsUrl = "...";

    const books = yield ajax(bestSellingBooksUrl);

    const topBook = books[0];
    const bookInfo = yield ajax(`${goodReadsUrl}?q=${topBook}`);

    const bookRating = bookInfo.rating;
    console.log(`The most popular book is rated ${bookRating} on Goodreads!`);
}

const dataGen = steps;
dataGen.next();
```
One thing I don't really understand here is how the data from the ajax request goes _into_ the generator, but I'm hoping that in time that will make more sense to me. Right now it just seems super weird, because `steps()` doesn't accept parameters. Even after experimenting with it and stepping through this in debugger, it still makes no sense to me. Something to come back to. 🤷🏻‍♂️

### Looping Generators with for of
If you want to get all the values from a generator, you can use the `for-of` loop to iterate over it. It will just return the values, not the funky generator response object.

```js
function* generator() {
    ...
}
for (const item of generator) {
    console.log(item); // This will just get everything from the generator because the generator is an iterable
}
```

### My Thoughts on Generators
I get the impression that generators are a solution for problems that I haven't had to focus on recently. Just like with some of the other techniques I've seen in previous modules, I have a tenuous grasp on the idea, but I think I'm going to need to see it in action and get more experience with it before I totally understand its value.
