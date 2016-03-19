(function () {
    'use strict';

    angular
        .module('sketchpad.canvas')
        .directive('spCanvas', spCanvas);

    spCanvas.$inject = [];
    function spCanvas() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spCanvasController,
            controllerAs: 'vm',
            link: link,
            replace: true,
            restrict: 'E',
            scope: {
                width: '=',
                height: '='
            },
            templateUrl: 'angular/src/canvas/spCanvas.tpl.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    spCanvasController.$inject = ['$scope', 'spSettings', 'CANVAS_EVENTS'];
    function spCanvasController ($scope, spSettings, CANVAS_EVENTS) {
        var vm = this; // jshint ignore:line

        vm.display = false;
        vm.pixelsX = null;
        vm.pixelsY = null;
        vm.pixelWidth = null;
        vm.pixelHeight = null;
        vm.show = show;
        vm.sizeX = null;
        vm.sizeY = null;

        init();

        /////////////////

        $scope.$on(CANVAS_EVENTS.resize, function () {
            var res = spSettings.getRes();

            if (res.x !== vm.pixelsX.length || res.y !== vm.pixelsY.length) {
                init();
            }
        });

        /////////////////

        function init() { // jshint ignore:line
            vm.display = false;

            if (typeof vm.height !== 'number') {
                throw 'Expected number as height';
            }
            if (typeof vm.width !== 'number') {
                throw 'Expected number as width';
            }

            var res = spSettings.getRes();

            vm.pixelsX = [];
            for (var i = 1; i <= res.x; i++) {
                vm.pixelsX.push(i);
            }

            vm.pixelsY = [];
            for (var j = 1; j <= res.y; j++) {
                vm.pixelsY.push(j);
            }

            vm.pixelWidth = Math.floor(vm.width / res.x);
            vm.pixelHeight = Math.floor(vm.height / res.y);
            vm.sizeX = res.x * vm.pixelWidth;
            vm.sizeY = res.y * vm.pixelHeight;

            if (vm.pixelWidth < 1) {
                throw 'Pixel width <= 0 not acceptable';
            }
            if (vm.pixelHeight < 1) {
                throw 'Pixel height <= 0 not acceptable';
            }
            if (vm.sizeX < 1) {
                throw 'Canvas width <= 0 not acceptable';
            }
            if (vm.sizeY < 1) {
                throw 'Canvas height <= 0 not acceptable';
            }

            vm.display = true;
        }

        function show() {
            return vm.display;
        }
    }

})();
