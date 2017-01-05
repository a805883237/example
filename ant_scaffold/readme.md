开发环境:
cd ant_scaffold
安装:
gem install ruby
sudo gem install rails


**生成命令:**
thor ant:build 文件夹名称/文件名 [--cols=字段一,字段二......]
文件夹名称可以不带,但是我没调试,应该有问题. 字段名之间用 英文逗号隔开,不要定界符""
**删除命令:**
thor ant:remove 文件夹名称/文件名 
不要字段,切记
