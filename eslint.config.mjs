import { FlatCompat } from '@eslint/eslintrc'
import { defineConfig } from 'eslint/config'
import { fileURLToPath } from 'node:url'
import globals from 'globals'
import path from 'node:path'
import js from '@eslint/js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([
  {
    extends: compat.extends('eslint:recommended'),

    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
        ...globals.node
      },

      ecmaVersion: 2015,
      sourceType: 'module'
    }
  }
])
