const deploy = require('eden-remote-deploy');

const deployCfg = {
  xiaoyan: {
    receiver: 'http://10.188.40.14:8056/receiver.php',
    root: '/home/yuxiaoyan/sf-odp/',
  },
  zhangyi: {
    receiver: 'http://10.188.40.14:8028/receiver.php',
    root: '/home/zhangyi/odp_cat/',
  },
  qa: {
    receiver: 'http://10.188.60.149:8080/receiver.php',
    root: '/home/sftcwl/odp_dataauth/',
  },
  chunyan: {
    receiver: 'http://10.188.60.104:1080/receiver.php',
    root: '/home/sftcwl/odp_g2c/',
  },
  pengshang: {
    receiver: 'http://10.188.40.14:5656/receiver.php',
    root: '/home/pengshang/odp_cat/',
  },
  xiaoyan2: {
    receiver: 'http://10.188.40.14:8888/receiver.php',
    root: '/home/yuxiaoyan/sf-odp/',
  },
  dongchao: {
    receiver: 'http://10.188.40.14:8086/receiver.php',
    root: '/home/caodongchao/odp_cat/',
  },
  zhangxu: {
    receiver: 'http://10.188.40.14:7878/receiver.php',
    root: '/home/zhangxu/odp_cat/',
  },
};

const edenCfg = [{
  from: 'dist/static/**',
  to: 'webroot/static/',
}, {
  from: 'dist/template/**',
  to: 'template/',
}];

const hostName = process.argv[2];// 捕获机器名字

if (hostName && deployCfg[hostName]) {
  const receiver = deployCfg[hostName].receiver;
  console.info('==>   Receiver:', receiver);

  deploy(edenCfg, receiver, deployCfg[hostName].root);
} else {
  console.error('==>   请输入正确的部署机器名');
}
