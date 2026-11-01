$ErrorActionPreference = "Stop"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
    $dir = Join-Path (Get-Location) "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)\Word+ppt Báo Cáo"
    $docx = Join-Path $dir "Báo Cáo Word_23CT113_Nhom02.docx"
    Write-Output "OPEN: $docx"
    $doc = $word.Documents.Open($docx)
    $doc.Fields.Update() | Out-Null
    foreach ($toc in $doc.TablesOfContents) { $toc.Update() }
    $doc.Repaginate()
    $doc.Save()
    $pages = $doc.ComputeStatistics(2)
    Write-Output "PAGES=$pages"
    $pdf = Join-Path $dir "Nhom02_Final_Report_Software_Testing.pdf"
    if (Test-Path $pdf) { Remove-Item $pdf -Force }
    $doc.SaveAs([ref]$pdf, [ref]17)
    Write-Output "PDF=$pdf"
    $doc.Close([ref]0)
} finally {
    $word.Quit()
}
