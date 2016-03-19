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

(function () {

    angular.module('sketchpad.constants').constant('CANVAS_EVENTS', {
        clear: 'canvas-clear',
        invert: 'canvas-invert',
        random: 'canvas-random',
        resize: 'canvas-resize'
    });

})();

(function () {
    
    angular.module('sketchpad.constants').constant('COLOR_PRESETS', {
        black: {
            red: 0,
            green: 0,
            blue: 0
        },
        red: {
            red: 255,
            green: 0,
            blue: 0
        },
        green: {
            red: 0,
            green: 255,
            blue: 0
        },
        blue: {
            red: 0,
            green: 0,
            blue: 255
        },
        yellow: {
            red: 255,
            green: 255,
            blue: 0
        },
        magenta: {
            red: 255,
            green: 0,
            blue: 255
        },
        cyan: {
            red: 0,
            green: 255,
            blue: 255
        },
        white: {
            red: 255,
            green: 255,
            blue: 255
        }
    });
    
})();
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

(function () {
    'use strict';

    angular
        .module('sketchpad')
        .service('spSettings', spSettingsService);

    spSettingsService.$inject = ['TOOLBOX', 'util'];
    function spSettingsService(TOOLBOX, util) {
        var sv = this; // jshint ignore:line

        sv.getBG = getBG;
        sv.getColor = getColor;
        sv.getRes = getRes;
        sv.getTool = getTool;
        sv.setBG = setBG;
        sv.setColor = setColor;
        sv.setRes = setRes;
        sv.setTool = setTool;

        var opt = {};
        opt.bg = {red: 255, green: 255, blue: 255};
        opt.color = {red: 0, green: 0, blue: 0};
        opt.res = {};
        opt.res.x = 10;
        opt.res.y = 10;
        opt.tool = TOOLBOX.pencil;

        ////////////////

        function getBG() {
            return opt.bg;
        }

        function getColor() {
            return opt.color;
        }

        function getRes() {
            return opt.res;
        }

        function getTool() {
            return opt.tool;
        }

        function setBG(red, green, blue) {
            if (util.isColor(red) && util.isColor(green) && util.isColor(blue)) {
                opt.bg.red = red;
                opt.bg.green = green;
                opt.bg.blue = blue;
            } else {
                throw 'BG: Color not valid';
            }
        }

        function setColor(red, green, blue) {
            if (util.isColor(red) && util.isColor(green) && util.isColor(blue)) {
                opt.color.red = red;
                opt.color.green = green;
                opt.color.blue = blue;
            } else {
                throw 'Pencil: Color not valid';
            }
        }

        function setRes(x, y) {
            if (util.isInt(x) && util.isInt(y) && x > 0 && y > 0) {
                opt.res.x = x;
                opt.res.y = y;
            } else {
                console.log('typeof x === ' + typeof x);
                console.log('typeof y === ' + typeof y);
                throw 'Invalid Resolution';
            }
        }

        function setTool(tool) {
            for (var prop in TOOLBOX) {
                if (TOOLBOX.hasOwnProperty(prop)) {
                    if (TOOLBOX[prop] === tool) {
                        opt.tool = tool;
                        return;
                    }
                }
            }
            throw 'Invalid tool';
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('sketchpad')
        .directive('spSettingsPanel', spSettings);

    spSettings.$inject = [];
    function spSettings() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            controller: spSettingsPanelController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'angular/src/settings/spSettingsPanel.tpl.html'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function spSettingsPanelController () {
    }

})();

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

(function () {

    angular.module('sketchpad').constant('TOOLBOX', {
        pencil: 'tools-pencil',
        eraser: 'tools-eraser'
    });

})();

(function () {
    'use strict';

    angular
        .module('sketchpad')
        .service('util', util);

    util.$inject = [];
    function util() {
        var sv = this; // jshint ignore: line

        sv.isColor = isColor;
        sv.isInt = isInt;
        sv.isRGB = isRGB;
        sv.randomColor = randomColor;

        ////////////////

        function isColor(n) {
            return isInt(n) && n >= 0 && n <= 255;
        }

        function isInt(n) {
            if (typeof n !== 'number' || n % 1 !== 0) {
                return false;
            } else {
                return true;
            }
        }

        function isRGB(obj) {
            if (
                typeof obj === 'object' &&
                obj.red !== undefined && obj.red !== null &&
                obj.green !== undefined && obj.green !== null &&
                obj.blue !== undefined && obj.blue !== null
            ) {
                return isColor(obj.red) && isColor(obj.green) && isColor(obj.blue);
            } else {
                return false;
            }
        }
        
        function randomColor() {
            var res = {};
            res.red = Math.floor(Math.random() * 255);
            res.green = Math.floor(Math.random() * 255);
            res.blue = Math.floor(Math.random() * 255);
            
            if (isRGB(res)) {
                return res;
            } else {
                throw 'randomColor result not compliant with color definition (isRGB failed)';
            }
        }
    }

})();

//# sourceMappingURL=angular-components.js.map
