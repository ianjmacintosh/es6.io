## Module 8: Say Hello to ...Spread and ...Rest
### Spread Operator Introduction
The spread operator can be applied to any iterable, and it gives you the result of iterating over said iterable. For instance, if you want to spread a string into an array, you could do:
```js
let nameLetters = [..."Ian"]; // Yields ["I","a","n"]
```
It's also handy though for copying arrays. Remember a gotcha about arrays when trying to copy them:
```js
let original = [ 1, 1, 2, 3, 5]
let copy = original;
copy[0] = 90210;
original; // Returns [90210, 1, 2, 3, 5]
```
This is because you copied the reference, not the values. If you'd like to copy the values, the rest operator lest you do what you want concisely as:
```js
copy = [...original];
copy[0] = 23;
original; // Returns [90210, 1, 2, 3, 5]
copy; // Returns [23, 1, 2, 3, 5]
```

There were ways of doing this before, but this is pretty terse and handy.

### Spread Exercise
The object of the game is to wrap each letter in the headline in a span. Here's how I did it:
```js
  const headline = document.querySelector("h2");

  headline.innerHTML = [...headline.textContent].map(
    (letter) => {
      return `<span>${letter}</span>`;
    }).join("");
```

I guess I could've done the map function as a one-liner but I did this on the fly (without thinking it through first) and wasn't sure if I'd need to do other stuff in the map function.

Yippee for exercises!

### More Spread Examples
You can spread a NodeList into an array like so:
```js
const people = [...document.querySelectorAll(".people p")]; // Now I have all my cool Array prototype functions!
```

But as an aside, Wes prefers using `Array.from()` here because it reads a little nicer, and I agree.

You can also spread arrays if they're properties on an object. As long as the thing you're trying to spread evaluates as an iterable.

Likewise, if you're doing some work with slicing, you can do stuff like `[...comments.slice(0,badIndex), ...comments.slice(badIndex + 1)]` to avoid having an array of two arrays.

### Spreading into a function
You could push items onto a list by using this syntax:
```js
oldList.push.apply(oldList, newList);
```

This works because `apply` calls the function on each thing passed as the second argument, but it doesn't read super-obvious to all developers (myself included). Now you can use the spread operator instead:
```js
oldList.push(...newList); // Now your list is updated!
```

Obviously, you can do this for your own functions also!

```js
const names = ['Ian', 'MacIntosh'];
greetPerson(...names);

function greetPerson(first, last) {
    alert(`Hello ${first} ${last}`);
}
```

### The ...rest param in Functions and destructuring
`...` isn't just the spread operator, it is also used for a "rest param" -- in Wes's words, the exact opposite of the spread operator. Where the spread operator unpacks an iterable, the rest operator packs it all up.

```js
function convertCurrency(rate, ...amounts) {
    return amounts; // Will return an array when you call it like `convertCurrency(1.80, bob, one, test, blah);`... returns [ "bob", "one", "test", "blah" ]
}
```

You can also use the rest operator when destructuring:
```js
const team = ["Wes", "Ian", "Aline", "Green", "Jeanjean"];
const [captain, lead, ...players] = team;

captain; // Returns "Wes"
lead; // Returns "Ian"
players; // Returns ["Aline", "Green", "Jeanjean"]
```