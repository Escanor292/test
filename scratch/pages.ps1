param([string[]]$Paths)
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try { $word.DisplayAlerts = 0 } catch {}
foreach ($p in $Paths) {
    $full = (Resolve-Path $p).Path
    try {
        $doc = $word.Documents.Open($full)
        try { $doc.Fields.Update() } catch { }
        $n = $doc.TablesOfContents.Count
        if ($n -gt 0) { for ($i = 1; $i -le $n; $i++) { try { $doc.TablesOfContents.Item($i).Update() } catch {} } }
        $doc.Repaginate()
        Write-Output ("RESULT " + [System.IO.Path]::GetFileName($p) + " PAGES=" + $doc.ComputeStatistics(2))
        $doc.Close([ref]0)
    } catch {
        Write-Output ("RESULT " + [System.IO.Path]::GetFileName($p) + " FAIL=" + $_.Exception.Message)
    }
}
try { $word.Quit() } catch {}
