import { createClient } from '@supabase/supabase-js'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { lookup } from 'mime-types'
import 'dotenv/config'

// ─── Config ────────────────────────────────────────────────────────────────

const SUPABASE_URL = 'https://blkzckjwlpuxqckduypi.supabase.co'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY
const BUCKET = 'quarterons-media'
export const SUPABASE_STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`

if (!SUPABASE_SERVICE_KEY) {
  console.error('❌  Missing SUPABASE_SERVICE_KEY env var')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ─── Folders to upload ─────────────────────────────────────────────────────
// Local path (relative to project root) → storage prefix

const PUBLIC_DIR = join(process.cwd(), 'public')

const UPLOAD_FOLDERS = [
  'images/lieux',
  'images/portraits',
  'images/plantes',
  'images/jeu',
  'images/360',
  'audios',
]

// ─── Helpers ───────────────────────────────────────────────────────────────

function walkDir(dir) {
  const entries = readdirSync(dir)
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      files.push(...walkDir(full))
    } else {
      files.push(full)
    }
  }
  return files
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  // 1. Ensure bucket exists
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets()
  if (listErr) { console.error('❌  listBuckets:', listErr.message); process.exit(1) }

  const bucketExists = buckets.some(b => b.name === BUCKET)
  if (!bucketExists) {
    const { error: createErr } = await supabase.storage.createBucket(BUCKET, { public: true })
    if (createErr) { console.error('❌  createBucket:', createErr.message); process.exit(1) }
    console.log(`✅  Created bucket "${BUCKET}"`)
  } else {
    console.log(`ℹ️   Bucket "${BUCKET}" already exists`)
  }

  // 2. Collect all files
  const filesToUpload = []
  for (const folder of UPLOAD_FOLDERS) {
    const localDir = join(PUBLIC_DIR, folder)
    let files
    try {
      files = walkDir(localDir)
    } catch {
      console.warn(`⚠️   Folder not found, skipping: ${localDir}`)
      continue
    }
    for (const file of files) {
      // storage path = folder/filename (strip the public/ prefix)
      const storagePath = relative(PUBLIC_DIR, file).replace(/\\/g, '/')
      filesToUpload.push({ localPath: file, storagePath })
    }
  }

  console.log(`\n📦  ${filesToUpload.length} files to process\n`)

  // 3. Upload each file
  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const { localPath, storagePath } of filesToUpload) {
    const mimeType = lookup(localPath) || 'application/octet-stream'
    const fileBuffer = readFileSync(localPath)

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: mimeType,
        upsert: false,        // skip if already exists
      })

    if (error) {
      if (error.message?.includes('already exists') || error.error === 'Duplicate') {
        console.log(`⏭️   SKIP  ${storagePath}`)
        skipped++
      } else {
        console.error(`❌  FAIL  ${storagePath} — ${error.message}`)
        failed++
      }
    } else {
      const publicUrl = `${SUPABASE_STORAGE_URL}/${storagePath}`
      console.log(`✅  OK    ${storagePath}`)
      console.log(`         ${publicUrl}`)
      uploaded++
    }
  }

  // 4. Summary
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`Uploaded : ${uploaded}`)
  console.log(`Skipped  : ${skipped}`)
  console.log(`Failed   : ${failed}`)
  console.log(`${'─'.repeat(60)}`)
  console.log(`\nBase URL:\n${SUPABASE_STORAGE_URL}/`)
}

main()
