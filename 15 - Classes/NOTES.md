## Module 15: Classes (23m)
### Prototypal Inheritance Review
ES6 has introduced classes, but when we're doing OOP in JS, it still works the same way as before, via prototypal inheritance. For folks who aren't really familiar with this, we can start by considering a "constructor" function, typically indicated with PascalCase.
```js
function Dog(name, breed) {
    this.name = name;
    this.breed = breed;
}

const snickers = new Dog("Snickers", "King Charles");

snickers.name; // Returns "Snickers"
```

Now if you add anything to the `prototype` object on `Dog`, you'll get access to it from all `Dog`s.

```js
Dog.prototype.bark = function() {
    console.log(`Arf! My name is ${this.name}`);
}

snickers.bark();
// Console log shows "Arf! My name is Snickers"

const lanie = new Dog("Lanie", "Terrier Mix");
lanie.bark();
// Console log shows "Arf! My name is Lanie"
```

As you can see, we can add things to the prototype and whatever was created using that prototype's parent object will pick it up.

### Say Hello to Classes
To make an ES6 class, we can do it one of two ways. Either with a class declaration or a class expression. A class expression looks like this:
```js
const Dog = class {
    ...
}
```

A class declaration (Wes's preferred approach) looks like this:
```js
class Dog {
    ...
}
```

Now let's convert our prototype approach to use an ES6 class:
```js
class Dog {
    // The only thing you always need in a class is a constructor, which looks like this:
    constructor(name, bred) {
        this.name = name;
        this.breed = breed;
    }

    bark() {
        console.log(`Bark bark! My name is ${this.name}`);
    }

    cuddle() {
        console.log(`One love`);
    }
}
```

We can also make static methods that are available directly on the class but not on things of that class:

```js
class Dog {
    ...
    static info() {
        console.log("Dogs are 100x better than cats");
    }
}

lanie.info(); // Throws an error -- lanie.info is not a function
Dog.info(); // Console log shows: "Dogs are 100x better than cats"
```

We can also use getters and setters:
```js
class Dog {
    ...
    get description() {
        return `${this.name} is a ${this.breed}`;
    }

    set nickname(value) {
        this.nick = `🐶 ${value}`;
    }

    get nickname() {
        return this.nick;
    }
}

lanie.description; // Returns "Lanie is a Terrier Mix" -- note that's accessed as a _property_ and not a method! If you inspect the object, you'll see when you hover over its description property it doesn't just show the property as static text, but rather that you'll need to invoke the getter

lanie.nickname; // Returns undefined
lanie.nickname = "Lulu";
lanie.nickname("🐶 Lulu"); // Returns "Lulu"
```

### Extending Classes and using super()
You can also build a class off a class! For instance, if you have a generic Animal class, maybe you want to add a Dog class. A Dog is a type of Animal, so you want to inherit from whatever we've decided goes into being an Animal.

```js
class Animal {
    constructor(name) {
        this.name = name;
        this.thirst = 100;
        this.belly = [];
    }

    feed(food) {
        this.belly.push(food);
        console.log(`Thanks for the ${food}!`);
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name); // `super()` just references whatever this class extends so you make it an Animal first. You can't just make a Dog without making it an Animal first.
    }

    bark() {
        console.log("Arf arf!");
    }
}
```

And although you can extend on and on and on, Wes advises against extending deeper than two or three layers because it can get complicated.

### Extending Arrays with Classes for Custom Collections
Another thing that's neat is you can extend built-in classes! This is great because you can get all the power of existing built-in classes _without_ monkeying around with the prototype object like a savage.

```js
class MovieCollection extends Array {
    constructor(name, ...movies) { // See how neat the rest operator is??
        super(...movies); // Bwaaahhh??? Spread operator!
        this.name = name;
    }

    add(movie) {
      this.push(movie);
    }
}

const movies = new MovieCollection("Ian's Favorite Movies",
"American Psycho", "Stepbrothers");

movies.add("1917");

for (const movie of movies) { // Yeaaah for-of!
  console.log(movie);
}
```

As you can see here, we're basically standing on the shoulders of giants. We can make a new collection object that just so happens to inherit all the amazing array methods that we JS developers have gotten so excited about in the past few years. In his example, Wes goes even more bananas doing stuff, but it's really just taking advantage of fundamental array methods like `sort()`.