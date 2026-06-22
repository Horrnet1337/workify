@echo off
cd /d "%~dp0"

if exist ".tools\node-v22.16.0-win-x64\node.exe" (
  set "PATH=%~dp0.tools\node-v22.16.0-win-x64;%PATH%"
)

set PORT=3002
echo Workify -^> http://localhost:%PORT%
node server.js

pause
