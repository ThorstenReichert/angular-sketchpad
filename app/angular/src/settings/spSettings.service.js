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
