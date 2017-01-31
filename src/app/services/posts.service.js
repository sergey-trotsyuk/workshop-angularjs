// class PostsService {
//     constructor($http, $resource) {
//         this.$http = $http;
//         this.$resource = $resource;
//     }
//
//     getPostResource() {
//         return this.$resource('http://sarhan-blog.herokuapp.com/api/posts/');
//     }
//
//     getPosts() {
//         return this.$http.get('http://sarhan-blog.herokuapp.com/api/posts/');
//     }
//
//     addPost(postData) {
//         return this.$http.post('http://sarhan-blog.herokuapp.com/api/posts/', postData);
//     }
// }
//
// angular.module('services').service('PostsService', PostsService);


angular.module('services').factory('Posts', function($resource) {
    return $resource('http://sarhan-blog.herokuapp.com/api/posts/', null, {
        query: {
            isArray: true,
            transformResponse: function (data) {
                return angular.fromJson(data).responses.posts;
            }
        }
    });
});
