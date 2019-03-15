# Rock Paper Scissors Game

An React Native Game with Graphql and Firebase
to help the community with open source content

_Just a simple/fast project with, I hope, useful code..._

## Instructions

- (Create your Firebase Application)[https://firebase.google.com/docs/android/setup]
- Change the Server information related to your firebase app
- Download the `GoogleService-Info.plist` file and put on `app/ios` folder - (Firebase ios Setup)[https://firebase.google.com/docs/ios/setup]
- Download the `google-service.json` file and put on `app/android/app` folder - (Firebase android Setup)[https://firebase.google.com/docs/android/setup]
- make sure your firebase app have _guest authentication_ enabled
- `yarn` / `npm run install` (let's continue as yarn by default)

# ios

- we have some Pods, so go on `app/ios` folder and `pod install`
- back to `app` folder, and `yarn ios`

# android

- on `app` folder, `yarn android`

# server

- go to `functions` folder and run `yarn`
- change the file to specify your project on Firebase
- inside `funtions` folder, to deploy, simple run `yarn deploy`

# HELP

- if something happen, try create an Issue and I will try to help :)
