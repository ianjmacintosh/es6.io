# Module 5: Destructuring
## Destructuring Objects
Instead of repeating the same expression when setting a bunch of variables based on the value of an object, you can use destructuring to reduce the amount of repetition:
```js
const person = { first: "Ian", last: "MacIntosh" };
/*
// Old way:
const first = person.first;
const last = person.last;
*/
const { first, last } = person;
```

This is even more useful for getting deeply nested values from objects:
```js
const location = {
    country: "us",
    regionDetails: {
        state: {
            stateName: "nh",
            city: {
                cityName: "nashua",
                nickname: "The Gate City"
            }
        }
    }
}
const { cityName, nickname } = location.regionDetails.state.city;
```

If you want to change the name of the variable, you can do that also:
```js
const {cityName: myCity, nickname: myCityNickname }; // Stores these values in myCity and myCityNickname
```

You can also set fallback/default values while destructuring, just in case a value isn't present in the object you're pulling from.
```js
const mySettings = { width: 360, color: "black" };
const { width = 640, height = 480, color = "blue", fontSize = 25 } = mySettings; // Use = to set parameter defaults, just like in an ES6 function declaration!
```

## Destructuring Arrays
When destructuring an object, you use `{}`, so when you destructures arrays naturally you use `[]` instead. The order of the names there will correspond to how they'll be taken from the array. In other words, the first name will be the name of the variable loaded from the first member of the array. Let's illustrate:
```js
const movieDetails = ["Close Encounters", 1977, "Sci-Fi"];
const [name, year, genre] = movieDetails; // Populates variables name, year, and genre
```

When you're trying to get data, sometimes you'll just have a big honkin' string, but you can split it up into an array if you've got some trustworthy delimiters! Use `String.split()`!

```js
const data = "Close Encounters,1977,Sci-Fi";
const [name, year, genre] = data.split(","); // Populates variables name, year, and genre -- make your data an array by using split()
```

Sometimes you'll have more things on the array than you need that one-to-one mapping with. If you don't want them, that's fine, they'll just get thrown away. But if you _do_ want them, you can roll them up into a variable with the rest (`...`) operator.

```js
const data = "Close Encounters,1977,Sci-Fi,Teri Garr,Richard Dreyfuss,Steven Spielberg";
const [name, year, genre, ...credits] = data.split(","); // Same as before, but now your additional contributors will be stored in `credits` as an array
```

## Swapping Variables with Destructuring
Instead of making temp variables to swap variable values, now we can use destructuring to do it.

```js
let inRing = "Hulk Hogan";
let onSide = "The Rock";
/*
// Old way
let tmp = inRing;
let inRing = onSide;
let tmp = onSide;
*/
[inRing, onSide] = [onSide, inRing]; // Definitely shorter. Easier to read if you're familiar with array destructuring
```

## Destructuring Functions - Multiple returns and named defaults
You can use these techniques when you're getting a value back from a function. It looks a little different but it's the same exact thing. For instance:

```js
function convertCurrency(amount) {
    const converted = {
        USD: amount * 0.76,
        GBP: amount * 0.53,
        AUD: amount * 1.01,
        MXN: amount * 13.30
    }

    return users[memberId];
}

let { USD, AUD } = convertCurrency(100); // Stores USD and AUD
```

But more useful is giving yourself the freedom to pass an object into a function by using object destructuring your function definition. I say "freedom" because you no longer need to be restricted to passing your arguments in a specific order.
```js
function calculateCost({ total, tax = 0.13, tip = 0.15 }) {
    return total + (total * tax) + (total * tip);
}
calculateCost({ total: 26.94, tip: 0.20 }); // Can omit tax.
// BONUS POINTS: Alternatively, if you remember the order, maybe you'll remember we learned you can pass undefined explicitly: `calculateCost(26.94, undefined, 0.20)`
```

Note: If you pass NO OBJECT, you'll have to set a default in your function signature. Makes sense, but it's easier to understand if you view it:
```js
function calculateCost({ total, tax = 0.13, tip = 0.15 } = {}) { // See that "= {}"? That's a default object to save you from trying to access properties of undefined
    ...
}
```