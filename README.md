# testcafe-browser-provider-devicefarm

This is the **devicefarm** browser provider plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install
```

## Build

```
npm run build
```

## Use

```
run yarn add file:/custom-file in the project to use it.
```

When you run tests from the command line, use the alias when specifying browsers:

```
testcafe devicefarm:browser1 'path/to/test/file.js'
```


When you use API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('devicefarm:browser1')
    .run();
```

## Author
Pablo Enríquez
 
