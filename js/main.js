const firebaseConfig = {
  apiKey: "AIzaSyCotkvW4__nIvhlKSbDFk8JdjQPboSj4vc",
  authDomain: "pikadu-88fd0.firebaseapp.com",
  databaseURL: "https://pikadu-88fd0.firebaseio.com",
  projectId: "pikadu-88fd0",
  storageBucket: "pikadu-88fd0.appspot.com",
  messagingSenderId: "882271855797",
  appId: "1:882271855797:web:44066e8062976b17a54afc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('firebase:', firebase);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordlInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPtotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post')

const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'sanya@mail.com',
    password: '123456',
    displayName: 'Sanya'
  }
];
// console.log(firebase.auth().onAuthStateChanged());

const setUsers = {
  user: null,

  initUser(handler) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      };

      if (handler) {
        handler();
      }
    });
  },

  // Вход
  logIn(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('Email не валиден');
      return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;

        if (errCode === 'auth/wrong-password') {
          console.log(errMessage);
          alert('Неверный пароль');
        } else if (errCode === 'auth/user-not-found') {
          console.log(errMessage);
          alert('Пользователь не найден');
        } else {
          alert(errMessage);
        }

        console.log(err);
      });
    // const user = this.getUser(email);
    // if (user && user.password === password) {
    //   this.authorizedUser(user);
    //   handler();
    // } else {
    //   alert('Пользователь с такими данными не найден');
    // }
    
  },

  logOut() { 
    firebase.auth().signOut();
  },

  // Регистрация
  signUp(email, password, handler) {
    if(!regExpValidEmail.test(email)) {
      alert('Email не валиден');
      return
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные!')
      return
    }

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        const errCode = err.code;
        const errMessage = err.message;

        if (errCode === 'auth/weak-password') {
          console.log(errMessage);
          alert('Слабый пароль');
        } else if (errCode === 'auth/email-already-in-use') {
          console.log(errMessage);
          alert('Этот email уже используется');
        } else {
          alert(errMessage);
        }


        console.log(err);
      });
    // Проверка есть ли пользователь с такой почтой
    // if(!this.getUser(email)) {
    //   const user = {email, password, displayName: email.substring(0, email.indexOf('@'))}
    //   listUsers.push(user);
    //   this.authorizedUser(user);
    //   if (handler) {
    //     handler();
    //   }  

    // } else {
    //   alert('Пользователь с таким email уже зарегистрирован')
    // }
  },

  // Проверка наличия зарегистрированной почты
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },

  editUser(userName, userPhoto = '', handler) {
    if (userName) {
      this.user.displayName = userName;     
    };

    if (userPhoto) {
      this.user.photo = userPhoto;     
    };

    handler();
  },

  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: {displayName: 'maks', photo: 'https://vignette.wikia.nocookie.net/dogopedyrussian/images/7/72/486840.jpeg/revision/latest?cb=20181028100942&path-prefix=ru'},
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 11
    },
    {
      title: 'Заголовок поста 2',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quaerat exercitationem quo, sint assumenda labore totam consequatur reiciendis, provident, vitae reprehenderit quis autem culpa minus voluptatem error! Quo repellat voluptas ea mollitia nisi illum repellendus. Deserunt id, voluptates nulla, odit architecto, ut enim laborum error qui tempore mollitia nihil laudantium vero ducimus hic debitis. Ipsam obcaecati maiores veritatis odio ea!',
      tags: ['свежее', 'мое', 'случайность'],
      author: {displayName: 'maks', photo: 'https://vignette.wikia.nocookie.net/dogopedyrussian/images/7/72/486840.jpeg/revision/latest?cb=20181028100942&path-prefix=ru'},
      date: '10.11.2020, 20:54:00',
      like: 45,
      comments: 12
    },
    {
      title: 'Заголовок поста 2',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'мое', 'случайность'],
      author: {displayName: 'sanya', photo: 'https://vignette.wikia.nocookie.net/dogopedyrussian/images/7/72/486840.jpeg/revision/latest?cb=20181028100942&path-prefix=ru'},
      date: '10.11.2020, 20:54:00',
      like: 45,
      comments: 12
    }
  ],

  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title,
      text,
      tags: tags.split(',').map(tag => tag.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })

    if (handler) {
      handler();
    };
  }
}


const toggleAuthDom = () => {
  const user = setUsers.user;

  console.log('user: ', user)

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
}

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {
  let postsHTML = '';
  setPosts.allPosts.forEach(post => {
    postsHTML += `
      <section class="post">
        <div class="post-body">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-text">${post.text}</p>
          <div class="tags">
            ${post.tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${post.like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${post.comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>
          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${post.author.displayName}</a>
              <span class="post-time">${post.date}</span>
            </div>
            <a href="#" class="author-link"><img src=${post.author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
          </div>
        </div>
      </section>
    `

  })

  postsWrapper.innerHTML = postsHTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

const init = () => {
  menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
  });

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const emailValue = emailInput.value;
    const passwordVAlue = passwordlInput.value;
  
    setUsers.logIn(emailValue, passwordVAlue, toggleAuthDom);
    loginForm.reset();
  })
  
  loginSignup.addEventListener('click', event => {
    event.preventDefault();
  
    const emailValue = emailInput.value;
    const passwordVAlue = passwordlInput.value;
  
    setUsers.signUp(emailValue, passwordVAlue, toggleAuthDom);
    loginForm.reset();
  })
  
  exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut();
  })
  
  editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  
  });
  
  editContainer.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPtotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });

  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();
    showAddPost();
  });

  addPostElem.addEventListener('submit', (event) => {
    event.preventDefault();
    const { title, text, tags } = addPostElem.elements;
    console.log(title);
    if (title.value.length < 6) return alert('Слишком короткий заголовок');
    if (text.value.length < 50) return alert('Слишком короткий пост');
    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);
    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  setUsers.initUser(toggleAuthDom);

  showAllPosts();
}

document.addEventListener('DOMContentLoaded', init);



