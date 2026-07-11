@echo off
setlocal
set COREPACK_EXE=D:\corepack
if exist "%COREPACK_EXE%" (
  "%COREPACK_EXE%" pnpm %*
) else (
  echo pnpm launcher not found >&2
  exit /b 1
)
