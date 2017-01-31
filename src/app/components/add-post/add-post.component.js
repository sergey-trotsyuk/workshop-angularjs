class AddPostController {
    constructor(Posts) {
        this.Posts = Posts;
        this.item = {};
    }

    $onInit() {

    }

    onAddPost(postForm) {
        if (postForm.$valid) {
            const post = new this.Posts(this.item);
            post.$save();
        }
    }
}

angular.module('components.addPost').component('addPost', {
    controller: AddPostController,
    templateUrl: './add-post.html'
});
