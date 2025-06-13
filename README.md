# Daniel Eskinazi Portfolio

This is a personal portfolio website built with React, showcasing projects and skills with interactive particle effects.

**Live Site:** [danieleskinazi.com](https://danieleskinazi.com) (CDN forwards from GitHub Pages)

## Features

- **Interactive Particle Background**: Dynamic particle effects using React TSParticles
- **Smooth Scrolling Navigation**: Fixed header navigation with smooth scroll to sections
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Contact Form**: Integrated with Formspree for email handling
- **Modern UI**: Built with Semantic UI React components
- **Animations**: Smooth transitions powered by Framer Motion

## Tech Stack

- **React 17**: Core framework
- **Semantic UI React**: UI component library
- **React TSParticles**: Interactive particle effects
- **Framer Motion**: Animation library
- **Formspree**: Contact form backend
- **GitHub Pages**: Hosting and deployment

## Project Structure

```
src/
├── components/
│   ├── About.js          # Personal information section
│   ├── ContactForm.js    # Contact form with Formspree
│   ├── Footer.js         # Site footer
│   ├── Header.js         # Fixed navigation bar
│   ├── Intro.js          # Hero section with particles
│   ├── MainContent.jsx   # Alternative layout wrapper
│   ├── Projects.js       # Portfolio showcase
│   └── Skills.js         # Technical skills display
├── styles/
│   ├── components.css    # Component-specific styles
│   └── global.css        # Global styles
├── App.js                # Main app component
├── index.js              # React entry point
└── styles.js             # Dynamic style objects
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-mobile`

Runs the app in development mode accessible from other devices on your network.\
Useful for testing on mobile devices.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Builds and deploys the app to GitHub Pages.\
This runs `yarn build` automatically before deploying.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/DanielEskinazi/gh-pages-portfolio.git
   cd gh-pages-portfolio
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

The site is deployed to GitHub Pages and accessible at [danieleskinazi.com](https://danieleskinazi.com).

To deploy updates:

```bash
yarn deploy
```

This will build the project and push to the `gh-pages` branch automatically.

## Customization

To customize this portfolio for your own use:

1. Update personal information in `src/components/About.js`
2. Add your projects in `src/components/Projects.js`
3. Update skills in `src/components/Skills.js`
4. Replace the Formspree endpoint in `src/components/ContactForm.js`
5. Customize particle effects in `src/components/Intro.js`
6. Update the `homepage` field in `package.json` with your domain

## License

This project is open source and available under the MIT License.
