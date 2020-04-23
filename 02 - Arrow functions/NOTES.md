# Module 2: Function Improvements and Default Arguments
## Arrow Functions Introduction
Arrow functions have a few differences (not necessarily benefits) compared to "traditional" functions. The key differences Wes points out:
* They're terse, you cannot name them (yet) and while that looks neat and tidy, that also means your stack trace will be a little less helpful
* They can implicitly return values if you omit the curly braces, enabling you to do neat little one-liners
* They do not rebind `this` when called within a scope that already has it

For me, the one-liner thing is cool and makes code a little neater, but I understand a drawback, which is that it's a little less expressive. Wes shows a way around some of this by storing an arrow function in a named variable, but he also shows that when you pass it to `Array.map()` (as an example) it can look real slick.

## More Arrow Function Examples
If you want to return an object implicitly, but you're stuck on how to return an object without your interpreter thinking you're opening curlies to start a function body (i.e., `const getObject = () => { make: "Ford", model: "Mustang" }`) you can wrap your object in parens:

```js
const getObject = () => ({ make: "Ford", model: "Mustang" })
```

Also, Wes shows that if you're trying to get true or false back from something in an arrow function, like when you pass it to `Array.filter()` you can return your condition and it will evaluate to true or false. i.e., `Array.map(age => age >= 60)`

## Arrow Functions and `this`
Arrow functions not rebinding `this` is really when you want to modify something... but not immediately. For example, let's say you've got a registration form and you want to disable the submit button while you're checking to see if their desired username is taken -- and if it is, you want to tell them it's taken, then enable the submit button again. When you submit the form, you'll have that form as `this` (great!) and can disable the button without having to do any querySelector business. But you want to re-enable that button when the server responds. If you just have a regular traditional function, you will lose that form and its submit button, so to re-enable the button you'd need to search the DOM for your form again (`querySelector` or `getElementById` or whatever) -- with an arrow function however, you can inherit `this` in your callback.

## Default Function Arguments
Instead of doing the old-school goofy `tax = tax || 0.0625` or whatever, you can now specify a default value in your function declaration's argument list when you're defining your call signature. In other words:
```js
function getPrice(total, tax = 0.0625, tip = 0.20) {
    return total + (total * tax) + (total * tip);
}
```
Also, let's say you've got several arguments and you want to omit one in the middle (and let it just fall back to whatever its default is) you can explicitly pass undefined: `getPrice(100, undefined, 0.25)` -- pretty cool.

## When NOT to use an Arrow Function
* If you're binding an event listener and need `this` to know what just got clicked, don't use an arrow function! You won't get `this`!
* When you need to bind to an object. If you're doing some OOP business, and you've got a getter or setter (for instance) it won't work if you're trying to use `this`. "You'll never get `this`!"-- Borat
* When you need to add to a prototype method. If you've got an object and you go to modify its prototype object, if you try to do it using an arrow function, you won't get `this`! It'll go to the window.
* When you need the arguments object -- just like `this`, you won't get `arguments` either.