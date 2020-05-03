## Module 13: JavaScript Modules and Using npm
### JavaScript Modules and WebPack 2 Tooling Setup
Previously, writing JS has meant maybe having a couple `<script>` tags in a document and loading libraries or other dependencies through your HTML, or maybe running a build task that would concatenate and minify them all together. But more and more people are using _modules_ -- methods stored in one file that are available to other files, making them available for other applications. Instead of passing things around through the global namespace, we `import` what we need in our application. Although this might be a little intimidating and it's a big topic, it's also crucial for understanding modern JS.
Although most of ES6 is very well supported across all major browsers, modules (at the time of Wes's recording) were not consistently implemented, so he shows us how to use tooling to make everything work. For this video, Wes uses npm and webpack respectively to retrieve modules and bundle them together. In other words, if you pull in a few modules and export a few modules, we'll be able to put them all into one file or multiple files.
To get started, we make a new directory for our app and initialize npm from there:
`npm init`
All the default options are just fine for this example. This will create a `package.json` (I like to call it a package manifest) that will contain all the module information we need. Once that's created, we can install dependencies and save their information to our `package.json` file:
`npm install slug --save` One at a time...
`npm install lodash flickity --save` ...or multiple
You can see that the package manifest gets updated with this information, and the dependencies will be installed in `node_modules/`. If you ever delete your `node_modules/` directory, you can get them back by running `npm install`.
Now in our _app.js_ file, let's import our modules:
```js
import { uniq } from 'lodash';
import insane from 'insane';
import jsonp from 'jsonp';
```
And create an _index.html_ file to load _app.js_. If you load this in your browser, you'll see an error in your console. This is due to browsers not supporting modules the way we're using them here. And this is where WebPack comes into play. Although you can find boilerplate setups, Wes dislikes them and finds them enormously confusing. So we set up WebPack with Wes's help and no boilerplates.
`npm install webpack --save-dev`
We install WebPack as a dev dependency, because it isn't part of our application per se, it's used for developing the app, specifically for building it. This will load it into a separate `devDependencies` object in _package.json_.
Next we use `babel` to make our ES6 code work in browsers limited to ES5... except when I review the instructions Wes asks me to follow, `babel` isn't mentioned. Maybe no longer necessary for this use case?
When setting up WebPack, we define our module with an "entry-point" or where you want your app to start, an "output" or where you want it to go, and a module with a "loaders" array which tells you how you should handle specific types of files. Although I'm comparing the instructions in the repo vs the instructions he's following in this video from who-knows-when are different... and the instructions in the repo don't match it, completely skipping any loaders.
Wes also describes some plugins, but those aren't used in the example either... and I'm not sure if I'm supposed to add them or what. I see in the [commit](https://github.com/wesbos/es6.io/commit/8f18b9a1625d815447bddc7e9cc7fa2ab5af431f) they were in the previous version of this file, and not in the new one.
Now to run WebPack, we could run it from the command line, but even better is to run it from npm scripts. In _package.json_ we add a build entry to the `scripts` object that calls webpack. When we run that `build` script, we can see a built version of our app appears in `dist/bundle.js`! And now when we go to our _app.js_ script, we can use `uniq` for instance and see it working:
```js
const ages = [1,1,2,2,3,4,5,6,6];
console.log(uniq(ages)); // Returns [1,2,3,4,5,6];
```
WHEW! What a whole lot of information to take in! But WebPack is something I haven't ever used, have heard a ton about, and am happy to meet. I'm happy it's a little bit demystified.

### Creating your own Modules
Now we can make our own modules. One pattern that we can get started out with is storing our modules in its own folder `src/`
We start out by making a file `config.js` that Wes likes to use to store his API keys rather than scattering them around the application. Cool idea, I like it.
When we go to app.js and try to access apiKey, first we import apiKey from our file:
```js
import apiKey from './src/config';
```
Note that we use the local path since it is a local file instead of a node module, and we can omit the `.js` on the end of our path.
If you try to log apiKey to the console, you'll get an empty object. This is because the config hasn't exported itself yet.
In ES6 there are two kinds of exports: default and named. Default exports can be named whatever you like, while named exports must be imported by name. The default export generally exports the "main thing" the module does, while named exports are used for methods that you want to pluck off individually.
First, to do a default export in config.js, we do `export default apiKey;` -- and now the apiKey will appear. On the other side where we import it, we can import it as whatever we like. `import myKey from './src/config'` works, and you can reference it as `myKey` in the console log call. Keep in mind that every module you have can only have one default export. You can have as many named exports as you like.
Next, to do a named export in config.js, you change your syntax on the line where you set apiKey to `export const apiKey = 'abc123';`. This will break the previous import attempt, since we are trying to import a default that no longer exists. To import it, you need to call it by name using a different syntax: `import { apiKey } from './src/config';`. By the way, even though this looks like destructuring syntax, it is not... but you can import multiple things by separating the things you want to import by commas; `import { foo, bar } from './src/config';`
Even though the examples Wes starts out with are just const strings, you can export functions or whatever you like. There's all kinds of other syntax available for exporting things, like `export { foo, bar};` if you've already got some things you want to export.
As far as named exports go, just because you have to import them by their given name doesn't mean you need to keep on referencing them that way. You could import one thing _as_ something else. This is nice to prevent collisions between multiple things that might export things by the same name. To keep them straight you could do `import { apiKey as googleMapsKey } from './src/config';` and reference the key as `googleMapsKey`. You can use that same syntax for exporting -- `export { apiKey as googleMapsKey };`
WOW! What a ton of information again!

### More ES6 Module Practice
I just finished this exercise by playing along with the video as Wes demonstrated different ways of using modules. It felt super powerful being able to download modules and use them in my code immediately. For most JS engineers, this probably is extremely extremely old news, but it's pretty impressive to me since this is the first time I've worked with modules in a way that's been helpful instead of just confusing. Love it! And it's not really that complicated (yet). Maybe some more elaborate implementations will make my head spin, but this seems pretty easy to understand to me so far.
Excellent module. Loved it. But it was really time-consuming!