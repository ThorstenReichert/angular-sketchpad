(function () {

    angular.module('sketchpad', [
        'sketchpad.canvas',
        'sketchpad.settings'
    ])
        .config(['$compileProvider', function ($compileProvider) {
            // $compileProvider.debugInfoEnabled(false);
        }]);

})();

(function () {
    
    angular.module('sketchpad.canvas', [
        'sketchpad.constants',
        'sketchpad.settings',
        'sketchpad.util'
    ]);

})();

(function () {
    
    angular.module('sketchpad.constants', []);
    
})();

(function () {
    
    angular.module('sketchpad.settings', [
        'sketchpad.constants',
        'sketchpad.util'
    ]);
    
})();

(function () {
    
    angular.module('sketchpad.util', []);
    
})();

//# sourceMappingURL=angular-modules.js.map
