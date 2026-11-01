$ErrorActionPreference = "Stop"
$root = (Get-Location).Path
$folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "23CT113*" } | Select-Object -First 1
$pptDir = Get-ChildItem -Path $folder.FullName -Directory | Where-Object { $_.Name -like "*Word+ppt*" } | Select-Object -First 1
$ppt = Join-Path $pptDir.FullName "Nhom02_Final_Presentation.pptx"
$out = Join-Path $root "scratch\ppt_png"
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Path $out | Out-Null }
Get-ChildItem $out -File -ErrorAction SilentlyContinue | Remove-Item -Force
$app = New-Object -ComObject PowerPoint.Application
$pres = $app.Presentations.Open($ppt, $true, $false, $false)
$pres.Export($out, "PNG", 1600, 900)
$pres.Close()
$app.Quit()
Write-Output "EXPORTED"
Get-ChildItem $out -File | ForEach-Object { Write-Output $_.Name }
