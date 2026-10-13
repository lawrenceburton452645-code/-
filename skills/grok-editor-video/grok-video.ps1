param(
    [string[]]$Images,
    [string]$PromptFile,
    [ValidateRange(1, 15)][int]$Duration = 10,
    [ValidateSet('auto', 'single', 'reference')][string]$Mode = 'auto',
    [string]$Output,
    [string]$ResumeJobId
)

$ErrorActionPreference = 'Stop'
$folder = Join-Path $env:APPDATA 'GrokEditor'
$config = Get-Content -Raw (Join-Path $folder 'config.json') | ConvertFrom-Json
$secure = Get-Content -Raw (Join-Path $folder 'token.dat') | ConvertTo-SecureString
$ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
try {
    $token = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
}
$headers = @{ Authorization = "Bearer $token" }
$base = $config.base_url.TrimEnd('/')

if ($ResumeJobId) {
    if ($ResumeJobId -notmatch '^[0-9a-f]{32}$') { throw 'Invalid job ID.' }
    $jobId = $ResumeJobId
} else {
    if (-not $Images -or $Images.Count -lt 1 -or $Images.Count -gt 7) { throw 'Provide 1–7 images.' }
    if (-not $PromptFile -or -not (Test-Path -LiteralPath $PromptFile -PathType Leaf)) { throw 'PromptFile is required.' }
    $prompt = [IO.File]::ReadAllText((Resolve-Path -LiteralPath $PromptFile).Path, [Text.Encoding]::UTF8).Trim()
    if ($prompt.Length -lt 1 -or $prompt.Length -gt 4096) { throw 'Prompt must contain 1–4096 characters.' }
    $encoded = @()
    $totalBytes = 0
    foreach ($path in $Images) {
        if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Image not found: $path" }
        $bytes = [IO.File]::ReadAllBytes((Resolve-Path -LiteralPath $path).Path)
        if ($bytes.Length -lt 1 -or $bytes.Length -gt 5MB) { throw "Image exceeds 5 MB: $path" }
        $totalBytes += $bytes.Length
        $encoded += [Convert]::ToBase64String($bytes)
    }
    if ($totalBytes -gt 12MB) { throw 'Images exceed 12 MB total.' }
    if ($Mode -eq 'auto') {
        if ($Images.Count -eq 1) { $Mode = 'single' } else { $Mode = 'reference' }
    }
    if ($Mode -eq 'single' -and $Images.Count -ne 1) { throw 'Single-image mode requires exactly one image.' }
    $estimate = [Math]::Round((0.14 * $Duration + 0.01 * $Images.Count) * 1.2, 2)
    Write-Host "Submitting one Grok video request: $Mode mode, $Duration seconds, $($Images.Count) image(s), estimated budget reservation USD $estimate."
    $body = @{ duration = $Duration; mode = $Mode; prompt = $prompt; images = $encoded } | ConvertTo-Json -Depth 4 -Compress
    $response = Invoke-RestMethod -Method Post -Uri "$base/v1/jobs" -Headers $headers -ContentType 'application/json; charset=utf-8' -Body $body -TimeoutSec 120
    $jobId = $response.job_id
    Write-Host "Job ID: $jobId"
}

$deadline = (Get-Date).AddMinutes(22)
while ((Get-Date) -lt $deadline) {
    $job = Invoke-RestMethod -Method Get -Uri "$base/v1/jobs/$jobId" -Headers $headers -TimeoutSec 45
    if ($job.status -eq 'done') {
        if (-not $Output) { $Output = Join-Path (Get-Location) "grok-$jobId.mp4" }
        Invoke-WebRequest -Method Get -Uri "$base/v1/jobs/$jobId/download" -Headers $headers -OutFile $Output -TimeoutSec 300
        Write-Host "Saved: $Output"
        Write-Host "Provider request ID: $($job.request_id); reported cost USD: $($job.cost_usd)"
        exit 0
    }
    if ($job.status -in @('failed', 'needs_review')) {
        throw "Job $jobId stopped at $($job.status): $($job.error). Do not resubmit automatically."
    }
    Start-Sleep -Seconds 8
}
throw "Job $jobId is still pending. Run with -ResumeJobId $jobId; do not submit again."
