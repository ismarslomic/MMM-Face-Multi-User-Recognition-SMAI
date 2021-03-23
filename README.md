# MMM-Face-Multi-User-Recognition-SMAI
This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) to add face 
recognition. This module uses [OpenCV face-recognition with DNN](https://github.com/nischi/MMM-Face-Reco-DNN) 
to handle the user profile recognition. It will show/hide modules based on classes and can handle 
multiple users.

It is a fork of James Macdonalds [MMM-Face-Multi-User-Recognition-SMAI](https://github.com/jimbydude/MMM-Face-Multi-User-Recognition-SMAI) 
which again is fork of Eben Kouaos [https://github.com/EbenKouao/MMM-Face-Recognition-SMAI](https://github.com/EbenKouao/MMM-Face-Recognition-SMAI)
(see his other projects at https://smartbuilds.io/).

Reason for making another fork is lack of maintenance of the other two repos, see my comment at
[MMM-Face-Recognition-SMAI/issues/5](https://github.com/EbenKouao/MMM-Face-Recognition-SMAI/issues/5#issuecomment-805166266)

## How it works
This module allows you to access profiles using face recognition. This works on the back of 
[MMM-Face-Reco-DNN/OpenCV](https://github.com/nischi/MMM-Face-Reco-DNN#opencv) face recognition module.

When a user is detected and logged in by Face Recognition Module a notification is received that 
will trigger the users profile pic ot be displayed until the user is logged out by 
[MMM-Face-Reco-DNN](https://github.com/nischi/MMM-Face-Reco-DNN)

## Screenshots
| ![FaceID Guest](img/readme/face-recognition-guest-smai.png) | ![Face ID Detected](img/readme/face-recognition-stark-smai.png) | 
|---|---|
| A guest profile as default | User has been recognised |

* Screenshots from [https://github.com/EbenKouao/MMM-Face-Recognition-SMAI](https://github.com/EbenKouao/MMM-Face-Recognition-SMAI)

## Preconditions

* MagicMirror<sup>2</sup> instance
* Node.js version >= 7
* npm
* [MMM-Face-Reco-DNN](https://github.com/nischi/MMM-Face-Reco-DNN)
* Raspberry Pi 4 Camera Module

Make sure to complete [MMM-Face-Reco-DNN](https://github.com/nischi/MMM-Face-Reco-DNN) setup 
including adding classes for showing and hiding to your config before proceeding.

## Step 1 – Install the module
In your MagicMirror directory:

```bash 
cd modules
git clone https://github.com/ismarslomic/MMM-Face-Multi-User-Recognition-SMAI
cd MMM-Face-Multi-User-Recognition-SMAI
npm install
```

## Step 2 – Add files to the Config.js
Here is an example for an entry in `config.js`

```javascript
{
  module: "MMM-Face-Multi-User-Recognition-SMAI",
  position: "top_right",
  config: {
    useMMMFaceRecoDNN: true, 
    showTitle: true,
    width: "200px",
    morningStartTime: 3,
    morningEndTime: 12,
    afternoonStartTime: 12,
    afternoonEndTime: 17
  }
}
```

## Step 3 – Configuring the Face Recognition Structure
**Pre-requisite:** Follow instructions in OpenCV Installation to setup your dataset with images.

This module assumes a few things:
* The image file `guest.gif` for guest users is in the `public` folder
* There is an image for each (known) user in the `public` folder that matches with user directory names 
  in OpenCV dataset

For example if you have the following structure containing your image as dataset in OpenCV module:
```
- dataset
  - james
    - img01.jpg
    - img02.jpg
    - img03.jpg
  - roseann
    - img01.jpg
    - img02.jpg
    - img03.jpg
```

Then you will also have the following in the `public` folder of this module:
```
- public
    - guest.gif
    - james.jpg
    - roseann.jpg
```

These images are the ones that will be shown on the mirror UI when a user logs in, 
not the ones from OpenCV dataset. Images in the OpenCV dataset are only to train the NN.

NOTE! Only images with extension `.jpg` are supported currently in this module

## Greetings message
Greetings message is displayed just above the user image, based of the time of the day.

- Between `morningStartTime` and `morningEndTime`: `"Good Morning <name of the user>"`
- Between `afternoonStartTime` and `afternoonEndTime`: `"Good Afternoon <name of the user>"`
- Else: `"Good Evening <name of the user>"`

## Configuration options

| Option                      | Description
|---------------------------- |-----------
| `useMMMFaceRecoDNN`         | *Required* Use the DNN detection type. Currently only supported type. <br><br>**Type:** `bool` <br>**Default Value**: `true`
| `showTitle`                 | Show title of the module <br><br>**Type:** `bool` <br>**Default Value**: `true`
| `width`                     | The width of the HTML image container. <br><br>**Type:** `string` <br>**Default Value**: `200px`
| `morningStartTime`          | Hour when morning start, used for greetings message. <br><br>**Type:** `int` <br>**Default Value**: `3`
| `morningEndTime`            | Hour when morning ends, used for greetings message. <br><br>**Type:** `int` <br>**Default Value**: `12`
| `afternoonStartTime`        | Hour when afternoon starts, used for greetings message. <br><br>**Type:** `int` <br>**Default Value**: `12`
| `afternoonEndTime`          | Hour when afternoon ends, used for greetings message. <br><br>**Type:** `int` <br>**Default Value**: `17`
