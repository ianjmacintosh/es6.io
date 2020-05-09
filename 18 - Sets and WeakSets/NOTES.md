## Module 18: Sets and WeakSets
### Sets
A set is like a unique array (each item must be unique) with a nicer API for managing the items inside.

```js
const people = new Set();
people.add("Sifl");
people.add("Olly");
people; // Returns `Set {"Sifl", "Olly"}`;

people[0]; // Undefined -- that isn't how these work! It's not an array, it's not indexed that way.
people.size; // NOT length, but same idea; returns 2

people.delete("Sifl");
people.size; // Returns 1
people.clear(); // Clears the set
```

Now if we want to iterate over those items, we can do it using the `Set.values()` method, which makes a `SetIterator` generator we can use.
You can also use `keys()`, which will give you the same thing, since the keys and values are the same in a set:
```js
const turtles = new Set();
turtles.add("Donatello");
turtles.add("Leonardo");
turtles.add("Michelangelo");
turtles.add("Raphael");

const turtleIterator = turtles.values();

turtleIterator.next(); // Returns {value: "Donatello"}, done: false}
turtleIterator.next(); // Returns {value: "Leonardo"}, done: false}
```

Or you could iterate over these using `for-of`:
```js
const turtles = new Set();
turtles.add("Donatello");
turtles.add("Leonardo");
turtles.add("Michelangelo");
turtles.add("Raphael");

for (const turtle of turtles) {
    console.log(turtle);
}

// Console logs the heroes in a half shell (Turtle Power)
```

You can also populate a set while declaring it with a really similar syntax to an array:
```js
const turtles = new Set(["Donnie", "Leo", "Mikey", "Raph"]);

// ...and obv you can pass an array instead since it's gonna evaluate to that same thing:
const tenMinPod = ["Chad", "Tommy", "Will"];
const podcastSet = new Set(tenMinPod);
```

You can also check presence for things:
```js
podcastSet.has("Chad"); // Returns true
podcastSet.has("Chris"); // Returns false
```

### Understanding Sets with Brunch
Wes has an example he uses to demonstrate how sets work, where you can manage a queue of brunch customers with a set then iterate over them with a SetIterator, and you can keep on calling that iterator to get values out of the set.

```js
const brunch = new Set();
brunch.add("Ian");
brunch.add("Aline");

const line = brunch.values();
console.log(line.next().value); // Console logs "Ian" -- remember .next() is going to return an iterator object, if you want the value you have to access its "value" property
console.log(line.next().value); // Here's Aline...

brunch.add("Green");
brunch.add("Pauly");
console.log(line.next().value); // Console logs "Green" even though he was added to the set after you set up your iterator

console.log(brunch); // Returns `Set {"Ian","Aline","Green","Pauly"}` still because these values didn't get popped off or anything
console.log(line); // Returns SetIterator {"Pauly"}
```

So basically from this video I'm getting that sets are basically ordered collections of distinct values with a different API than arrays, and values cannot be accessed via numeric index. I'm not sure what the use case is, but I'm sure it's out there.

### WeakSets
WeakSets are like sets with additional restrictions. They're like regular sets, but they cannot contain anything but Objects and they are not iterable.
There also is no `clear()` method to empty it because how the garbage collector handles them. If an object you've referenced is no longer accessible, after a certain period of time (varies from browser to browser), it will be removed from the set. The use case Wes provides for this is if you've got a WeakSet that's pointed to DOM nodes, if one of those nodes gets removed from the DOM, it will get removed from the WeakSet also, while if it was stored in a regular set, the reference would stick around.