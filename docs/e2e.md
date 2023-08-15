# End to end tests

- [`playwright`](https://playwright.dev/docs/intro)

## Run tests

```bash
npm run test:e2e
```
It will run all the tests in the `e2e` folder. At the end it will open a browser and show you the results.


## Generate tests

> You need to have the app running in order to generate tests.

```bash
npm run playwright:codegen
```

It will open a browser and you can interact with the app. You can record your actions and it will generate the test code for you. Now you can copy the code and paste it in the `e2e` folder.

Now you need to update the snapshot. Run the following command:

```bash
npm run test:e2e:update-snapshots
```

It will update the snapshot and you can commit the changes.
