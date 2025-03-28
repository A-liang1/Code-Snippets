# 简单构建脚本

# 设置输出目录
$outputDir = "portable-dist"

# 清理旧目录
if (Test-Path $outputDir) {
  Remove-Item -Path $outputDir -Recurse -Force
}

# 创建目录结构
New-Item -Path $outputDir -ItemType Directory
New-Item -Path "$outputDir\node_modules" -ItemType Directory
New-Item -Path "$outputDir\node_modules\better-sqlite3" -ItemType Directory
New-Item -Path "$outputDir\node_modules\mockjs" -ItemType Directory
New-Item -Path "$outputDir\node_modules\@electron-toolkit" -ItemType Directory
New-Item -Path "$outputDir\node_modules\@electron-toolkit\utils" -ItemType Directory
New-Item -Path "$outputDir\node_modules\@electron-toolkit\preload" -ItemType Directory

# 构建应用
npm run build

# 复制文件
Copy-Item -Path "out" -Destination $outputDir -Recurse
Copy-Item -Path "package.json" -Destination $outputDir
Copy-Item -Path "node_modules\electron\dist\*" -Destination $outputDir -Recurse
Copy-Item -Path "node_modules\better-sqlite3\*" -Destination "$outputDir\node_modules\better-sqlite3" -Recurse
Copy-Item -Path "node_modules\mockjs\*" -Destination "$outputDir\node_modules\mockjs" -Recurse
Copy-Item -Path "node_modules\@electron-toolkit\utils\*" -Destination "$outputDir\node_modules\@electron-toolkit\utils" -Recurse
Copy-Item -Path "node_modules\@electron-toolkit\preload\*" -Destination "$outputDir\node_modules\@electron-toolkit\preload" -Recurse

# 创建启动脚本
Set-Content -Path "$outputDir\start.bat" -Value "@echo off`r`nelectron.exe ."

Write-Host "构建完成! 应用已打包到 $outputDir 文件夹中。" -ForegroundColor Green
