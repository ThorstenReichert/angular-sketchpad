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
