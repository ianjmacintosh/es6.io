## ES7, ES8 + Beyond
### Class Properties
Developers who've worked with React before might have done some work with class properties (also sometimes called "class initializers" or "field declarations") but for other developers, this is probably something new.
When working with classes, often you'll set some properties for that instance of the class in the initializer:
```js
class Car {
    car(make, model) {
        this.make = make;
        this.model = model;
    }
}
```

But a lot of the times, you'll have a whole bunch of stuff that you want to set on a class, and some of those things might not even need to be set with arguments:
```js
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.odometer = 0;
        this.tripmeter = 0;
    }
}
```

Instead of dumping everything in the world in your constructor, with class properties, you could simply load them in the scope of your class body:
```js
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }

    odometer = 0;
    tripmeter = 0;
}
```

That wasn't available when Wes recorded the video, and as of today (May 11, 2020) they're an "experimental feature (stage 3)" that would need to be transpiled through Babel to be used.

### padStart and padEnd
If you want to normalize the length of a string, you can now do it with the string methods `padStart()` and `padEnd()`, which take a number and (optionally) a character:
```js
"hello world".padStart(20); // Returns "         Hello world"`
"test".padEnd(8, "X"); // Returns "testXXXX"
```
This is useful when working with console output or something. Or if you're working with numbers, you could add those zeroes as leading zeroes (Wes gives this example, but it seems kinda inappropriate to do this sort of thing with a string method instead of a number method but w/e). As a side note, if you don't have enough space for your pad, the pad will just get truncated mid-string to make it fit.

### ES7 Exponential Operator
ES7 gave us two things: `Array.prototype.includes()` to return a boolean a given value is in an array, and the exponential operator: `**`. So now instead of using `Math.pow(2,2)` you can now say `2 ** 2` to get the same thing.
This is nice because if you wanted to get `2 ** 2 ** 2 ** 2` or something you can, whereas before you'd have to do something kind of weird involving the Math API:
```js
2 ** 2 ** 2; // returns 16
Math.pow(Math.pow(2,2),2); // returns 16

2 ** 2 ** 2 ** 2; // returns 65536
Math.pow(Math.pow(Math.pow(2,2),2),2); // Careful! This returns 256
```

### Function Arguments Trailing Comma
A few years ago we got dangling commas in array and object literals, and now we've got it in functions!
Wes likes dangling commas because they allow you to modify less code in the future. Instead of having to modify a line to add a comma and take responsibility for the preceding line to the thing you want to add (and possibly show up in a `git blame` down the road), why not just keep things clearer in the history and make less work for the next developer?
Now we can do the same thing with functions:
```js
function family(mom, dad,) { // Add params all you like
    ...
}
```
Wes generally likes these rules to be applied with automatic tools like ESLint or Prettier.

### Object.entries() and Object.values()
We've had `Object.keys()` for a while to return all the keys on an object, and now we've got `Object.values()` to get the values, and `Object.entries()` to get an array of both!
These are handy for looping over objects and making things with the output. They're all iterables, so you can also use `for-of` loops, which Wes really likes because you can `break` out of them. In his example, he has an object that holds a store inventory, and he loops over things. With a `for-of` loop, we could make some HTML to show that inventory as a list, and we could skip over items that have no inventory. Wes says he still prefers mapping over arrays instead of using `for-of` since it's not all that often he has to `break`, but another benefit of `for-of` is that you can use it on any iterable, while `forEach` and `map` are specific to arrays.