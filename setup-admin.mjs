#!/usr/bin/env node
/**
 * Ahmed Ammar Portfolio — Admin Setup Script
 * ============================================
 * Creates the admin Supabase Auth user defined in .env.local.
 *
 * Run ONCE after setting up your Supabase project:
 *   node scripts/setup-admin.mjs
 *
 * Requirements:
 *   - .env.local must exist with NEXT_PUBLIC_SUPABASE_URL,
 *     SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, and ADMIN_PASSWORD
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createClient } from '@supabase/supabase-js'

// ── Load .env.local manually (no dotenv dependency needed) ─────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath   = resolve(__dirname, '../.env.local')

let envVars = {}
try {
  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    envVars[key] = val
  }
} catch {
  console.error('❌  Could not read .env.local — make sure it exists.')
  process.exit(1)
}

const {
  NEXT_PUBLIC_SUPABASE_URL: url,
  SUPABASE_SERVICE_ROLE_KEY: serviceKey,
  ADMIN_EMAIL:    adminEmail,
  ADMIN_USERNAME: adminUsername = 'Admin',
  ADMIN_PASSWORD: adminPassword,
} = envVars

// ── Validate required vars ──────────────────────────────────────────────────
const missing = []
if (!url)           missing.push('NEXT_PUBLIC_SUPABASE_URL')
if (!serviceKey)    missing.push('SUPABASE_SERVICE_ROLE_KEY')
if (!adminEmail)    missing.push('ADMIN_EMAIL')
if (!adminPassword) missing.push('ADMIN_PASSWORD')

if (missing.length) {
  console.error('❌  Missing required environment variables:')
  missing.forEach((v) => console.error(`   • ${v}`))
  process.exit(1)
}

// ── Create Supabase admin client ────────────────────────────────────────────
const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

console.log('\n🔧  Ahmed Ammar Portfolio — Admin Setup')
console.log('════════════════════════════════════════')
console.log(`   Supabase URL : ${url}`)
console.log(`   Admin email  : ${adminEmail}`)
console.log(`   Admin alias  : ${adminUsername}`)
console.log('')

// ── Check if user already exists ───────────────────────────────────────────
const { data: existingUsers } = await supabase.auth.admin.listUsers()
const exists = existingUsers?.users?.some((u) => u.email === adminEmail)

if (exists) {
  console.log('ℹ️   Admin user already exists — updating password...')
  const existing = existingUsers.users.find((u) => u.email === adminEmail)
  const { error } = await supabase.auth.admin.updateUserById(existing.id, {
    password: adminPassword,
  })
  if (error) {
    console.error('❌  Failed to update password:', error.message)
    process.exit(1)
  }
  console.log('✅  Password updated successfully.')
} else {
  // ── Create new admin user ─────────────────────────────────────────────────
  const { data, error } = await supabase.auth.admin.createUser({
    email: adminEmail,
    password: adminPassword,
    email_confirm: true,   // skip email verification
    user_metadata: {
      full_name: adminUsername,
      role: 'super-admin',
    },
  })

  if (error) {
    console.error('❌  Failed to create admin user:', error.message)
    process.exit(1)
  }

  console.log(`✅  Admin user created!`)
  console.log(`   User ID : ${data.user.id}`)
}

console.log('')
console.log('🎉  Setup complete. You can now log in at /admin/login')
console.log(`   Username : ${adminUsername}   (or ${adminEmail})`)
console.log(`   Password : ${adminPassword}`)
console.log('')
console.log('⚠️   Keep these credentials secure and never share them.')
console.log('')
