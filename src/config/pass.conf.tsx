interface IPassUri {
  login: string;
  logout: string;
  editpwd: string;
  bindphone: string;
  [key: string]: any;
};

interface IPassConf {
  enable: boolean;
  uri: IPassUri;
};

const conf: IPassConf = {
  enable: false,
  uri: {
    login: '/static/pass.html#/login',
    logout: '/static/pass.html#/logout',
    editpwd: '/static/pass.html#/editpwd',
    bindphone: '/static/pass.html#/bindphone',
  },
};

export const gotoPass = (type: string) => {
  if (conf.enable && conf.uri[type]) {
    window.location.href = conf.uri[type];
  }
};

export default conf;
