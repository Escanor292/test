$ErrorActionPreference = "Stop"
$root = (Get-Location).Path
$folder = Get-ChildItem -Directory | Where-Object { $_.Name -like "23CT113*" } | Select-Object -First 1
$wordDir = Get-ChildItem -Path $folder.FullName -Directory | Where-Object { $_.Name -like "*Word+ppt*" } | Select-Object -First 1
$src = Join-Path $root "scratch\_final.docx"
$pdf = Join-Path $wordDir.FullName "Nhom02_Final_Report_Software_Testing.pdf"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open($src, $false, $false)
try { Write-Output ("TOC_COUNT=" + $doc.TablesOfContents.Count); foreach ($t in $doc.TablesOfContents) { $t.Update() }; Write-Output "TOC_UPDATED" } catch { Write-Output ("TOC_ERR=" + $_.Exception.Message) }
try { $doc.Fields.Update() | Out-Null; Write-Output "FIELDS_UPDATED" } catch { Write-Output ("FIELD_ERR=" + $_.Exception.Message) }
$pages = $doc.ComputeStatistics(2)
$doc.Save()
Write-Output ("PAGES=" + $pages)
$doc.SaveAs($pdf, 17)
$doc.Close($false)
$word.Quit()
Write-Output "DONE"
