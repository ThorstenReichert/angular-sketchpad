(function () {
    'use strict';

    angular
        .module('sketchpad.settings')
        .directive('spFunctions', spFunctions);

    spFunctions.$inject = [];
    function spFunctions() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spFunctionsController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'angular/src/settings/spFunctions.tpl.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    spFunctionsController.$inject = ['$rootScope', 'spSettings', 'CANVAS_EVENTS'];
    function spFunctionsController ($rootScope, spSettings, CANVAS_EVENTS) {
        var vm = this; // jshint ignore:line

        vm.clear = clear;
        vm.invert = invert;
        vm.random = random;

        /////////////

        function clear() {
            $rootScope.$broadcast(CANVAS_EVENTS.clear);
        }

        function invert() {
            $rootScope.$broadcast(CANVAS_EVENTS.invert);
        }
        
        function random() {
            $rootScope.$broadcast(CANVAS_EVENTS.random);
        }
    }

})();
