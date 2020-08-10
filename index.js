// import _ from 'lodash';
//
// console.log(_.join(['a','b','c'], ','));
import $ from 'jquery';
import './index.css';
import './src/index.scss';
import './style1.css';

console.log($('#app'));

function getComponent() {
  return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _}) => {
    var ele = document.createElement('div');
    ele.innerHTML = _.join(['a', 'b', 'c'], ',');
    return ele;
  });
}

document.addEventListener('click', () => {
  getComponent().then(ele => {
    document.body.appendChild(ele);
  });
});