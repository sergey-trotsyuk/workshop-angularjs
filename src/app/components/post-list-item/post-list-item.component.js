class PostListItemController {

}

angular.module('components.postListItem').component('postListItem', {
    controller: PostListItemController,
    templateUrl: './post-list-item.html',
    bindings: {
        item: '<'
    }
});
