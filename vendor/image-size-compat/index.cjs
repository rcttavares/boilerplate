'use strict'

// Minimal, dependency-free replacement for the `image-size` package.
//
// The upstream package (archived, last release 2.0.2) has unpatched DoS
// advisories (GHSA-w3rx-r6r6-pgpr, GHSA-5p2g-fcmc-qvqq) in its ICNS/JXL/HEIF
// chunk-walking parsers. This project only ever needs dimensions for common
// web image formats, so those parsers simply aren't implemented here — the
// vulnerable code paths don't exist in this file at all.
//
// Only the subset of the API actually used by this project's consumers is
// implemented: a synchronous `imageSize(buffer) -> { width, height, type }`.

function detectPng(buf) {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  if (buf.length < 24) return null
  for (let i = 0; i < sig.length; i++) {
    if (buf[i] !== sig[i]) return null
  }
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return null
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), type: 'png' }
}

function detectGif(buf) {
  if (buf.length < 10) return null
  const header = buf.toString('ascii', 0, 6)
  if (header !== 'GIF87a' && header !== 'GIF89a') return null
  return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8), type: 'gif' }
}

function detectBmp(buf) {
  if (buf.length < 26) return null
  if (buf[0] !== 0x42 || buf[1] !== 0x4d) return null
  const width = buf.readInt32LE(18)
  const height = Math.abs(buf.readInt32LE(22))
  return { width, height, type: 'bmp' }
}

function detectJpeg(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null
  const len = buf.length
  let offset = 2
  while (offset + 2 <= len) {
    if (buf[offset] !== 0xff) {
      offset += 1
      continue
    }
    const marker = buf[offset + 1]
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2
      continue
    }
    if (offset + 4 > len) break
    const segmentLength = buf.readUInt16BE(offset + 2)
    if (segmentLength < 2) break
    const isSof =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
    if (isSof) {
      if (offset + 9 > len) break
      const height = buf.readUInt16BE(offset + 5)
      const width = buf.readUInt16BE(offset + 7)
      return { width, height, type: 'jpg' }
    }
    offset += 2 + segmentLength
  }
  return null
}

function detectWebp(buf) {
  if (buf.length < 16) return null
  if (buf.toString('ascii', 0, 4) !== 'RIFF') return null
  if (buf.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunkType = buf.toString('ascii', 12, 16)
  if (chunkType === 'VP8 ' && buf.length >= 30) {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
      type: 'webp',
    }
  }
  if (chunkType === 'VP8L' && buf.length >= 25) {
    const bits = buf.readUInt32LE(21)
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
      type: 'webp',
    }
  }
  if (chunkType === 'VP8X' && buf.length >= 30) {
    return {
      width: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      height: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1,
      type: 'webp',
    }
  }
  return null
}

function detectSvg(buf) {
  const str = buf.toString('utf8', 0, Math.min(buf.length, 8192))
  if (!/<svg[\s>]/i.test(str)) return null
  const widthMatch = str.match(/<svg\b[^>]*\swidth=["']?([\d.]+)/i)
  const heightMatch = str.match(/<svg\b[^>]*\sheight=["']?([\d.]+)/i)
  if (widthMatch && heightMatch) {
    return { width: parseFloat(widthMatch[1]), height: parseFloat(heightMatch[1]), type: 'svg' }
  }
  const viewBoxMatch = str.match(
    /\bviewBox=["']?\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/i
  )
  if (viewBoxMatch) {
    return {
      width: parseFloat(viewBoxMatch[1]),
      height: parseFloat(viewBoxMatch[2]),
      type: 'svg',
    }
  }
  return null
}

const detectors = [detectPng, detectJpeg, detectGif, detectWebp, detectBmp, detectSvg]

function imageSize(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  for (const detect of detectors) {
    const result = detect(buf)
    if (result) return result
  }
  throw new TypeError('image-size-compat: unsupported or unrecognized image format')
}

module.exports = { imageSize }
