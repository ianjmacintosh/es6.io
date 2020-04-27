## Module 6: Iterables & Looping
### The `for-of` Loop
`for-of` can work on any iterable. Our existing loops are pretty handy, but they have some limitations: the classic `for` loop is powerful but a little clunky. `forEach` is also very powerful, but doesn't allow you to break mid-loop. `for-in` is great but has a nasty side effect of iterating over _anything_ that was added to an object, including prototype methods. Even if you don't, another library might, making code that uses `for-in` a little less portable if you don't account for that.

But with `for-of` you can break and continue mid-loop and not have to worry about prototype modifications (or other things hanging off your data)

```js
const cuts = ["Chuck", "Brisket", "Rib Eye", "Shank"];
for (const cut of cuts) {
    console.log(cut);
}
```

You can also `break` or `continue`

```js
const cuts = ["Chuck", "Brisket", "Rib Eye", "Shank"];
for (const cut of cuts) {
    if (cut === "Brisket") {
        continue; // Will move to next iteration
    }
    console.log(cut);
}
```

### The `for-of` Loop in Action
`for-of` is very flexible especially when combined with generators. For instance, if you were to use `entries()` you would be able to get the index and the property of each thing you're iterating over, and you could use array destructuring in order to concisely grab them.

```js
const cuts = ['Chuck', 'Brisket', 'Shank', 'Short Rib'];

for (const [i, cutName] of cuts.entries()) {
console.log(`${cutName} is item #${i + 1} of the cuts`);
}
```

Since strings are iterable, you could use `for-of` with those too.

```js
const name = "Hello World";
for (let char of name) {
    console.log(char);
}
```

Since NodeLists are not true arrays, you don't necessarily have all the array methods you might be used to when doing something like `document.querySelectorAll("img")`. Of course you could convert your list to an array instead, but if that's not a good option (for whatever reason) you can use `for-of` instead, and do whatever it is you were trying for that way instead.

### Using `for-of` with Objects
With a little ingenuity, you can also use `for-of` with objects even though they aren't iterables. You can use `entries()` in ES2017 if you've got access to it (or use a polyfill) to give yourself an iterable. You can use `keys()` to get yourself there. `keys()` will return an iterable list of all the keys on the object, then while looping you can use those keys to get the values off the object. To illustrate:
```js
const car = {
    make: "Ford",
    model: "Mustang",
    year: 1983,
    color: "red"
}

for (prop of Object.keys(car)) {
    console.log(car[prop]);
}
```

However, this can be done a little simpler with `for-in` without having to reach out to the `Object.keys()` method:

```js
for (const prop in car) {
    console.log(car[prop]);
  }
```

I think these techniques are all nice to learn and read about, but it'll take me some hands-on experience to appreciate them over the loops I'm already familiar with.