# Tira screenshots headless das páginas da docs (?theme= controla o tema via layout).
# Uso: powershell -File scripts\_shots.ps1
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$out = 'C:\Users\samue\AppData\Local\Temp\opencode\shots'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$prof = Join-Path $out ("edgeprofile-{0}" -f (Get-Date -Format 'HHmmss'))
New-Item -ItemType Directory -Force -Path $prof | Out-Null

$shots = @(
  @{ name = 'home';       url = 'http://localhost:3000/' }
  @{ name = 'person';     url = 'http://localhost:3000/docs/api/person/' }
  @{ name = 'cheatsheet'; url = 'http://localhost:3000/docs/cheatsheet/' }
  @{ name = 'examples';   url = 'http://localhost:3000/docs/examples/' }
  @{ name = 'faker';      url = 'http://localhost:3000/docs/api/faker/' }
  @{ name = '404';        url = 'http://localhost:3000/naoexiste/' }
)

foreach ($s in $shots) {
  foreach ($theme in @('dark', 'light')) {
    $sep = if ($s.url.EndsWith('?')) { '' } elseif ($s.url.Contains('?')) { '&' } else { '?' }
    $u = "$($s.url)${sep}theme=$theme"
    $full = Join-Path $out "$($s.name)-$theme.png"
    & $edge --headless=new --disable-gpu --hide-scrollbars --disable-features=msEdgeHorizontalScrollModes `
      --user-data-dir="$prof" --screenshot="$full" --window-size=1360,940 `
      --virtual-time-budget=9000 $u 2>$null | Out-Null
    if (Test-Path $full) { "$($s.name)/$theme ok" } else { "$($s.name)/$theme FALHOU" }
  }
}
