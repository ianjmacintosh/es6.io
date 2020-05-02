## Module 11: Symbols
### All About Symbols
Symbols are a new primitive introduced to JavaScript in ES6, and they confuse some people because they weren't really asking for them -- but Wes sees how they could be useful.
As presented in the video (which is the first I've ever seen these things, so I'm a little skeptical but I'm gonna try to explain it anyway), symbols can be used to keep you safe from collisions. If you've got two values that are the same Symbol:
```js
const myCar = Symbol("Toyota");
const myDadsCar = Symbol("Toyota");

myDadsCar == myCar; // returns false
```

This can be used in an example where multiple properties could have the same key:
```js
const students = {
    [Symbol('Mike')]: { gender: 'male', middleSchool: 'Fairgrounds' },
    [Symbol('Mike')]: { gender: 'male', middleSchool: 'Elm St' }
}; // Note you've got two Mikes and no problems
```
However, you will not be able to iterate over those properties now, because properties keyed using symbols are not iterable.
If you want to iterate over those, you'd have to do something kinda tricky:
```js
const syms = Object.getOwnPropertySymbols(students);
console.log(syms.map(sym => students[sym]));
```

I think I get the idea, but I'm looking forward to seeing a use case where it'd be a tool I'd reach for. Right now it just seems pretty contrived and like maybe we should handle our data differently instead of doing all this mucking about with symbols.