# CSDMPY FE Material

A reworking of the CSDMPY Front-end project to use the Material UI library and improve the state management and Pyodide implementations

## Development

This is a Create React App application so the normal build/run/test scripts work:

`yarn run`
`yarn build`
`yarn test`

However there is a hard pre-release dependency on the [SF MUI Components](https://github.com/SocialFinanceDigitalLabs/sf-mui-components) library. This is an _undeployed_ NPM-ready package and still under development. Until we have a stable API for it, it needs to be added as a link dependency. To do this:

1. Checkout the [SF MUI Components](https://github.com/SocialFinanceDigitalLabs/sf-mui-components) repo into another folder on your local machine
2. `yarn build` the SF MUI Components project
3. Run `yarn link` in the SF MUI Components project
4. `cd node_modules/react && yarn link`
5. `cd ../react-dom && yarn link`
6. In _this_ project `yarn link @sfdl/sf-mui-components && yarn link react && yarn link react-dom`

These last steps are required because Create React App cannot work with peer depedencies defined outside the `src` directory.
