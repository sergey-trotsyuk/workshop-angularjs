class MainContentController {
    constructor(Posts) {
        this.Posts = Posts;
    }

    $onInit() {
        // this.items = [];
        this.items = this.Posts.query();

        // this.PostsService.getPosts().then((response) => {
        //     this.items = response.data.responses.posts;
        // });
    }

    onAddPost() {
        const post = new this.Posts({
            description: "Sergey's Blog Description"
        });
        post.title = "Sergey's Blog Post";
        post.$save();
    }
}

angular.module('components.mainContent').component('mainContent', {
    controller: MainContentController,
    templateUrl: './main-content.html',
    transclude: true
});
