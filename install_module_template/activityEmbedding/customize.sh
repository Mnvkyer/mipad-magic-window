# This is customize the module installation process if you need
SKIPUNZIP=0

# For Android 12+
# 移除模块文件写保护
ui_print "- 正在移除《HyperOS For Pad/Fold 完美横屏应用计划》模块文件的写保护……"
chattr -i /data/system/cloudFeature_embedded_rules_list.xml
chattr -i /data/system/cloudFeature_fixed_orientation_list.xml
ui_print "- 已经移除《HyperOS For Pad/Fold 完美横屏应用计划》模块文件的写保护！"
ui_print "- 《HyperOS For Pad/Fold 完美横屏应用计划》安装/更新完成，重启系统后生效！"
