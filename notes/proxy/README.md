# Настройка сервера с Ubuntu Server 16.04

В данной инструкции описана базовая настройка сервера на Ubuntu Server 16.04 и запуск на нём необходимых сервисов:
- файрвол [UFW](https://launchpad.net/ufw)
- база данных [MySQL](https://www.mysql.com/products/community/)
- прокси-сервер [Dante](http://www.inet.no/dante/index.html)
- веб-сервер [Nginx](http://nginx.org) + [PHP-FPM](https://php-fpm.org/)
- файловый сервер [Vsftpd](https://security.appspot.com/vsftpd.html)

---

[TOC]

---

## Начало работы

На данном этапе предполагается, что у нас уже есть сервер c Ubuntu Server 16.04 и доступом по SSH, и мы знаем его IP и пароль пользователя `root`. Теперь подключимся к серверу и произведём начальную настройку.

## Доступ по SSH

- **Из Windows**
  Для доступа к серверу в Windows используем [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). Указываем в поле `Host Name` IP сервера, выбираем протокол SSH и жмём Open. Вводим логин `root` и пароль.
  
- **Из Linux**
  Выполним в терминале
  ```bash
  # Устанавливаем клиент SSH
  sudo apt-get install -y ssh
  # Подключаемся по SSH к серверу с логином root и указанным IP
  ssh -p 22 root@your_server_ip
  # Вводим пароль
  ```

## Установка обновлений

При первом подключении рекомендуется установить все доступные обновления, чтобы повысить надёжность и защищённость сервера.

```bash
# Обновляем список доступных пакетов
apt-get update
# Устанавливаем обновления пакетов
apt-get -y upgrade
# Устанавливаем системные обновления
apt-get -y dist-upgrade
# Устанавливаем текстовый редактор nano
apt-get install nano
# Перезапускаем сервер
reboot
```

Через минуту заново подключаемся по SSH и удаляем ненужные пакеты:

```bash
# Удаляем ненужные пакеты, оставшиеся после обновлений ядра
apt-get autoremove
```

## Установка локали

Некоторые программы (например, `ufw`), некорректно обрабатывают символы кодировки unicode. Чтобы избежать этих ошибок, заранее установим локаль `en_US`:

```bash
# Устанавливаем локаль en_US
sudo locale-gen en_US.UTF-8
export LANG=en_US.UTF-8
```

## Создание пользователя

Доступ к серверу от имени пользователя `root` не рекомендуется, так как при наличии полных прав доступа слишком легко что-либо сломать. Создадим на сервере ограниченную учётную запись `user`, из под которой будем работать дальше:

```bash
# Создаём пользователя user, указываем надёжный пароль
adduser user
# Даём права на получение root доступа
usermod -aG sudo user
# Переключаемся на созданного пользователя
su - user
# С этого момента команды, требующие root, нужно выполнять через sudo и подтверждать паролем
# По SSH также заходим с нового аккаунта, а не от root
```

## Настройка Fail2ban

Fail2ban позволяет на основе анализа логов блокировать тех, кто злоупотребляет доступностью сервера по сети. Например, защитить почтовые ящики или SSH от взлома путем перебора паролей или многократного запроса какого-либо ресурса.

Если вы настраиваете VPS/VDS, вероятно, ваш хостинг-провайдер уже позаботился об установке Fail2ban. Это можно проверить, запросив статус сервиса:

```bash
systemctl status fail2ban
```

Если же сервис не установлен, инструкцию по установке можно найти на [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04).

## Настройка файрвола UFW

UFW (Uncomplicated Firewall) — стандартная утилита для конфигурирования межсетевого экрана iptables для ОС Ubuntu Linux. Она использует интерфейс командной строки, состоящий из небольшого числа простых команд.

```bash
# Устанавливаем UFW и текстовый редактор nano
sudo apt-get install ufw nano
# Отключаем файрвол на время настройки
sudo ufw disable
# Открываем настройки, и если сервер доступен по IPv6, указываем там IPV6=yes
sudo nano /etc/default/ufw
# Сохраняем изменения по Ctrl-O, Enter и закрываем файл по Ctrl+X
# Устанавливаем правила по умолчанию для доступа по сети
sudo ufw default deny incoming
sudo ufw default allow outgoing
# Разрешаем подключения по протоколу SSH - ОЧЕНЬ ВАЖНО
sudo ufw allow ssh
# Включаем файрвол
sudo ufw enable
# Проверяем статус
sudo ufw status verbose
```

Подробнее в инструкциях от DigitalOcean:
- [Базовая настройка](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-14-04)
- [Разрешения для других протоколов](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

## Установка MySQL

MySQL — это одна из наиболее популярных и эффективных систем управления базами данных, которая очень часто используется при построении современных веб-сайтов. СУБД MySQL поддерживает язык запросов SQL. Это позволяет совершать такие операции, как запись данных в базу, редактирование данных, извлечение или удаление данных из базы данных.

```bash
# Устанавливаем MySQL
sudo apt-get install mysql-server
# Устанавливаем настройки безопасности: вводим Y для удаления анонимных пользователей, 
# запрета на удалённый доступ для root, удаляем тестовую базу данных и перезагружаем
mysql_secure_installation
# Проверяем статус (нажимаем q для выхода)
systemctl status mysql.service
mysqladmin -p -u root version
```

Подробнее в инструкциях от DigitalOcean:
- [Базовая установка MySQL](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-16-04)
- [Настройки безопасности](https://www.digitalocean.com/community/tutorials/how-to-secure-mysql-and-mariadb-databases-in-a-linux-vps)

После установки можно также запустить скрипт для проверки основных параметров MySQL. Он запросит данные аккаунта `root` в таблице и выдаст предложения по оптимизации.

```bash
cd && wget http://mysqltuner.pl/ -O mysqltuner.pl
wget https://raw.githubusercontent.com/major/MySQLTuner-perl/master/basic_passwords.txt -O basic_passwords.txt
wget https://raw.githubusercontent.com/major/MySQLTuner-perl/master/vulnerabilities.csv -O vulnerabilities.csv
perl mysqltuner.pl
```

Полученные рекомендации внесём в файл:

```bash
sudo nano /etc/my.cnf
# Или
sudo nano /etc/mysql/my.cnf
```

## Установка Dante Server

Dante - это SOCKS прокси сервер, который может быть использован для предоставления удобного и безопасного доступа к сети. Сервер Dante может взаимодействовать с различными сетевыми приложениями с поддержкой SOCKS, включая популярные мессенджеры и веб-браузеры.

В репозитории Ubuntu доступна только старая версия Dante. Установим новую версию из исходников:

```bash
# Устанавливаем библиотеки libpam, libwrap, компилятор GCC
sudo apt-get install libpam0g libpam0g-dev libc6-dev gcc g++ make 
# Собираем из исходников и устанавливаем Dante
# Последняя версия на момент написания этой инструкции: 1.4.2
cd && wget https://www.inet.no/dante/files/dante-1.4.2.tar.gz
tar -xvf dante-1.4.2.tar.gz
cd dante-1.4.2
./configure
make && sudo make install
# Проверяем версию установленного сервера
sockd -v
```

Далее необходимо выполнить настройку Dante: указать интерфейсы подключения, методы авторизации и другие параметры

```bash
# Просматриваем список сетевых интерфейсов
# Запоминаем тот, рядом с которым указан IP сервера (вероятно, eth0, либо venet0:0 для OpenVZ)
ifconfig
# Открываем файл настроек
sudo nano /etc/sockd.conf
```

Приведём файл настроек Dante в соответствие с указанным ниже (`eth0` - сетевой интерфейс из `ifconfig`)

```
errorlog: /var/log/sockd.errlog
logoutput: /var/log/sockd.log
internal: eth0 port = 1080
external: eth0
socksmethod: username
user.privileged: root
user.unprivileged: nobody

client pass {
  from: 0/0 to: 0/0
  log: error
}

socks pass {
  from: 0/0 to: 0/0
  command: bind connect udpassociate
  log: error # ioop
  socksmethod: username
}

socks pass {
  from: 0/0 to: 0/0
  command: bindreply udpreply
  log: error
}
```

Сохраняем с помощью Ctrl+O, Enter, Ctrl+X и разрешаем подключение к порту прокси-сервера:

```bash
# Разрешаем подключение к прокси по указанному порту
sudo ufw allow 1080/tcp
```

Настройка `socksmethod: username` указывает, что авторизация на прокси-сервере происходит по логину и паролю пользователя Ubuntu Server. Но использовать для этих целей существующие аккаунты `root` и `user` нельзя - пароль для доступа к SOCKS передаётся в незашифрованном виде и может быть перехвачен, а значит, доступ к серверу смогут получить злоумышленники.

Чтобы избежать проблем с безопасностью, создадим отдельного пользователя `socks`, через которого будет проходить авторизация в Dante: 

```bash
# Создаём пользователя для подключения к прокси
sudo adduser --home /bin --shell /usr/sbin/nologin socks
# Запрещаем ему доступ по SSH
echo "DenyUsers socks" | sudo tee -a /etc/ssh/sshd_config
# Перезапускаем SSH
sudo service ssh restart
```

Теперь нужно создать скрипт автозапуска Dante

```
# Открываем скрипт автозапуска в текстовом редакторе
sudo nano /etc/init.d/sockd
```

Вставляем в редактор правой кнопкой мыши следующий скрипт:

```bash
#! /bin/sh
### BEGIN INIT INFO
# Provides:          sockd
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: SOCKS (v4 and v5) proxy daemon (sockd)
### END INIT INFO

# dante SOCKS server init.d file. Based on /etc/init.d/skeleton:
# Version:      @(#)skeleton  1.8  03-Mar-1998  miquels@cistron.nl

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
NAME=sockd
DAEMON=/usr/local/sbin/$NAME
DAEMON_ARGS="-D"
PIDFILE=/var/run/$NAME.pid
SCRIPTNAME=/etc/init.d/$NAME
DESC="Dante SOCKS daemon"
CONFFILE=/etc/$NAME.conf

test -f $DAEMON || exit 0

set -e

# This function makes sure that the Dante server can write to the pid-file.
touch_pidfile ()
{
  if [ -r $CONFFILE ]; then
    uid="`sed -n -e 's/[[:space:]]//g' -e 's/#.*//' -e '/^user\.privileged/{s/[^:]*://p;q;}' $CONFFILE`"
    if [ -n "$uid" ]; then
      touch $PIDFILE
      chown $uid $PIDFILE
    fi
  fi
}

case "$1" in
  start)
        if ! egrep -cve '^ *(#|$)' \
            -e '^(logoutput|user\.((not)?privileged|libwrap)):' \
            $CONFFILE > /dev/null
        then
                echo "Not starting $DESC: not configured."
                exit 0
        fi
        echo -n "Starting $DESC: "
        touch_pidfile
        start-stop-daemon --start --quiet --oknodo --pidfile $PIDFILE --exec $DAEMON -- $DAEMON_ARGS
        echo "$NAME."
        ;;
  stop)
        echo -n "Stopping $DESC: "
        start-stop-daemon --stop --quiet --oknodo --pidfile $PIDFILE \
                --exec $DAEMON
        echo "$NAME."
        ;;
  reload|force-reload)
        #
        #       If the daemon can reload its config files on the fly
        #       for example by sending it SIGHUP, do it here.
        #
        #       If the daemon responds to changes in its config file
        #       directly anyway, make this a do-nothing entry.
        #
         echo "Reloading $DESC configuration files."
         start-stop-daemon --stop --signal 1 --quiet --pidfile \
                $PIDFILE --exec $DAEMON -- -D
  ;;
  restart)
        #
        #       If the "reload" option is implemented, move the "force-reload"
        #       option to the "reload" entry above. If not, "force-reload" is
        #       just the same as "restart".
        #
        echo -n "Restarting $DESC: "
        start-stop-daemon --stop --quiet --pidfile $PIDFILE --exec $DAEMON
        sleep 1
        touch_pidfile
        start-stop-daemon --start --quiet --pidfile $PIDFILE \
          --exec $DAEMON -- -D
        echo "$NAME."
        ;;
  *)
        N=/etc/init.d/$NAME
        # echo "Usage: $N {start|stop|restart|reload|force-reload}" >&2
        echo "Usage: $N {start|stop|restart|force-reload}" >&2
        exit 1
        ;;
esac

exit 0
```

Сохраняем (Ctrl+O, Enter, Ctrl+X), затем регистрируем и запускаем сервис

```bash
# Устанавливаем права на запуск
sudo chmod +x /etc/init.d/sockd
# Регистрируем сервис в системе
sudo update-rc.d sockd enable
# Запускаем сервис
sudo systemctl start sockd
```

## Настройка MySQL для Dante

Авторизация с помощью аккаунтов пользователей Linux не очень удобна, когда хочется завести несколько пользователей. Альтернативный вариант - создать базу данных пользователей MySQL, в которую можно будет добавлять пользователей через веб-интерфейс.

Как и в случае с Dante, в репозиториях доступна устаревшая версия модуля авторизации pam-mysql. Однако на Github существует [форк](https://github.com/NigelCunningham/pam-MySQL), который мы также соберём из исходников:

```bash
# Устанавливаем необходимые инструменты
sudo apt-get install libpam0g libpam0g-dev libc6-dev gcc g++ make autoconf libtool unzip pkg-config libmysqlclient-dev libssl-dev
# Собираем и устанавливаем последнюю версию libpam-mysql
cd && wget -O libpam.zip https://github.com/NigelCunningham/pam-MySQL/archive/master.zip
unzip libpam.zip
cd pam-MySQL-master/
autoreconf -f -i
./configure
make && sudo make install
# Запоминаем путь, по которому установили библиотеку (вероятно, /lib/security)
# Создадим файл настроек libpam-mysql
sudo nano /etc/pam_mysql.conf
```

Скопируем в файл настроек следующее содержимое:

```
users.host=localhost
users.database=users_db
users.db_user=pam_mysql
users.db_passwd=тут_указываем_пароль
users.table=users
users.user_column=login
users.password_column=pass
users.password_crypt=mysql
users.status_column=status
verbose=0
```

Сохраняем настройки и заводим таблицу с указанными данными:

```bash
# Запускаем СУБД
mysql -u root -p
# Создаём пользователя с указанным паролем
CREATE USER 'pam_mysql'@'localhost' IDENTIFIED BY 'тут_указываем_пароль';
# Проверяем таблицу пользователей
SELECT User,Host,authentication_string FROM mysql.user;
# Создаём новую БД
CREATE DATABASE users_db;
# Даём пользователю полный доступ к созданной БД
GRANT ALL ON users_db.* TO 'pam_mysql'@'localhost';
FLUSH PRIVILEGES;
# Проверяем права
SHOW GRANTS FOR 'pam_mysql'@'localhost';
# Переключаемся на новую базу данных
USE users_db;
# Создаём таблицу с аккаунтами
CREATE TABLE `users` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `login` VARCHAR(20) NOT NULL UNIQUE KEY, `pass` TEXT NOT NULL, `status` TINYINT(1) UNSIGNED NOT NULL DEFAULT 0);
# Добавляем пользователя
INSERT INTO users (login, pass) VALUES('testuser', PASSWORD('testpass'));
# Выходим из СУБД
exit
```

Теперь нужно настроить PAM для sockd. Откроем файл настроек:

```bash
sudo nano /etc/pam.d/sockd
```

Вставляем туда правила для unix-аккаунтов и MySQL аккаунтов

```bash
# Путь к библиотеке /lib/security/pam_mysql.so - в соответствии с выводом make install
# auth     sufficient  pam_unix.so
auth     required    /lib/security/pam_mysql.so config_file=/etc/pam_mysql.conf

# account  sufficient  pam_unix.so
account  required    /lib/security/pam_mysql.so config_file=/etc/pam_mysql.conf
```

Сохраняем параметры PAM для sockd, и, наконец, включаем в Dante PAM-авторизацию

```bash
# Останавливаем сервер Dante
sudo systemctl stop sockd
# Открываем файл настроек Dante
sudo nano /etc/sockd.conf
```

Заменяем в нём `socksmethod: username` на `socksmethod: pam.username`, сохраняем и запускаем сервер

```bash
sudo systemctl start sockd
```

Проверяем авторизацию с помощью учётной записи, которую мы ранее добавили в таблицу.

P.S. Теперь можем удалить аккаунт `socks`, через который раньше происходила авторизация

```bash
sudo userdel socks
```

## Установка Nginx

```bash
sudo apt-get install nginx
sudo ufw app list
sudo ufw allow 'Nginx Full' # Или 'Nginx HTTP', если не хотим SSL
sudo apt-get install php-fpm php-mysql
```

Дальше по инструкции [DigitalOcean](#)

## Установка VSFTPD

:::danger
// TODO: Дальше пока не написано, будет чуть позже :smile: 
:::

https://www.digitalocean.com/community/tutorials/how-to-use-sftp-to-securely-transfer-files-with-a-remote-server

https://www.digitalocean.com/community/tutorials/how-to-protect-ssh-with-fail2ban-on-ubuntu-14-04

https://www.digitalocean.com/community/tutorials/how-to-configure-a-linux-service-to-start-automatically-after-a-crash-or-reboot-part-1-practical-examples
