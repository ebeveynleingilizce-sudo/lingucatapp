@echo off
cd /d "%~dp0"
python "%~dp0serve-lingucat.py"
if errorlevel 1 pause
