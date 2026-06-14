# Creates workify-deploy.zip (without node_modules, .tools, .git)
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$out  = Join-Path $root "workify-deploy.zip"

if (Test-Path $out) { Remove-Item $out -Force }

$skipPrefix = @('node_modules\', '.tools\', '.git\', 'scripts\')

$files = Get-ChildItem -Path $root -Recurse -File | Where-Object {
    $rel = $_.FullName.Substring($root.Length + 1).Replace('/', '\')
    if ($rel -eq 'workify-deploy.zip' -or $rel -eq 'workify.zip') { return $false }
    foreach ($p in $skipPrefix) {
        if ($rel.StartsWith($p)) { return $false }
    }
    return $true
}

$temp = Join-Path $env:TEMP "workify-deploy-$(Get-Random)"
New-Item -ItemType Directory -Path $temp -Force | Out-Null

foreach ($f in $files) {
    $rel = $f.FullName.Substring($root.Length + 1)
    $dest = Join-Path $temp $rel
    $destDir = Split-Path $dest -Parent
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Copy-Item $f.FullName $dest
}

Compress-Archive -Path (Join-Path $temp '*') -DestinationPath $out -Force
Remove-Item $temp -Recurse -Force

$sizeMB = [math]::Round((Get-Item $out).Length / 1MB, 2)
Write-Host "Created: $out ($sizeMB MB)"
