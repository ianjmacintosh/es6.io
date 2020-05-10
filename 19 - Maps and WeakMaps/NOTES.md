## Module 19: Map and Weak Map
### Maps
Sets are to arrays what maps are to objects. However, unlike sets, you can loop over them with `forEach` or `for-of`. So you might be asking why not just use an object? In the next module, Wes explains you can use a map to store metadata about your items.

### Map Metadata with DOM Node Keys
Wes explains one benefit of using maps is you can use an object as the key in a map -- whereas in an object, the key has to be a string. For example, say you have a bunch of buttons and you want to record each time each button is clicked. You could put that directly on the button element itself, but maps let you take a more subtle approach:

```js
const clickCounts = new Map();
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    clickCounts.set(button, 0);
    button.addEventListener("click", function() {
        const val = clickCounts.get(this);
        clickCounts.set(this, val + 1);
    })
});
```

See how much tidier this is than putting unique keys on all your DOM nodes? It's certainly not as obvious (like having a `data` attribute hanging off your element like a bump on a log), but it's way slicker.

### WeakMap and Garbage Collection
WeakMap has no size (or at least not a publicly exposed one that's part of the API), you can never tell how many elements in it, it's not enumerable or iterable, and if the elements in it are not stored somewhere else, they'll get garbage collected.