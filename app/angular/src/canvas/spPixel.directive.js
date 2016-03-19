(function () {
    'use strict';

    angular
        .module('sketchpad.canvas')
        .directive('spPixel', spPixel);

    spPixel.$inject = ['spSettings', 'CANVAS_EVENTS', 'TOOLBOX', 'util'];
    function spPixel(spSettings, CANVAS_EVENTS, TOOLBOX, util) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spPixelController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                posX: '=',
                posY: '=',
                height: '=',
                width: '='
            },
            templateUrl: 'angular/src/canvas/spPixel.tpl.html'
        };
        return directive;

        function link(scope, element, attrs, globalCtrl) {
            scope.$on(CANVAS_EVENTS.clear, function () {
                var color = spSettings.getBG();

                scope.vm.color.red = color.red;
                scope.vm.color.green = color.green;
                scope.vm.color.blue = color.blue;
            });

            scope.$on(CANVAS_EVENTS.invert, function () {
                scope.vm.color.red = 255 - scope.vm.color.red;
                scope.vm.color.green = 255 - scope.vm.color.green;
                scope.vm.color.blue = 255 - scope.vm.color.blue;
            });
            
            scope.$on(CANVAS_EVENTS.random, function () {
                var color = util.randomColor();
                
                scope.vm.color.red = color.red;
                scope.vm.color.green = color.green;
                scope.vm.color.blue = color.blue;
            })
        }
    }
    /* @ngInject */
    spPixelController.$inject = ['spSettings', 'CANVAS_EVENTS', 'TOOLBOX', 'util'];
    function spPixelController (spSettings, CANVAS_EVENTS, TOOLBOX, util) {
        var vm = this; // jshint ignore:line

        vm.color = {red: 255, green: 255, blue: 255};
        vm.mouseEnter = mouseEnter;
        vm.mouseLeave = mouseLeave;

        init();

        ///////////////

        function init() {
            var color = spSettings.getBG();

            vm.color.red = color.red;
            vm.color.green = color.green;
            vm.color.blue = color.blue;
        }

        function mouseEnter() {
            var tool = spSettings.getTool();
            var color = null;
            if (tool === TOOLBOX.pencil) {
                color = spSettings.getColor();
            } else if (tool === TOOLBOX.eraser) {
                color = spSettings.getBG();
            }

            if (util.isRGB(color)) {
                vm.color.red = color.red;
                vm.color.green = color.green;
                vm.color.blue = color.blue;
            }
        }

        function mouseLeave() {

        }
    }

})();
