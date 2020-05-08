## Module 17: Proxies
### What are Proxies?
Proxies allow you to override an object's default operations using a handler to define new behaviors (using methods called "traps"). For instance, if you have an object and you want to change how it behaves when someone tries to get the value of one of its properties, you can do that using a proxy and the `handler.get()` trap:
```js
const person = {
    name: "Jennifer Tilly",
    age: 61
}

const personProxy = new Proxy(person, {
    get(target, name) {
        console.log("Someone is asking for ", target, name);
    }
});

personProxy.age = 49;

console.log(personProxy.age); // Console will log "Someone is asking for { ... } age" instead of 61.
```

But you don't have to handle it that way, you could be more discreet:
```js
const personProxy = new Proxy(person, {
    get(target, name) {
        return target[name];
    }
});

personProxy.age = 49;

console.log(personProxy.age); // Console will log 49
```

You can use this for when someone tries to set a property too, using the `handler.set()` trap:

```js
const personProxy = new Proxy(person, {
    set(target, name, value) {
        if (typeof value === "string") {
            target[name] = value.trim();
        }
    }
});

personProxy.name = "   Jen Tilly  ";
console.log(personProxy.name); // Console will log "Jen Tilly"
```

This is nice because it all happens behind the scenes without any really heavy-handed and imposing implementation details in front of you. You can do more powerful things, but even just making it so properties get automatically trimmed is kind of nice. Also, if you don't set a trap for a behavior, the default will take over.

### Another Proxy Example
Wes does another example here with phone numbers, starting by defining his handler -- which will include his traps.
```js
const phoneHandler = {
    set(target, name, value) {
        target[name] = value;
    }
}

const phoneNumbers = new Proxy({}, phoneHandler);

phoneNumbers.home = "123-345-5668"; // OK
phoneNumbers.work = "(123) 381-8282"; // Oh gosh. I personally like this formatting better, but it's a moot point since I like consistency way way more!
```

Imagine though if we could normalize the phone number using our `set()` trap:
```js
...
    set(target, name, value) {
        target[name] = value.match(/[0-9]/g).join(""); // Get just the numbers, pop 'em each into an array, then join it
    }
...

phoneNumbers.home = "123-345-5668";
phoneNumbers.work = "(123) 381-8282";

phoneNumbers.home; // Returns 1233455668
phoneNumbers.work; // Returns 1233818282
// Nice! Consistent! But hideous. If only there were something we could do...
```

We can add another trap to our handler to fix that formatting using the powers of regular expressions.

```js
...
    get(target, name) {
        return target[name].replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
...
phoneNumbers.home = "123-345-5668";
phoneNumbers.work = "(123) 381-8282";

phoneNumbers.home; // Returns (123) 345-5668
phoneNumbers.work; // Returns (123) 381-8282
// Oh boy, I think I'm going to need that Vince McMahon gif where he's getting excited!
```

This is a nice example of using proxies to protect your objects from getting mishandled by a client.

### Using Proxies to combat silly errors
Wes shows another example of using a set trap here to catch when a client tries to access a property from a hypothetical library, but gets the casing wrong. By providing a helpful error message that informs the user they've got the name _really_ close to what it should be, you can reduce the number of developers who would then open a GitHub issue or reach out on Twitter or whatever. His example is:
```js
  const safeHandler = {
    set(target, name, value) {
      const likeKey = Object.keys(target).find(k => k.toLowerCase() === name.toLowerCase());

      if (!(name in target) && likeKey) {
        throw new Error(`Oops! Looks like like we already have a(n) ${name} property but with the case of ${likeKey}.`);
      }
      target[name] = value;
    }
  };
```

Pretty slick, really helpful. Also nice and unobtrusive.