export const defaultJS = `class MyApp extends san.Component {
  static template = \`
    <div class="container">
      <input value="{= name =}" placeholder="please input">
      Hello {{name}}!
    </div>
  \`;
}

let myApp = new MyApp();
myApp.attach(document.body);
`

export const defaultCss = '.container {color: red;}'

export const STORAGE_KEY = 'last_search'
