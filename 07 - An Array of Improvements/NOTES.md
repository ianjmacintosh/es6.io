## Module 7: An Array of Array Improvements
### `Array.from()` and `Array.of()`
These are interesting because they are not on the prototype object, they are on the array itself. `Array.from()` is useful for turning array-like collections into arrays, such as when working with a NodeList that's been retrieved from the DOM.
One thing that's neat about `Array.from()` is you can pass it a map function as its second parameter when calling it, and this way you can modify the content of the array you're creating _as you create it!_
`Array.of()` to me seems totally stupid -- it's basically the same as `[]`. When I say "basically" I mean "exactly" because I can't tell the difference. I guess one is a method and the other is... syntax? An operator? idk, seems really dumb to me. I also don't know the difference between `Array.of()` and `Array.from()` now that I think about it. Maybe someday!

### `Array.find()` and `Array.findIndex()`
These are pretty handy when trying to locate a member of an array.
```js
const post = posts.find(post => post.code === "VB822diRu"); // Finds you the object in an array of objects, where the one you want has a property "code" of "VB822diRu"
```

If you want to get the index instead, it's the same syntax, just a different method:
```js
const post = posts.findIndex(post => post.code === "VB822diRu"); // Finds you the object in an array of objects, where the one you want has a property "code" of "VB822diRu"
```

### `Array.some()` and `Array.every()`
These are not strictly speaking part of ES6, but they could get some more attention. These methods are really helpful when checking if your list meets certain criteria. Do some of its members meet a criteria? Do all of its members meet a criteria? Use `Array.some()` or `Array.every()`!

For example:
```js
const ages = [ 12, 21, 18, 16 ];
const adultPresent = ages.some(age => age >= 18); // Does any age meet or exceed 18?
```

Or...
```js
const ages = [ 12, 21, 18, 16 ];
const canGoToTheBar = ages.every(age => age >= 21); // Can everyone go to the bar?
```