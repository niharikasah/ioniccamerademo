angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('hi_IN', {"Choose Photo":"फोटो का चयन","See list":"सूची देखें","Take Photo":"फोटो लें"});
/* jshint +W100 */
}]);