/**
 * DCF Logistics Installation Wizard JavaScript
 * Handles the step-by-step installation process
 */

let currentStep = 1;
const totalSteps = 5;
let installationData = {};

// Initialize the installer
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
    setupEventListeners();
});

function setupEventListeners() {
    // Database type change handler
    document.getElementById('databaseType').addEventListener('change', toggleDatabaseFields);
    
    // Email provider change handler
    document.getElementById('emailProvider').addEventListener('change', toggleEmailFields);
    
    // Password confirmation validation
    document.getElementById('adminPasswordConfirm').addEventListener('input', validatePasswordMatch);
    
    // Form validation on input
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('input', validateCurrentStep);
    });
}

function toggleDatabaseFields() {
    const dbType = document.getElementById('databaseType').value;
    const externalFields = document.getElementById('externalDbFields');
    
    if (dbType === 'sqlite') {
        externalFields.style.display = 'none';
    } else {
        externalFields.style.display = 'block';
        
        // Set default ports
        const portField = document.getElementById('dbPort');
        if (dbType === 'mysql') {
            portField.value = '3306';
        } else if (dbType === 'postgresql') {
            portField.value = '5432';
        }
    }
}

function toggleEmailFields() {
    const provider = document.getElementById('emailProvider').value;
    const sendgridFields = document.getElementById('sendgridFields');
    const smtpFields = document.getElementById('smtpFields');
    
    sendgridFields.style.display = 'none';
    smtpFields.style.display = 'none';
    
    if (provider === 'sendgrid') {
        sendgridFields.style.display = 'block';
    } else if (provider === 'smtp') {
        smtpFields.style.display = 'block';
    }
}

function validatePasswordMatch() {
    const password = document.getElementById('adminPassword').value;
    const confirm = document.getElementById('adminPasswordConfirm').value;
    const confirmField = document.getElementById('adminPasswordConfirm');
    
    if (confirm && password !== confirm) {
        confirmField.style.borderColor = '#dc3545';
        confirmField.setCustomValidity('Passwords do not match');
    } else {
        confirmField.style.borderColor = '#28a745';
        confirmField.setCustomValidity('');
    }
}

function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required]');
    let isValid = true;
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });
    
    // Special validation for step 4 (password confirmation)
    if (currentStep === 4) {
        const password = document.getElementById('adminPassword').value;
        const confirm = document.getElementById('adminPasswordConfirm').value;
        
        if (password.length < 8) {
            isValid = false;
        }
        
        if (password !== confirm) {
            isValid = false;
        }
    }
    
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = !isValid;
    
    return isValid;
}

function updateProgress() {
    const progressPercent = (currentStep / totalSteps) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
}

function showStep(stepNumber) {
    // Hide all steps
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => step.classList.remove('active'));
    
    // Show current step
    const currentStepElement = document.getElementById(`step${stepNumber}`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const navButtons = document.getElementById('navigationButtons');
    
    if (stepNumber === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    
    if (stepNumber === totalSteps) {
        nextBtn.textContent = 'Install';
        nextBtn.className = 'btn btn-primary';
    } else {
        nextBtn.textContent = 'Next';
        nextBtn.className = 'btn btn-primary';
    }
    
    // Hide navigation for loading and success steps
    if (stepNumber > totalSteps) {
        navButtons.style.display = 'none';
    } else {
        navButtons.style.display = 'flex';
    }
    
    updateProgress();
    validateCurrentStep();
}

function nextStep() {
    if (!validateCurrentStep() && currentStep <= totalSteps) {
        showValidationErrors();
        return;
    }
    
    // Collect data from current step
    collectStepData();
    
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
    } else {
        // Start installation
        startInstallation();
    }
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

function collectStepData() {
    switch (currentStep) {
        case 2: // Database configuration
            installationData.database = {
                type: document.getElementById('databaseType').value,
                host: document.getElementById('dbHost').value || 'localhost',
                port: document.getElementById('dbPort').value || '3306',
                name: document.getElementById('dbName').value || 'dcf_logistics',
                username: document.getElementById('dbUser').value,
                password: document.getElementById('dbPassword').value
            };
            break;
            
        case 3: // Site configuration
            installationData.site = {
                url: document.getElementById('siteUrl').value,
                name: document.getElementById('siteName').value,
                adminEmail: document.getElementById('adminEmail').value
            };
            break;
            
        case 4: // Admin user
            installationData.admin = {
                name: document.getElementById('adminName').value,
                email: document.getElementById('adminUsername').value,
                password: document.getElementById('adminPassword').value
            };
            break;
            
        case 5: // Email configuration
            const emailProvider = document.getElementById('emailProvider').value;
            installationData.email = {
                provider: emailProvider
            };
            
            if (emailProvider === 'sendgrid') {
                installationData.email.sendgridKey = document.getElementById('sendgridKey').value;
            } else if (emailProvider === 'smtp') {
                installationData.email.smtp = {
                    host: document.getElementById('smtpHost').value,
                    port: document.getElementById('smtpPort').value,
                    username: document.getElementById('smtpUser').value,
                    password: document.getElementById('smtpPassword').value
                };
            }
            break;
    }
}

function showValidationErrors() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    const requiredInputs = currentStepElement.querySelectorAll('input[required]');
    
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            input.focus();
        } else {
            input.style.borderColor = '#28a745';
        }
    });
}

async function startInstallation() {
    // Hide current step and show loading
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById('loadingStep').style.display = 'block';
    document.getElementById('navigationButtons').style.display = 'none';
    
    try {
        // Generate secure keys
        installationData.security = {
            authSecret: generateSecureKey(),
            jwtSecret: generateSecureKey()
        };
        
        // Build database URL
        installationData.databaseUrl = buildDatabaseUrl();
        
        // Send installation request
        await performInstallation();
        
        // Show success
        showSuccess();
        
    } catch (error) {
        showError(error.message);
    }
}

function generateSecureKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function buildDatabaseUrl() {
    const db = installationData.database;
    
    if (db.type === 'sqlite') {
        return 'file:./database.sqlite';
    } else if (db.type === 'mysql') {
        return `mysql://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`;
    } else if (db.type === 'postgresql') {
        return `postgresql://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`;
    }
}

async function performInstallation() {
    const steps = [
        { message: 'Creating configuration files...', delay: 1000 },
        { message: 'Setting up database...', delay: 2000 },
        { message: 'Installing dependencies...', delay: 3000 },
        { message: 'Running database migrations...', delay: 2000 },
        { message: 'Creating admin user...', delay: 1000 },
        { message: 'Configuring email service...', delay: 1000 },
        { message: 'Finalizing installation...', delay: 1000 }
    ];
    
    for (const step of steps) {
        document.getElementById('loadingMessage').textContent = step.message;
        await new Promise(resolve => setTimeout(resolve, step.delay));
    }
    
    // Send actual installation request
    const response = await fetch('/api/install', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(installationData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Installation failed');
    }
    
    return await response.json();
}

function showSuccess() {
    document.getElementById('loadingStep').style.display = 'none';
    document.getElementById('successStep').classList.add('active');
}

function showError(message) {
    document.getElementById('loadingStep').style.display = 'none';
    
    // Show error in current step
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.innerHTML = `<strong>Installation Failed:</strong> ${message}`;
    
    const currentStepElement = document.getElementById(`step${currentStep}`);
    currentStepElement.insertBefore(errorDiv, currentStepElement.firstChild);
    currentStepElement.classList.add('active');
    
    document.getElementById('navigationButtons').style.display = 'flex';
}

// Auto-fill site URL based on current location
document.addEventListener('DOMContentLoaded', function() {
    const siteUrlField = document.getElementById('siteUrl');
    if (siteUrlField && !siteUrlField.value) {
        const currentUrl = window.location.origin;
        siteUrlField.value = currentUrl;
    }
    
    // Auto-fill admin email based on site URL
    const adminEmailField = document.getElementById('adminEmail');
    const adminUsernameField = document.getElementById('adminUsername');
    
    if (adminEmailField && !adminEmailField.value) {
        const domain = window.location.hostname;
        adminEmailField.value = `admin@${domain}`;
    }
    
    if (adminUsernameField && !adminUsernameField.value) {
        const domain = window.location.hostname;
        adminUsernameField.value = `admin@${domain}`;
    }
});
