
# MemoRise

MemoRise is a versatile React Native note-taking app designed to empower users with seamless note management capabilities. With MemoRise, you can effortlessly create, edit, and delete notes while enjoying synchronized online and offline storage, all powered by Firestore.


## Demo
[MemoRise.webm](https://github.com/UnfortunatelyHuman/MemoRise/assets/101927412/6c02db42-794c-4a77-8e2e-d17859a41756)


## Features

- Intuitive User Interface: MemoRise offers an intuitive and user-friendly interface, enhancing your note-taking experience and ensuring accessibility in both online and offline modes. 🎨
- Online and Offline Storage: Enjoy the convenience of adding and editing notes even when you're offline. MemoRise leverages Firestore for synchronized online data storage, ensuring your notes are accessible across devices. 💾
- Efficient Synchronization: Your notes are securely synchronized in real-time across devices, providing a seamless and efficient experience when accessing your important information. 🔄

> To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)), [Android Studio](https://developer.android.com/studio)(if you want to run on android), [Xcode](https://developer.apple.com/xcode/)(if you want to run on iOS) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/UnfortunatelyHuman/MemoRise.git
# Go into the repository
$ cd SocialShare
```

> Go to firebase console and create a new project
> Go to project setting and copy the Firebase configuration code (firebaseConfig)
> After creating project add below lines to the file

```javascript
export const firebaseConfig = {
  // paste the copied code from the firebae console
  ...
  ...
};
```

> Open terminal at the root folder and type bellow command in terminal

```
npm install
expo start
```

> you will see a QR code in your terminal scan that from your device and app will be runnning to your phone
## Tech Stack

**Client:** ReactNative

**Server:** Firebase


## Authors

- [@Dhruv Patel](https://www.github.com/UnfortunetlyHuman)

