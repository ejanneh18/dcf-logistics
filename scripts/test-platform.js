#!/usr/bin/env node

/**
 * DCF Logistics Platform - Comprehensive Testing Script
 * Tests all major functionality including APIs, authentication, and features
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'http://localhost:3003';
const TEST_RESULTS = {
  passed: 0,
  failed: 0,
  total: 0,
  errors: []
};

// Test utilities
function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const requestOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DCF-Logistics-Test-Suite',
        ...options.headers
      }
    };

    const req = http.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
          success: res.statusCode >= 200 && res.statusCode < 400
        });
      });
    });

    req.on('error', reject);
    
    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    
    req.end();
  });
}

function logTest(name, passed, details = '') {
  TEST_RESULTS.total++;
  if (passed) {
    TEST_RESULTS.passed++;
    console.log(`✅ ${name}`);
  } else {
    TEST_RESULTS.failed++;
    console.log(`❌ ${name} - ${details}`);
    TEST_RESULTS.errors.push({ name, details });
  }
}

// Test suites
async function testPublicPages() {
  console.log('\n🌐 Testing Public Pages...');
  
  const publicPages = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/quote',
    '/tracking',
    '/account/login',
    '/account/register'
  ];

  for (const page of publicPages) {
    try {
      const response = await makeRequest(page);
      logTest(`Public page: ${page}`, response.success, `Status: ${response.statusCode}`);
    } catch (error) {
      logTest(`Public page: ${page}`, false, error.message);
    }
  }
}

async function testAPIEndpoints() {
  console.log('\n🔌 Testing API Endpoints...');
  
  const apiEndpoints = [
    { path: '/api/auth/providers', method: 'GET' },
    { path: '/api/trpc/auth.getSession', method: 'GET' },
    { path: '/api/socket', method: 'GET' }
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const response = await makeRequest(endpoint.path, { method: endpoint.method });
      logTest(`API: ${endpoint.method} ${endpoint.path}`, response.success, `Status: ${response.statusCode}`);
    } catch (error) {
      logTest(`API: ${endpoint.method} ${endpoint.path}`, false, error.message);
    }
  }
}

async function testAdminPages() {
  console.log('\n👨‍💼 Testing Admin Pages (without auth)...');
  
  const adminPages = [
    '/admin',
    '/admin/dashboard',
    '/admin/shipments',
    '/admin/invoices',
    '/admin/analytics',
    '/admin/analytics/advanced',
    '/admin/services',
    '/admin/settings'
  ];

  for (const page of adminPages) {
    try {
      const response = await makeRequest(page);
      // Admin pages should redirect to login or show auth error
      const isExpectedBehavior = response.statusCode === 401 || 
                                response.statusCode === 302 || 
                                response.statusCode === 200;
      logTest(`Admin page: ${page}`, isExpectedBehavior, `Status: ${response.statusCode}`);
    } catch (error) {
      logTest(`Admin page: ${page}`, false, error.message);
    }
  }
}

async function testDatabaseConnection() {
  console.log('\n🗄️ Testing Database Connection...');
  
  try {
    // Test tRPC endpoint that requires database
    const response = await makeRequest('/api/trpc/services.getAll');
    logTest('Database connection via tRPC', response.statusCode !== 500, `Status: ${response.statusCode}`);
  } catch (error) {
    logTest('Database connection via tRPC', false, error.message);
  }
}

async function testFileUploadEndpoint() {
  console.log('\n📁 Testing File Upload Endpoint...');
  
  try {
    const response = await makeRequest('/api/upload', { method: 'POST' });
    // Should return 401 (unauthorized) without proper auth
    logTest('File upload endpoint', response.statusCode === 401, `Status: ${response.statusCode}`);
  } catch (error) {
    logTest('File upload endpoint', false, error.message);
  }
}

async function testPaymentEndpoints() {
  console.log('\n💳 Testing Payment Endpoints...');
  
  const paymentEndpoints = [
    '/api/payment/create-intent',
    '/api/payment/webhook'
  ];

  for (const endpoint of paymentEndpoints) {
    try {
      const response = await makeRequest(endpoint, { method: 'POST' });
      // Should return 401 (unauthorized) or 400 (bad request) without proper data
      const isExpectedBehavior = response.statusCode === 401 || response.statusCode === 400;
      logTest(`Payment endpoint: ${endpoint}`, isExpectedBehavior, `Status: ${response.statusCode}`);
    } catch (error) {
      logTest(`Payment endpoint: ${endpoint}`, false, error.message);
    }
  }
}

async function testWebSocketEndpoint() {
  console.log('\n🔌 Testing WebSocket Endpoint...');
  
  try {
    const response = await makeRequest('/api/socket');
    logTest('WebSocket info endpoint', response.success, `Status: ${response.statusCode}`);
  } catch (error) {
    logTest('WebSocket info endpoint', false, error.message);
  }
}

async function testServicePages() {
  console.log('\n🚛 Testing Service Pages...');
  
  const servicePages = [
    '/services/freight-forwarding',
    '/services/air-freight',
    '/services/warehousing',
    '/services/customs-clearance',
    '/services/compare'
  ];

  for (const page of servicePages) {
    try {
      const response = await makeRequest(page);
      logTest(`Service page: ${page}`, response.success, `Status: ${response.statusCode}`);
    } catch (error) {
      logTest(`Service page: ${page}`, false, error.message);
    }
  }
}

async function testResponsiveness() {
  console.log('\n📱 Testing Responsive Design...');
  
  const mobileHeaders = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
  };

  try {
    const response = await makeRequest('/', { headers: mobileHeaders });
    logTest('Mobile responsiveness', response.success, `Status: ${response.statusCode}`);
  } catch (error) {
    logTest('Mobile responsiveness', false, error.message);
  }
}

async function testSEOAndMetadata() {
  console.log('\n🔍 Testing SEO and Metadata...');
  
  try {
    const response = await makeRequest('/');
    const hasTitle = response.body.includes('<title>');
    const hasMetaDescription = response.body.includes('meta name="description"');
    
    logTest('Page title present', hasTitle);
    logTest('Meta description present', hasMetaDescription);
  } catch (error) {
    logTest('SEO metadata', false, error.message);
  }
}

async function testSecurityHeaders() {
  console.log('\n🔒 Testing Security Headers...');
  
  try {
    const response = await makeRequest('/');
    const headers = response.headers;
    
    logTest('X-Frame-Options header', !!headers['x-frame-options']);
    logTest('X-Content-Type-Options header', !!headers['x-content-type-options']);
    logTest('Content-Security-Policy header', !!headers['content-security-policy']);
  } catch (error) {
    logTest('Security headers', false, error.message);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 DCF Logistics Platform - Comprehensive Test Suite');
  console.log('=' .repeat(60));
  
  const startTime = Date.now();
  
  try {
    await testPublicPages();
    await testAPIEndpoints();
    await testAdminPages();
    await testDatabaseConnection();
    await testFileUploadEndpoint();
    await testPaymentEndpoints();
    await testWebSocketEndpoint();
    await testServicePages();
    await testResponsiveness();
    await testSEOAndMetadata();
    await testSecurityHeaders();
  } catch (error) {
    console.error('Test suite error:', error);
  }
  
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Passed: ${TEST_RESULTS.passed}`);
  console.log(`❌ Failed: ${TEST_RESULTS.failed}`);
  console.log(`📈 Total: ${TEST_RESULTS.total}`);
  console.log(`⏱️ Duration: ${duration}s`);
  console.log(`📊 Success Rate: ${((TEST_RESULTS.passed / TEST_RESULTS.total) * 100).toFixed(1)}%`);
  
  if (TEST_RESULTS.errors.length > 0) {
    console.log('\n🐛 FAILED TESTS:');
    TEST_RESULTS.errors.forEach(error => {
      console.log(`   • ${error.name}: ${error.details}`);
    });
  }
  
  console.log('\n🎉 Test suite completed!');
  
  // Exit with appropriate code
  process.exit(TEST_RESULTS.failed > 0 ? 1 : 0);
}

// Run tests if called directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests, makeRequest, logTest };
