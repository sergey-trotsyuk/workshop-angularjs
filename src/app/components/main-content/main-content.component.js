class MainContentController {
    constructor($http) {
        this.$http = $http;
    }

    $onInit() {
        this.items = [];
        this.$http.get('http://sarhan-blog.herokuapp.com/api/posts/').then((response) => {
            console.log('!!! ');
            this.items = response.data.responses.posts;
        });
    }
}

angular.module('components.mainContent').component('mainContent', {
    controller: MainContentController,
    templateUrl: './main-content.html',
    transclude: true
});
