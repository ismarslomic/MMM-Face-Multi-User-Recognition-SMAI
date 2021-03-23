/* global Module */

/* Magic Mirror
 * Module: MMM-Face-Multi-User-Recognition-SMAI
 *
 * Extended by Ismar Slomic (originally by Eben Kouaos and James Macdonald)
 * MIT Licensed.
 */

const MORNING = -1;
const AFTERNOON = 0;
const EVENING = 1;
const GUEST_USER_NAME = "Guest";
const GUEST_IMAGE = "guest.gif";

Module.register("MMM-Face-Multi-User-Recognition-SMAI", {
  defaults: {
    useMMMFaceRecoDNN: true,
    showTitle: true,
    width: "200px",
    morningStartTime: 3,
    morningEndTime: 12,
    afternoonStartTime: 12,
    afternoonEndTime: 17,
  },

  requiresVersion: "2.1.0", // Required version of MagicMirror

  start: function () {
    // Default userName and userImage when loading the module
    this.userName = GUEST_USER_NAME;
    this.userImage = GUEST_IMAGE;

    // We are not logged in when loading the module
    this.loggedIn = false;

    // Flag for check if module is loaded
    this.loaded = false;
  },

  // This will be called every update and update the image based on:
  //	.userId
  //	.userName
  getDom: function () {
    // create element wrapper for show into the module
    const wrapper = document.createElement("div");

    if(this.config.showTitle){
      wrapper.innerHTML = this.translate('TITLE');
    }

    wrapper.className = "face-image";

    // Figure out what time of day message we want
    let message = this.translate('WELCOME');
    if (this.userName !== GUEST_USER_NAME) {
      if (this.timeOfDay() === MORNING) {
        message = this.translate('GOOD_MORNING');
      } else if (this.timeOfDay() === AFTERNOON) {
        message = this.translate('GOOD_AFTERNOON');
      } else {
        message = this.translate('GOOD_EVENING');
      }
    }

    // Ceate the image element and show gif by default.
    const imgHolderElement = document.createElement("p");
    imgHolderElement.innerHTML = message + ", " + this.capitalizeWords(
        this.userName);
    imgHolderElement.style.width = this.config.width;

    // Asychronoulsy load either GIF or face (as name).
    const img = document.createElement("img");
    const newImg = new Image;
    newImg.src = "modules/MMM-Face-Multi-User-Recognition-SMAI/public/"
        + this.userImage;
    newImg.onload = function () {
      img.src = this.src;
    }
    imgHolderElement.appendChild(img);

    wrapper.appendChild(imgHolderElement);
    return wrapper;
  },

  getScripts: function () {
    return [];
  },

  getStyles: function () {
    return [
      "MMM-Face-Multi-User-Recognition-SMAI.css",
    ];
  },

  // Load translations files
  getTranslations: function () {
    //FIXME: This can be load a one file javascript definition
    return {
      de: "translations/de.json",
      en: "translations/en.json",
      es: "translations/es.json",
      nb: "translations/nb.json",
      ko: "translations/ko.json"
    };
  },

  notificationReceived: function (notification, payload, sender) {
    const self = this;

    switch (notification) {
      case "USERS_LOGIN": {
        // Face Rec sends multiple notifications even if user is already logged in and logout timer still active.
        if (this.config.useMMMFaceRecoDNN && this.loggedIn) {
          Log.log("Notification: " + notification + " from Mirror. Logging in "
              + payload);

          // Fetch the users image.
          this.loggedIn = true;
          this.userName = payload;
          this.userImage = payload + ".jpg"; //Assume for now.
          self.updateDom(100);
        }

        break;
      }
      case "USERS_LOGOUT_MODULES": {
        Log.log("Notification: " + notification + " from Mirror. Logging out "
            + payload);

        this.loggedIn = false;
        this.userName = this.translate('GUEST_NAME');
        this.userImage = GUEST_IMAGE;
        self.updateDom(100);

        break;
      }
    }
  },

  // Local helper functions
  capitalizeWords: function (str) {
    return str.toString().toLowerCase().split(' ').map(
        word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
  },

  timeOfDay: function () {
    const hour = moment().hour();

    if (hour >= this.config.morningStartTime && hour
        < this.config.morningEndTime) {
      return MORNING;
    } else if (hour >= this.config.afternoonStartTime && hour
        < this.config.afternoonEndTime) {
      return AFTERNOON;
    }

    return EVENING;
  }

});
