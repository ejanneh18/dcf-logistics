# DCF Logistics - Deployment Package Creator
# This script creates a deployment-ready ZIP file for GoDaddy hosting

Write-Host "🚀 Creating DCF Logistics Deployment Package..." -ForegroundColor Green

# Check if out directory exists
if (-not (Test-Path "out")) {
    Write-Host "❌ Error: 'out' directory not found. Please run 'npm run build' first." -ForegroundColor Red
    exit 1
}

# Create deployment directory
$deployDir = "dcf-logistics-deployment"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

Write-Host "📁 Copying files to deployment directory..." -ForegroundColor Yellow

# Copy all files from out directory
Copy-Item "out\*" -Destination $deployDir -Recurse

# Copy deployment guide
Copy-Item "DEPLOYMENT-GUIDE.md" -Destination $deployDir

# Create additional helpful files
$readmeContent = @"
DCF Logistics - Static Website Deployment

Quick Start:
1. Upload all files to your web hosting public_html directory
2. Ensure .htaccess file is included for proper routing
3. Test the website by visiting your domain

Files Included:
- All HTML pages and assets
- .htaccess configuration for Apache servers
- DEPLOYMENT-GUIDE.md with detailed instructions

Support:
For deployment assistance, refer to DEPLOYMENT-GUIDE.md

Generated on: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
"@

$readmeContent | Out-File -FilePath "$deployDir\README.txt" -Encoding UTF8

# Create a simple index file for verification
$verificationContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>DCF Logistics - Deployment Verification</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .success { color: green; }
        .info { color: blue; }
    </style>
</head>
<body>
    <h1 class="success">✅ DCF Logistics Website Deployed Successfully!</h1>
    <p class="info">This verification page confirms your static website is working.</p>
    <p><strong>Deployment Date:</strong> $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")</p>
    <p><a href="index.html">Go to Main Website</a></p>
</body>
</html>
"@

$verificationContent | Out-File -FilePath "$deployDir\deployment-verification.html" -Encoding UTF8

Write-Host "📦 Creating ZIP package..." -ForegroundColor Yellow

# Create ZIP file
$zipPath = "dcf-logistics-static-website.zip"
if (Test-Path $zipPath) {
    Remove-Item $zipPath
}

# Use PowerShell 5.0+ compression
Compress-Archive -Path "$deployDir\*" -DestinationPath $zipPath

# Clean up temporary directory
Remove-Item $deployDir -Recurse -Force

Write-Host "✅ Deployment package created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Package Details:" -ForegroundColor Cyan
Write-Host "   File: $zipPath"
Write-Host "   Size: $((Get-Item $zipPath).Length / 1MB | ForEach-Object { '{0:N2}' -f $_ }) MB"
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Extract $zipPath"
Write-Host "   2. Upload all files to your GoDaddy public_html directory"
Write-Host "   3. Follow the DEPLOYMENT-GUIDE.md for detailed instructions"
Write-Host ""
Write-Host "🌐 Your static website is ready for deployment!" -ForegroundColor Green
