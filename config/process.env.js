const minimist = require("minimist");

// 配置命令行可以接受的参数以及默认值
let knownOptions = {
  string: ['use_platform','use_ratio','use_mode','use_compatibility','netdisk_desc'],
  boolean: ['use_ext', 'is_transplant','is_uninstall_package'],
  default: {
    use_platform: "pad", // 平板则为pad，折叠屏则为fold
    use_ext: false,// true为混入扩展配置，false则不混入扩展配置
    is_transplant: false, // true为基于6max的移植包，false则为非移植包
    use_ratio: '16:10', // 模块适配比例，6pro及以下是16:10, 6s pro以上是3:2
    use_mode: 'activityEmbedding', // 使用的平行视界模式，支持安卓11时代的magicWindow和安装12L起的activityEmbedding
    use_merge_config_brand: 'hw', // 合并平行视界规则时候使用的规则厂商品牌，hw——华为/荣耀平板，oppo——OPPO Pad
    use_compatibility: '', // 特别版本的兼容参数，not_supported_show_divider——不支持左右滑动条的机型
    is_uninstall_package: false, // true为打卸载包，false则为普通包
    netdisk_desc: '', // 打包网盘提供的额外参数
  },
  alias: {
    p: 'use_platform',
    e: 'use_ext',
    t: 'is_transplant',
    r: 'use_ratio',
    m: 'use_mode',
    b: 'use_merge_config_brand',
    pc: 'use_compatibility',
    u: 'is_uninstall_package'
  }
};

const options = minimist(process.argv.slice(2), knownOptions);

module.exports = {
  options
}