## Module 9: Object Literal Upgrades
### Object Literal Upgrades
When making a new object literal and populating its values with variable, if you want to use the variable's name as the key, you can omit the key/value pair thing and just the variable name. See:
```js
const make = "Ford";
const model = "GT40";
const year = "1965";
const car = {
    make,
    model,
    year
};
```

If you're populating some of those properties with methods, instead of spelling out the key and the function, you can write the name of the method and follow it with parens and your function body:
```js
const car = {
    startEngine: function() { // Instead of this...
        alert("Brrrmrhrhrrrhgrhrmrmrhrhghrhrhrrmmm!!");
    },
    stopEngine() { // ...you can do this!
        alert("Click!");
    }
}
```

You can also use _computed values_ in your object literal!
```js
const name = prompt("What's your name?");
const favoriteThing = prompt("What's your favorite thing in the world?");
const superheroIdentities = {
    [`${favoriteThing}man`]: name // Adds a new sunglassesman property, loaded up with the sunglasses-lover's name
};
```

If you're a complete psychopath, you could use `shift()` to bump some values off one by one and populate an object that way instead of using `map()`. I have no idea why you'd do this to your code, but it's a free country.
```js
const keys = ["model", "color", "size"];
const values = ["BeastMode 2000","iridium gold","large"];
const sunglasses = {
    [keys.shift()]: values.shift(),
    [keys.shift()]: values.shift(),
    [keys.shift()]: values.shift()
}
```