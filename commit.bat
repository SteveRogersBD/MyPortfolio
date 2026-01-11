@echo off
setlocal
REM Quick Git Commit Script
REM Usage: commit.bat "your commit message" (or just run it and type the message)

set "msg=%~1"

if "%msg%"=="" (
    set /p "msg=Enter commit message: "
)

if "%msg%"=="" (
    echo Error: Commit message cannot be empty.
    exit /b 1
)

echo.
echo Adding all changes...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo Error adding files.
    exit /b %ERRORLEVEL%
)

echo.
echo Committing with message: "%msg%"
git commit -m "%msg%"
if %ERRORLEVEL% NEQ 0 (
    echo Error committing files.
    exit /b %ERRORLEVEL%
)

echo.
echo Pushing to remote...
git push
if %ERRORLEVEL% NEQ 0 (
    echo Error pushing to remote.
    exit /b %ERRORLEVEL%
)

echo.
echo ============================================
echo DONE! All changes have been committed and pushed.
echo ============================================
pause
