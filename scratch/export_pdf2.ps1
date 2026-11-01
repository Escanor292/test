$ErrorActionPreference = "Stop"
$root = (Get-Location).Path
$folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "23CT113*" } | Select-Object -First 1
$wordDir = Get-ChildItem -Path $folder.FullName -Directory | Where-Object { $_.Name -like "*Word+ppt*" } | Select-Object -First 1
$src = Join-Path $root "scratch\_final.docx"
$pdf = Join-Path $wordDir.FullName "Nhom02_Final_Report_Software_Testing.pdf"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open($src, $false, $false)
$doc.Fields.Update() | Out-Null
if ($doc.TablesOfContents.Count -gt 0) { $doc.TablesOfContents.Item(1).Update() | Out-Null }
$pages = $doc.ComputeStatistics(2)
$doc.SaveAs($pdf, 17)
$doc.Close($false)
$word.Quit()
Write-Output "PAGES=$pages"
Write-Output "PDF_SAVEAS_OK"
