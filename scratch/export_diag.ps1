$ErrorActionPreference = "Continue"
$dir = Join-Path (Get-Location) "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)\Word+ppt Báo Cáo"
$docx = Join-Path $dir "Báo Cáo Word_23CT113_Nhom02.docx"
$pdf  = Join-Path $dir "Nhom02_Final_Report_Software_Testing.pdf"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try { $word.DisplayAlerts = 0 } catch { Write-Output "DISPLAYALERTS_FAIL: $($_.Exception.Message)" }

try {
    $doc = $word.Documents.Open($docx)
    Write-Output "STEP open ok"
} catch {
    Write-Output "STEP open FAIL: $($_.Exception.Message)"
    try { $word.Quit() } catch {}
    exit 1
}

try { Write-Output "STEP fields=$($doc.Fields.Count) toc=$($doc.TablesOfContents.Count)" } catch { Write-Output "STEP count FAIL: $($_.Exception.Message)" }

try {
    $doc.Fields.Update()
    Write-Output "STEP fieldupdate ok"
} catch { Write-Output "STEP fieldupdate FAIL: $($_.Exception.Message)" }

try {
    $n = $doc.TablesOfContents.Count
    if ($n -gt 0) { for ($i=1; $i -le $n; $i++) { $doc.TablesOfContents.Item($i).Update() } ; Write-Output "STEP tocupdate ok n=$n" }
    else { Write-Output "STEP tocupdate skip (no TOC object)" }
} catch { Write-Output "STEP tocupdate FAIL: $($_.Exception.Message)" }

try {
    $doc.Repaginate()
    Write-Output "STEP pages=$($doc.ComputeStatistics(2))"
} catch { Write-Output "STEP paginate FAIL: $($_.Exception.Message)" }

try {
    $doc.Save()
    Write-Output "STEP save ok"
} catch { Write-Output "STEP save FAIL: $($_.Exception.Message)" }

try {
    if (Test-Path $pdf) { Remove-Item $pdf -Force }
    $doc.SaveAs([ref]$pdf, [ref]17)
    Write-Output "STEP pdf ok -> $pdf"
} catch { Write-Output "STEP pdf FAIL: $($_.Exception.Message)" }

try { $doc.Close([ref]0) } catch { Write-Output "STEP close FAIL: $($_.Exception.Message)" }
try { $word.Quit() } catch { Write-Output "STEP quit FAIL: $($_.Exception.Message)" }
Write-Output "END"
