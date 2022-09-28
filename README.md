# Medusa Case

## **Current Status: MVP, tests are failing**

## Time Spend
- Initial Setup: ~ 30min
- MVP (getting familiar with medusa): ~ 2h
- Refactor and Refine: TBD


## The implementation that was most challenging
As someone who never build an online shop before, understanding the data model and
how things fit together took the most time and I am sure there are still a lot of gaps.


## Project Structure
After brief dicovery phase, I decided to approach the project from a DX perpective:
What are the things that are confusing me, what might be common patterns and how to
make things simpler for new developers.

**Note: those assumptions are probably wrong, but it was a great starting point**

### Challenge 1: Price
Figuring out how to display the right price took a bit of digging through the docs
and finding out that prices depend not only on the product but also the region the
user has selected. Thus my plan was to create a `<Price />` component that would
render the right price for a given region. Out of simplicity a `region` query paramter
was choosen.

#### Next Steps
- Provide a context provider that allows users to customize defaults and where to pull the current region info from
- Provide a component that simplifies switching regions


### Challenge 2: Product Thumbnails
A product can have multiple picture, not every product has a thumbnail and there might be
cases where someone might forget to upload any image at all, thus we should make it easier
for developers to handle edge cases like these by providing a custom `<Thumbnail />` component.
The idea here is that given a product, the components tries the following:

1. Get `thumbnail` prop
2. If `thumbnail` is undefined, try `images`
3. If `images` is undefined use the `fallback`

The component also allows to the developer to provide a `--thumbnail-fallback`, this will render a background in case no image is present or the image take longer to load.


#### Next Steps
In term of general image handling, I would like to see the image dimension, this would allow me as a developer to let the browser know what aspect ratio the image will have, preventing layout shift. Another thing I would love to see in particular would be multiple image sizes, this would allow us to create a generic [<Picture />](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) component over the image array, with that a developer won't have to think too much about which image to server in the default case and making images load faster.


### Challenge 3: Options
Understanding what options to display was also something that confused me initialy. Once I got a basic understanding I tried to abstract the problem => There is base set of options, which when selected affect some options down the line (e.g Size -> Color).
The main idea here was to provide a `useOptions` hook that make is easier to select the right options that you need and as a secong step provide a default `<Options />` component to render those options.


### Challenge 4: Testing / Mocking
I have to admid I didn't spend too much time trying to figure out how to mock the medusa client. If I would spend a little bit more time to set things up, I would configure the tests to use [https://mswjs.io/](https://mswjs.io/) in order to mock the medusa client.
In terms of testing, my plan was to use `testing-library` to write component level tests and also to test the hooks.


<hr />


## Development Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
