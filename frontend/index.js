const card = post => {
    return `<div class="card z-depth-4">
  <div class="card-content">
    <span class="card-title">${post.title}</span>
    <p>${post.text}</p>
    <small>${post.date}</small>
  </div>
  <div class="card-action">
    <button class="btn btn-small red">
      <i class="material-icons">delete</i>
    </button>
  </div>
  </div>`;
};

// Request on Backend
let posts = [];
let modal;
const BASE_URL = '/api/post';


class PostApi {
    // get all posts
    static fetch() {
        return fetch(BASE_URL, {
            method: 'get',
        }).then(res => res.json())
    }

    /** create post */
    static create(post) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backendPosts => {
        posts = backendPosts.concat();
        renderPosts(posts);

        // setTimeout(() => {
        //   renderPosts(posts)
        // }, 1000)
    });


    modal = M.Modal.init(document.querySelector('.modal'));
    document.querySelector('#createPost').addEventListener('click', onCreatePost);


});

function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts');

    if (_posts.length > 0) {
        $posts.innerHTML = _posts.map(post => card(post)).join(' ');
    } else {
        $posts.innerHTML = `<div class="center">Постов пока нет</div>`;
    }
}


function onCreatePost() {
    const $title = document.querySelector('#title');
    const $text = document.querySelector('#text');

    if ($title.value && $text.value) {
        const newPost = {
            title: $title.value,
            text: $text.value
        };

        PostApi.create(newPost).then(post => {
            posts.push(post);
            renderPosts(posts)
        });
        modal.close();
        $title.value = '';
        $text.value = '';
        M.updateTextFields()


    }
}