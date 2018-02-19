Mobile Installation Process:

## Versions
- npm - Version: 5.5.1
- Node - Version: 6.2.0
- Watchman - Version: 4.9

## Process
1. Download Expo
2. Pull BOTH web and mobile repositories
3. Run `yarn install` (from this point on, in the mobile repo)
4. Run `yarn start` to run the mobile repo
5. Copy the ip address given and put it in `src/helpers/secret.js` like this:
```
const HOST_ADDR = 'http://10.142.48.28:3000';
export { HOST_ADDR };
```
6. Replace the IP in `HOST_ADDR` with yours without the port
7. Go to the web repo and run `rails server -b 0.0.0.0`
