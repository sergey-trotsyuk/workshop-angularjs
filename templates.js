angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('./root.html','<div class="root">\n  <main-header></main-header>\n  <main-content>\n    <h1>Hello world!</h1>\n  </main-content>\n</div>\n');
$templateCache.put('./main-content.html','<div class="main-content">\n    <ng-transclude></ng-transclude>\n\n    <post-list>\n        <post-list-item item="item" ng-repeat="item in $ctrl.items"></post-list-item>\n    </post-list>\n\n</div>\n');
$templateCache.put('./main-header.html','<div class="main-header">\n    Header!\n</div>\n');
$templateCache.put('./post-list.html','<ul>\n    <ng-transclude></ng-transclude>\n</ul>\n');
$templateCache.put('./post-list-item.html','<li>{{$ctrl.item.title}}</li>\n');}]);