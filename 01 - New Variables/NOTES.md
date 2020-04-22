# Module 1: New Variables
## `var` refresher
    Our trusty `var` operator is function-scoped, meaning it does not leak outside of a function, but it can leak out of a logic block. This is unlike `let` and `const`, which are block-scoped. You can also get away with re-declaring a `var` in a scope, while you cannot do the same for `let` or `const` -- you'd have to do it in another scope (possibly a child scope.)

## `let` vs `const`
    Between `let` and `const`, the value of a variable initialized using `let` can be updated, while with `const` it cannot. *
    * This doesn't mean its _properties_ are immutable! This is totally legal:

    ```js
    const person = {
        name: "Ian",
        age: 35
    };
    person.age = 36;
    person.age; // Returns 36
    ```

    ```js
    // If you don't like that, you could use `Object.freeze()` like so:
    Object.freeze(person);
    person.age = 36;
    person.age; // Returns 35
    ```

## `let` and `const` in the Real World
    In the real world, this means that we can start to do away with IIFE's for the exclusive purpose of scoping. By wrapping your `let` and `const` in `{}` (it's a block! it counts!) you are no longer polluting the global namespace.
    This block-scoping behavior also enables you to handle asynchronous behavior differently, since if you're actively modifying that variable and things are happening with it later, its value won't change.

## Temporal Dead Zone
    Call it the Temporal Dad Zone, it's better.
    Variables declared with `var` are hoisted. `let` and `const` are not, so you cannot access them until they have been declared.

## Is var Dead? What should I use?
    A couple philosophies:
    * Mathias Bynens says, "Use `const` by default, only use `let` if rebinding is needed, [and] `var` shouldn't be used in ES6"
    * Kyle Simpson says, "Use `var` for top-level variables that are shared across many (especially larger) scopes. Use `let` for localized variables in smaller scopes. Refactor `let` to `const` only after some code has been written and you're reasonably sure you've got a case where there shouldn't be variable reassignment." Or in other words, `var` if you're trying to share it, `let` if you're not, and then `const` if you're refactoring and want to actively block reassignment.