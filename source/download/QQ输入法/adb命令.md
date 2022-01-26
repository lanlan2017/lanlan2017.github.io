先进入命令所在的目录，然后在5555端口打开监听器
```
F: && cd F:\Program Files\scrcpy-win64-v1.18 && adb tcpip 5555
```
然后连接手机
```
adb connect 手机IP:5555
```
**消除ADB错误“more than one device and emulator”的方法**
如果实际上只有一个设备或模拟器，并且查到有offline的状态；
那就说明是ADB本身的BUG所导致的，就需要用如下的方法处理下了：
```
taskkill /f /im adb.exe
```