# PowerShell script to migrate from RGB to OKLCH format
# This script replaces rgb(var(--*)) with var(--*)

$files = Get-ChildItem -Path "src" -Include "*.jsx","*.js" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace rgb(var(--variable)) with var(--variable)
    $newContent = $content -replace 'rgb\(var\((--[a-z-]+)\)\)', 'var($1)'
    
    if ($content -ne $newContent) {
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "`nMigration complete!"
