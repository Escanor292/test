$ErrorActionPreference = "Continue"
$dir = Join-Path (Get-Location) "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)\Word+ppt Báo Cáo"
$src = (Resolve-Path "scratch/_final.docx").Path
$pdf = Join-Path $dir "Nhom02_Final_Report_Software_Testing.pdf"

$word = New-Object -ComObject Word.Application
$word.Visible = $false
try { $word.DisplayAlerts = 0 } catch {}

try {
    $doc = $word.Documents.Open($src)
    $doc.Fields.Update() | Out-Null
    $n = $doc.TablesOfContents.Count
    if ($n -gt 0) { for ($i = 1; $i -le $n; $i++) { try { $doc.TablesOfContents.Item($i).Update() } catch {} } }
    $doc.Repaginate()
    Write-Output ("PAGES=" + $doc.ComputeStatistics(2))
    $doc.Save()
    if (Test-Path $pdf) { Remove-Item $pdf -Force }
    $doc.SaveAs([ref]$pdf, [ref]17)
    Write-Output "PDF_OK"
    $doc.Close([ref]0)
} catch {
    Write-Output ("FAIL: " + $_.Exception.Message)
}
try { $word.Quit() } catch {}
