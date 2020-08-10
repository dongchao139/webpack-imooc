// import "@babel/polyfill";
import Header from '../src/header';
import Sidebar from '../src/sidebar';
import Content from '../src/content';
import '../src/index.scss';
import './style.css';
import createAvatar from './src/createAvatar';
import counter from './counter';
import number from './number';
import React, {Component} from 'react';
import ReactDom from 'react-dom';

createAvatar();

new Header();
new Sidebar();
new Content();

var btn = document.createElement('button');
btn.innerHTML = '新增';
btn.onclick = function () {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
};
document.body.appendChild(btn);

counter();
number();

const arr = [
    new Promise((resolve, reject) => {
      resolve();
    }),
    new Promise((resolve, reject)=> {
      reject();
    })
];

arr.map(item => {
  console.log(item);
});

if (module.hot) {
  module.hot.accept('./number', () => {
    document.body.removeChild(document.getElementById('number'));
    number();
  });
}


class App extends Component {
  render() {
    return (
        <div>Hello World</div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'));