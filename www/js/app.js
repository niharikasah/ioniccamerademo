var cam = angular.module('starter', ['ionic', 'ngCordova', 'ui.router', 'pascalprecht.translate']);

cam.run(function ($ionicPlatform) {
//    gettextCatalog.currentLanguage = 'hi';
//    gettextCatalog.setCurrentLanguage('hi');
//    gettextCatalog.debug = 'true';
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});
cam.config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
    $urlRouterProvider.otherwise("/");
    //disable cache 
    $stateProvider
            .state('state1', {
                url: "/",
                templateUrl: "partials/state1.html"
            })
            .state('state1.list', {
                url: "list",
                templateUrl: "partials/state1.list.html",
                controller: function ($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }
            });
    $translateProvider
            .useStaticFilesLoader({
                prefix: 'dist/translations/',
                suffix: '_IN.json',
                key: ''
            })
            .translations('hi', 'dist/translations/hi_IN.json')
            .registerAvailableLanguageKeys(['kn', 'hi'], {
                'kn_*': 'kn',
                'hi_*': 'hi',
                '*': 'hi'
            })
            .fallbackLanguage('hi')
            .preferredLanguage('hi')
            //.useLoaderCache(true)
            .determinePreferredLanguage();

    $translateProvider.useSanitizeValueStrategy('escaped');

});
cam.controller("ExampleController", function ($scope, $cordovaCamera) {
//    $scope.greeting = gettext("Hello");
    $scope.switchLanguage = function (lang) {
        gettextCatalog.setCurrentLanguage(lang);
        gettextCatalog.loadRemote("/dist/translations/" + lang + "_IN.json");
    };
    $scope.takePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }

    $scope.choosePhoto = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
});

