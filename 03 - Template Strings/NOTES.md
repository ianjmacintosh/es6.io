# Module 3: Template Strings
## Template Strings Introduction
Backticks allow us to not do our traditional annoying concatenation business in years gone by. If you're using backticks, wrap your expressions in `${}` curly brackets and watch them evaluate. For example: `Hello ${name}!`

## Creating HTML fragments with Template Literals
You can make multiline strings with backticks also!
```javascript
const markup = `
  <div class="person">
    <h2>
        ${person.name}
        <span class="job">${person.job}</span>
    </h2>
  </div>
  `;
```

(Keep in mind your newline characters are gonna come along for the ride.)

You can also nest your template strings inside each other. In your `${}` you can have something return a template literal and you're totally fine -- it'll show up. Whatever expression you pass will evaluate, and you'll be able to see whatever the returned value is.

## Tagged Template Literals
If you prepend backticks with a function name, the values will be passed to that function with a specific signature that passes each of the strings in one array, and each of the evaluated expressions in another. This allows us to do our own parsing of template literals.

## Tagged Templates Exercise
I enjoyed the exercise. I'm not sure how realistic it is, but there's probably more elaborate examples that would be more like something I'd do in the real world. It served the purpose! I didn't know I could do that before.

## Sanitizing User Data with Tagged Templates
Well well well! A more realistic example! This seems a little better, although I suspect I'd probably sanitize this data on the back-end presuming I had a back-end for the app I'm working on.

I'm glad I reviewed all this, I've been using backticks ("template literals") for a little while, but I wasn't aware of the tagged template literals bit, and I didn't know about the multiline capabilities. I thought you had to do three backticks or something silly for that -- good to know you get it with backticks by default. Neat. I also liked the exercise because it gave me an opportunity to get my hands a little dirty instead of just staring at a guy programming.