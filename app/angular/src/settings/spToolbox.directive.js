(function () {
    'use strict';

    angular
        .module('sketchpad.settings')
        .directive('spToolbox', spToolbox);

    spToolbox.$inject = [];
    function spToolbox() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spToolboxController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'angular/src/settings/spToolbox.tpl.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    spToolboxController.$inject = ['spSettings', 'TOOLBOX'];
    function spToolboxController (spSettings, TOOLBOX) {
        var vm = this; // jshint ignore:line

        vm.isEraser = isEraser;
        vm.isPencil = isPencil;
        vm.setEraser = setEraser;
        vm.setPencil = setPencil;

        //////////////

        function isEraser() {
            return spSettings.getTool() === TOOLBOX.eraser;
        }

        function isPencil() {
            return spSettings.getTool() === TOOLBOX.pencil;
        }

        function setEraser() {
            spSettings.setTool(TOOLBOX.eraser);
        }

        function setPencil() {
            spSettings.setTool(TOOLBOX.pencil);
        }
    }

})();
