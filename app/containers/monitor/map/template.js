import addEventListener from 'rc-util/lib/Dom/addEventListener';
export function createPersonDom(modal, callback) {
  let root = document.createElement('div');
  root.className = "m-ovl-box m-ovl-person";
  let close = document.createElement('span');
  close.className = "iconfont iconcuo m-ovl-close";
  let fLine = document.createElement('div');
  fLine.className = "m-ovl-line";
  let name = document.createElement('span');
  name.innerHTML = `姓名: ${modal.id}`;
  let job = document.createElement('span');
  job.innerHTML = `职位: 工程师`;
  fLine.appendChild(name);
  fLine.appendChild(job);
  let sLine = document.createElement('div');
  sLine.className = "m-ovl-line";
  let phone = document.createElement('span');
  phone.innerHTML = `电话: 12345678901`;
  let videoIcon = document.createElement('span');
  videoIcon.className = "iconfont iconshipin m-ovl-video";
  sLine.appendChild(phone);
  sLine.appendChild(videoIcon);
  root.appendChild(fLine);
  root.appendChild(sLine);
  root.appendChild(close);
  addEventListener(videoIcon, "click", callback.onVideoClick);
  addEventListener(close, "click", callback.onClose);
  return root;
}
export function createCameraDom(modal, callback) {
  let root = document.createElement('div');
  root.className = "m-ovl-box m-ovl-camera";
  let fLine = document.createElement('div');
  fLine.className = "m-ovl-line";
  fLine.innerHTML = `职位: 工程师`;
}
export function createRainDom(modal, callback) {
  let root = document.createElement('div');
  root.className = "m-ovl-box m-ovl-rain";
  let fLine = document.createElement('div');
  fLine.className = "m-ovl-line";
  fLine.innerHTML = `雨量站点:丁王`;
  let line2 = document.createElement('div');
  line2.className = "m-ovl-line";
  line2.innerHTML = `雨量站点:丁王`;
  let line3 = document.createElement('div');
  line3.className = "m-ovl-line";
  line3.innerHTML = `雨量站点:丁王`;
  let line4 = document.createElement('div');
  line4.className = "m-ovl-line";
  line4.innerHTML = `雨量站点:丁王`;
  root.appendChild(fLine);
  root.appendChild(line2);
  root.appendChild(line3);
  root.appendChild(line3);
  return root;
}