@echo off
git pull
git add .
if "%1"=="" (
    echo Commit message is required
    exit /b 1
)
git commit -m "%*"
git push