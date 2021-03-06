/*
 * Copyright (c) 2012-2017, Inversoft Inc., All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */
'use strict';

/**
 * The Browser namespace. This namespace does not contain any classes, just functions.
 *
 * @namespace Browser
 */
const Browser = {
  /**
   * Detects the browser name and version.
   */
  detect: function() {
    this.name = this._searchString(this.dataBrowser) || "An unknown browser";
    this.version = this._searchVersion(navigator.userAgent) || this._searchVersion(navigator.appVersion) || "an unknown version";
    this.os = this._searchString(this.dataOS) || "an unknown OS";
  },


  /* ===================================================================================================================
   * Private Methods
   * ===================================================================================================================*/

  /**
   *
   * @param {Object} data The data array.
   * @returns {?string} The browser identity String.
   * @private
   */
  _searchString: function(data) {
    for (let i = 0; i < data.length; i++) {
      const dataString = data[i].string;
      const dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString && dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      } else if (dataProp) {
        return data[i].identity;
      }
    }

    return null;
  },

  /**
   *
   * @param {string} dataString The browser data string.
   * @returns {?number} The version or null.
   * @private
   */
  _searchVersion: function(dataString) {
    const index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return null;
    }

    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },

  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {
      string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {    // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS: [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
      string: navigator.userAgent,
      subString: "iPhone",
      identity: "iPhone/iPod"
    },
    {
      string: navigator.userAgent,
      subString: "iPad",
      identity: "iPad"
    },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]
};
Browser.detect();

export {Browser}
