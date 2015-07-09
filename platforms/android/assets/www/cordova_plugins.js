cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.inappbrowser/www/inappbrowser.js",
        "id": "org.apache.cordova.inappbrowser.inappbrowser",
        "clobbers": [
            "window.open"
        ]
    },
    {
        "file": "plugins/com.purplebrain.adbuddiz.sdk/www/adbuddizbridge.js",
        "id": "com.purplebrain.adbuddiz.sdk.AdBuddizBridge"
    },
    {
        "file": "plugins/com.purplebrain.adbuddiz.sdk/www/adbuddiz.js",
        "id": "com.purplebrain.adbuddiz.sdk.AdBuddiz",
        "clobbers": [
            "adbuddiz"
        ]
    },
    {
        "file": "plugins/com.phonegap.parsepushplugin/www/parse-push-plugin.js",
        "id": "com.phonegap.parsepushplugin.ParsePushPlugin",
        "clobbers": [
            "ParsePushPlugin"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.apache.cordova.inappbrowser": "0.6.0",
    "com.purplebrain.adbuddiz.sdk": "3.0.8",
    "com.phonegap.parsepushplugin": "0.5.0",
    "org.apache.cordova.device": "0.3.0"
}
// BOTTOM OF METADATA
});