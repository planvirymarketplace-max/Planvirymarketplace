@echo off
setlocal
set NODE_EXE=D:\node.exe
set NPM_CLI=D:\Reach New\node_modules\npm\bin\npm-cli.js
if exist "%NPM_CLI%" (
  "%NODE_EXE%" "%NPM_CLI%" %*
) else (
  echo npm launcher not found >&2
  exit /b 1
)
