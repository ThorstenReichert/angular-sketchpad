(function () {
    'use strict';

    angular
        .module('sketchpad.settings')
        .directive('spColor', spColor);

    spColor.$inject = ['spSettings', 'COLOR_PRESETS'];
    function spColor(spSettings, COLOR_PRESETS) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spColorController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'angular/src/settings/spColor.tpl.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.$watch('vm.preset', function (newValue, oldValue) {
                if (typeof newValue === 'string' && COLOR_PRESETS.hasOwnProperty(newValue)) {
                    var color = COLOR_PRESETS[newValue];
                    
                    scope.vm.red = color.red;
                    scope.vm.green = color.green;
                    scope.vm.blue = color.blue;
                    
                    spSettings.setColor(color.red, color.green, color.blue);
                }
            });
        }
    }
    /* @ngInject */
    spColorController.$inject = ['spSettings', 'COLOR_PRESETS'];
    function spColorController (spSettings, COLOR_PRESETS) {
        var vm = this; // jshint ignore:line
        
        vm.red = null;
        vm.green = null;
        vm.blue = null;
        vm.COLOR_PRESETS = COLOR_PRESETS;
        vm.preset = null;
        vm.reset = reset;
        vm.submit = submit;
        
        init();
        
        ///////////////
        
        function init() {
            var color = spSettings.getColor();
            vm.red = color.red;
            vm.green = color.green;
            vm.blue = color.blue;
        }
        
        function reset() {
            spSettings.setColor(0,0,0);
            init();
        }
        
        function submit() {
            spSettings.setColor(vm.red, vm.green, vm.blue);
            vm.preset = null;
        }
    }

})();
