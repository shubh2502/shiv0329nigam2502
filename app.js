(function () {

    window.app = angular.module('coffeeMart', ['ui.router', 'pascalprecht.translate', 'app.core',
        'app.sidebar',
        'app.navsearch',
        'app.preloader',
        'app.settings',
        'app.dashboard',
        'app.icons',
        'app.flatdoc',
        'app.notify',
        'app.bootstrapui',
        'app.elements',
        'app.panels',
        'app.charts',
        'app.forms',
        'app.locale',
        'app.maps',
        'app.pages',
        'app.tables',
        'app.extras',
        'app.mailbox',
        'app.utils'
    ]);

    app.controller('appController', MainParentController)
    MainParentController.$inject = ['$translate'];
    function MainParentController($translate) {
        var vm = this;
        vm.changeLanguage = function (key) {
            $translate.use(key);
            vm.toggleDropdown();
            // tmhDynamicLocale.set(key);
        }
        vm.flag = false;
        vm.toggleDropdown = function () {
            vm.flag = !vm.flag;
            document.getElementById('lang-option').style.display = vm.flag ? "block" : "none";
        }

        //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
        vm.getParameterByName = function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        }

        $translate.use(vm.getParameterByName('locale'));
        // $rootScope.availableLocales = {
        //     'en': 'English',
        //     'ar': 'Arabic'
        // };

        // $rootScope.model = { selectedLocale: 'en' };

        // $rootScope.$locale = $locale;

        // $rootScope.changeLocale = tmhDynamicLocale.set;
    }

})();