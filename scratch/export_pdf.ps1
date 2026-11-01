$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
    $item = Get-ChildItem -Path "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)" -Filter "*Word_23CT113_Nhom02.docx" -Recurse | Select-Object -First 1
    if (-not $item) {
        Write-Error "Could not find docx file!"
        exit 1
    }
    $wordPath = $item.FullName
    $pdfPath = [System.IO.Path]::Combine($item.DirectoryName, "Nhom02_Final_Report_Software_Testing.pdf")
    Write-Host "Opening: $wordPath"
    $doc = $word.Documents.Open($wordPath)
    Write-Host "Exporting to: $pdfPath"
    $doc.SaveAs([ref]$pdfPath, [ref]17)
    $doc.Close([ref]0)
    Write-Host "Export complete!"
} finally {
    $word.Quit()
}
