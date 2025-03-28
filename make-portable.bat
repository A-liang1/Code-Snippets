@echo off
echo Building portable version...

set DIST=portable-dist

rem Clean old directory
if exist %DIST% rmdir /S /Q %DIST%

rem Create directories
mkdir %DIST%
mkdir %DIST%\node_modules
mkdir %DIST%\node_modules\better-sqlite3
mkdir %DIST%\node_modules\mockjs
mkdir %DIST%\node_modules\@electron-toolkit
mkdir %DIST%\node_modules\@electron-toolkit\utils
mkdir %DIST%\node_modules\@electron-toolkit\preload

rem Build app
call npm run build

rem Copy files
xcopy /E /Y out %DIST%\out\
copy package.json %DIST%\
xcopy /E /Y node_modules\electron\dist\* %DIST%\
xcopy /E /Y node_modules\better-sqlite3\* %DIST%\node_modules\better-sqlite3\
xcopy /E /Y node_modules\mockjs\* %DIST%\node_modules\mockjs\
xcopy /E /Y node_modules\@electron-toolkit\utils\* %DIST%\node_modules\@electron-toolkit\utils\
xcopy /E /Y node_modules\@electron-toolkit\preload\* %DIST%\node_modules\@electron-toolkit\preload\

rem Create start script
echo @echo off > %DIST%\start.bat
echo electron.exe . >> %DIST%\start.bat

echo Build completed! Application is in %DIST% folder.
pause
