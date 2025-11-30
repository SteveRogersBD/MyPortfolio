@echo off
REM Quick Git Commit Script
REM Usage: commit.bat "your commit message"

if "%~1"=="" (
    echo Error: Please provide a commit message
    echo Usage: commit.bat "your commit message"
    exit /b 1
)

echo Adding all changes...
git add .

echo Committing with message: %~1
git commit -m "%~1"

echo Pushing to remote...
git push

echo.
echo Done! All changes have been committed and pushed.
