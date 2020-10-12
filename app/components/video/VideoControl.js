import { getRotateRadio } from "@app/data/request";

//视频站点服务器的地址
const videoSvrUrl = 'http://218.56.180.250:9108/';
/**
 * 登录请求
 * @type {string}
 * 默认账号：admin
 * 默认密码：12345
 * 请勿修改H5Stream中的密码
 */
const loginUrl = `${videoSvrUrl}api/v1/Login?user=admin&password=827ccb0eea8a706c4c34a16891f84e7b`;

/**
 * 表示与视频服务器通讯的对象
 */
export default class VideoControl{

  constructor(){
    this.isLogin = false;
    this.session = null;
  }

  /**
   * 登录服务器
   * @param userName 当前登录名称
   * @param pwd 登录密码（密码的MD5)
   * @returns {Promise<any>}
   */
  login(userName, pwd){
    let _this = this;

    return new Promise(function (resolve, reject) {
      //发送登录请求
      fetch(loginUrl)
        .then(data => data.json())
        .then(result => {
          _this.isLogin = result.bStatus;

          if(result.bStatus === true){
            _this.session = result.strSession;
            resolve(result.strSession);
            //this.setState({sessionId: result.strSession})
          } else {
            reject('登录失败');
          }
        })
        .catch(error => {
          _this.isLogin = false;
          reject(error);
        });
    });
  }

  /**
   * 获取登录状态
   * @returns {boolean} true 已经登录， false 未登录
   */
  getLoginStatus(){
    return this.isLogin;
  }

  /**
   * 操作摄像头
   * token 摄像头的token值
   * action ： up/down/left/right/zoomin/zoomout
  */
  Ptz({ token, action }) {
    return new Promise(function (resolve, reject) {
      getRotateRadio({ token, action })
        .then(result => resolve(result))
        .catch(e => reject(e));
     });
  }

  /**
   * 获取登录的session
   * @returns {}
   */
  getSession(){
    if(this.getLoginStatus()){
      return this.session;
    }

    return null;
  }

}
