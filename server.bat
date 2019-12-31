@echo off
title ReqLog App Server Manager

:start
cls
echo %date% %time%
echo Membutuhkan: nodejs dan forever
echo Pastikan mysql sudah berjalan
echo -
echo 1. Start Server
echo 2. Show Active Server
echo 3. Stop All Active Server
echo -
echo v. Cek Versi nodejs, npm, forever
echo -
echo x. Keluar
echo -
set /p "opsi= Ketik pilihan: "

if %opsi%==1 goto startserver
if %opsi%==2 goto showserver
if %opsi%==3 goto stopserver
if %opsi%==v goto cekversi
if %opsi%==x exit

:startserver (
    call npm run start-prod
    echo Server started
    goto end
)

:showserver (
    call forever list
    echo Ketik index server untuk menghentikan proses
    echo misal: 0
    echo Ketik b untuk kembali ke menu
    set /p "uid= Ketik pilihan: "
    if %uid%==b ( goto :start ) else (
        call forever stop %uid%
        echo Server %uid% Stopped
        goto end
    )
)

:stopserver (
    call forever stopall
    echo All Server Stopped
    goto end
)

:cekversi (
    echo Versi nodejs
    node -v
    echo Versi npm
    call npm --version
    echo Versi forever
    call forever --version
    goto end
)

:end (
    echo -
    echo Tekan Enter untuk memilih menu lain
    echo -
    pause
    goto start
)