import Avatar from "../avayar.jpg";

function createAvatar() {
  var img = document.createElement('img');
  img.src = Avatar;
  img.classList.add('avatar');
  var dom = document.getElementById("root");
  dom.appendChild(img);
}

export default createAvatar;