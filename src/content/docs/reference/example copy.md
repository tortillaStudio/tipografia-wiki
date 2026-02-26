---
title: Example Reference
description: A reference page in my new Starlight docs site.
sidebar:
  badge:
    text: Experimental
    variant: caution
hero:
  title: "My Project: Stellar Stuff Sooner"
  tagline: Take your stuff to the moon and back in the blink of an eye.
  image:
    alt: A glittering, brightly colored logo
    file: /src/assets/logo.webp
  actions:
    - text: Tell me more
      link: /getting-started/
      icon: right-arrow
    - text: View on GitHub
      link: https://github.com/astronaut/my-project
      icon: external
      variant: minimal
      attrs:
        rel: me
---

Reference pages are ideal for outlining how things work in terse and clear terms.
Less concerned with telling a story or addressing a specific use case, they should give a comprehensive outline of what you're documenting.

## Further reading

- Read [about reference](https://diataxis.fr/reference/) in the Diátaxis framework

```js {2-3}
function demo() {
  // This line (#2) and the next one are highlighted
  return "This is line #3 of this snippet";
}
```

```diff lang="js" wrap
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,This entire block gets highlighted as JavaScript,This entire block gets highlighted as JavaScript,This entire block gets highlighted as JavaScript,This entire block gets highlighted as JavaScript,This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```
