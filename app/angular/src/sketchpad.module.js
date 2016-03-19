(function () {

    angular.module('sketchpad', [
        'sketchpad.canvas',
        'sketchpad.settings'
    ])
        .config(['$compileProvider', function ($compileProvider) {
            // $compileProvider.debugInfoEnabled(false);
        }]);

})();
