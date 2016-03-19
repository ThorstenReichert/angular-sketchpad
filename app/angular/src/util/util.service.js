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
