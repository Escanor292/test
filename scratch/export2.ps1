
$ErrorActionPreference = "Continue"
$dir = Join-Path (Get-Location) "23CT113_Nhom02_NenTangCrowdfunding(TuTeFund)\Word+ppt Báo Cáo"
$src = (Resolve-Path "scratch/_final.docx").Path
$pdf = Join-Path $dir "Nhom02_Final_Report_Software_Testing.pdf"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try { $word.DisplayAlerts = 0 } catch {}
try {
    $doc = $word.Documents.Open($src)
    try { $doc.Fields.Update() | Out-Null } catch { Write-Output ("FIELDS_FAIL " + $_.Exception.Message) }
    $n = $doc.TablesOfContents.Count
    Write-Output ("TOC_COUNT=" + $n)
    if ($n -gt 0) { for ($i = 1; $i -le $n; $i++) { try { $doc.TablesOfContents.Item($i).Update() } catch {} } }
    $doc.Repaginate()
    Write-Output ("PAGES=" + $doc.ComputeStatistics(2))
    try { $doc.Save() } catch { Write-Output ("SAVE_FAIL " + $_.Exception.Message) }
    if (Test-Path $pdf) { Remove-Item $pdf -Force -ErrorAction SilentlyContinue }
    try { $doc.SaveAs($pdf, 17); Write-Output "PDF_SAVEAS_OK" }
    catch {
        Write-Output ("SAVEAS_FAIL " + $_.Exception.Message)
        try { $doc.ExportAsFixedFormat($pdf, 17); Write-Output "PDF_EXPORT_OK" }
        catch { Write-Output ("EXPORT_FAIL " + $_.Exception.Message) }
    }
    $doc.Close([ref]0)
} catch { Write-Output ("OPEN_FAIL " + $_.Exception.Message) }
try { $word.Quit() } catch {}
