## Module 10: Promises
### Promises
Promises are often used when dealing with `fetch` to make a JSON API call. Broadly speaking, a promise is something that will happen between now and the end of time. They're useful for managing your handling for an event that won't conclude instantaneously but you also don't want to stop everything while it happens. And when they conclude, they notify you that they've finished.
This is all getting a little vague and hard to follow without examples, so review this:
```js
const postsPromise = fetch('https://wesbos.com/wp-json/wp/v2/posts');

postsPromise
    .then(data => data.json())
    .then(data => { console.log(data); })
    .catch((err) => {
        console.error(err);
    })
```

Here you can see the promise chained onto some `then()` calls, with a `catch()` on the end that will catch for any failure along the whole chain.

### Building your own Promises
You can make your own promise by using the Promise constructor:
```js
const promise = new Promise((resolve, reject) => {
    resolve("Passing this back!"); // Returning a string
});

promise
    .then(data => {
        console.log(data);
    });
```

### Chaining Promises + Flow Control
To do more elaborate things (like maybe handle two events most appropriately handled with promises) you can bake all the logic associated with a given event into its own promise function.
For example, let's say you reach out to one API to get a series of posts, and then you want to take data from that API to query another API, and then finally at the end you want to put those two responses together somehow. What you can do is handle your call to one API in a function that returns a promise, then chain a handler off it.
Let's see how that could look:
```js
const cars = [
    {
        make: "Ford",
        model: "F-150",
        year: 2007
    }
];

const popularMusic = {
    2007: "Crank That (Soulja Boy)"
};

function getCar(year) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const car = cars.find(car => car.year === year);
      if (car) {
        resolve(car);
      } else {
        reject(Error(`No car for ${year}`));
      }
    }, 2000);
  });
}

function getSong(year) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const song = popularMusic[year];
      if (song) {
        resolve(song);
      } else {
        reject(Error(`No song for ${year}`));
      }
    }, 2000);
  });
}

function getCarAdvertisement(year) {
  let advertisement = {};
  getCar(year)
    .then(car => {
      advertisement.make = car.make;
      advertisement.model = car.model;
      return getSong(year);
    })
    .then(song => {
      alert(`Play ${song} while showing a ${advertisement.make} ${advertisement.model}`);
    })
    .catch(err => {
        console.error(err);
    })
}
```

### Working with Multiple Promises
But that above example isn't ideal -- what if we could fire both requests for year-specific info at once instead of having to wait until one finishes to start the second. You can! See refactored `getCarAdvertisement()`:

```js
function getCarAdvertisement(year) {
    let advertisement = {};
    const carPromise = getCar(year);
    const songPromise = getSong(year);

    Promise
        .all([carPromise, songPromise])
        .then(([car, song]) => {
            advertisement.make = car.make;
            advertisement.model = car.model;

            alert(`Play ${song} while showing a ${advertisement.make} ${advertisement.model}`);
        })
        .catch(err => {
            console.error(err);
        });
}
```

In the example Wes showed, he was handling JSON responses with some specific handling, but I'm going to skip that part for now. Right now I'm focusing just on Promises and I think it's enough to understand that a Promise can accept a `then()` which will receive the data returned by that promise's `resolve()` call. Also you can use chain a `catch()` method that will receive the promise's `reject()` argument.