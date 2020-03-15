# @ng/tools
Tools for angular projects.

## Operators
### 1. tillAllive
  A operator to unsubscribe observables before destroying angular elements like components, directives and pipes etc.

```ts
  import { tillAlive } from '@ng/tools';
  
  @Component()
  class MyComponent implements OnDestroy {
    constructor() {
        observable.pipe(tillAlive(this)).subscribe((value) => {
            # use value
        });
    }
    ngOnDestroy() {}
  }
```

## Authors
1. [Ashish Gurjar](https://github.com/akgurjar)

## Licence
[MIT v3](LICENSE)