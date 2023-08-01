export const defaultJS = `
import san from 'san'
class Input extends san.Component {
  static template = \`
      <div>
          <input value="{= name =}" placeholder="what is your name?">
          <div class="content">Hello! {{name}}</div>
      </div>
  \`;
}

class Header extends san.Component {
  static template = \`
      <div>
          <img class="logo" src="https://baidu.github.io/san/img/logo-colorful.svg"/>
          <a class="title" href="https://baidu.github.io/san">San</a>
          <p class="detail">A fast, lightweight, and flexible JavaScript component framework.</p>
      </div>
  \`;
}
class MyApp extends san.Component {
  static template = \`
      <div class="container">
          <my-header />
          <my-input /> 
      </div>
  \`;

  static components = {
      'my-input': Input,
      'my-header': Header
  };
}


let myApp = new MyApp();
myApp.attach(document.body);
`

export const defaultCss = `
.container {
  text-align: center;
  padding: 4rem 10rem;
  color: #6a6868;
  font-family: monospace;
}

input {
display: block;
outline: none;
width: 200px;
height: 35px;
text-align: center;
border: 1px solid #f0f0f0;
border-radius: 0.1rem;
background: transparent;
padding:0;
margin:auto;
}

.logo {
  width: 40px;
  height: 40px;
}

.title {
  display: block;
  text-decoration: none;
  color: inherit;
}

.detail {
  color:#b9b7b7;
  font-size: small;
  padding-bottom: 2rem;
}

.content {
  margin-top: 1rem;
}
`

export const STORAGE_KEY = 'last_search'
