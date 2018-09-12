# Crowdfunding

## Prerequisites

* node
* yarn


## Running the app

### Development

```sh
# locked on rinkeby by default
yarn
yarn start
```

### Build Releases


```sh
# lock it to Rinkeby
REACT_APP_NETWORK=rinkeby  yarn build
# lock it to Main Net
REACT_APP_NETWORK=main  yarn build
```

## Testing

```sh
yarn test
```

## Known Limitations

* only works on rinkeby & main net
