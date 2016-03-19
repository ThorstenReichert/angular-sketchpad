(function () {
    'use strict';

    angular
        .module('sketchpad.settings')
        .directive('spResolution', spResolution);

    spResolution.$inject = ['spSettings', 'TOOLBOX'];
    function spResolution(spSettings, TOOLBOX) {
        // Use:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spResolutionController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'angular/src/settings/spResolution.tpl.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    spResolutionController.$inject = ['$rootScope', 'spSettings', 'CANVAS_EVENTS'];
    function spResolutionController ($rootScope, spSettings, CANVAS_EVENTS) {
        var vm = this; // jshint ignore:line

        vm.res = {};
        vm.res.x = null;
        vm.res.y = null;
        vm.submit = submit;

        init();

        //////////////

        function init() {
            var res = spSettings.getRes();

            vm.res.x = res.x;
            vm.res.y = res.y;
        }

        function submit() {
            spSettings.setRes(vm.res.x, vm.res.y);
            $rootScope.$broadcast(CANVAS_EVENTS.resize);
            console.log('resize submitted');
        }
    }

})();
