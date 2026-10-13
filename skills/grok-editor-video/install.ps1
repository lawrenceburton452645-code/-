param([string]$BaseUrl = 'https://046616.xyz/editor-grok')

$ErrorActionPreference = 'Stop'
if ($BaseUrl -notmatch '^https://[^/]+(?:/[^?#]*)?$') {
    throw 'BaseUrl must be an HTTPS URL.'
}
$folder = Join-Path $env:APPDATA 'GrokEditor'
New-Item -ItemType Directory -Force -Path $folder | Out-Null
$skillFolder = Join-Path $env:USERPROFILE '.codex\skills\grok-editor-video'
New-Item -ItemType Directory -Force -Path $skillFolder | Out-Null
foreach ($name in @('SKILL.md', 'grok-video.ps1', 'install.ps1')) {
    $source = Join-Path $PSScriptRoot $name
    $destination = Join-Path $skillFolder $name
    if ([IO.Path]::GetFullPath($source) -ne [IO.Path]::GetFullPath($destination)) {
        Copy-Item -LiteralPath $source -Destination $destination -Force
    }
}
$token = Read-Host 'Paste the editor-only token' -AsSecureString
$token | ConvertFrom-SecureString | Set-Content -Path (Join-Path $folder 'token.dat') -Encoding ASCII
@{ base_url = $BaseUrl.TrimEnd('/') } | ConvertTo-Json | Set-Content -Path (Join-Path $folder 'config.json') -Encoding UTF8
Write-Host 'Grok editor video skill installed for this Windows user. Restart Codex to discover it.'
