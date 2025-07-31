'use client'

import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'

export default function AISearchBarSimple() {
  const [query, setQuery] = useState('')

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center pl-6">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for learning resources..."
            className="flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
          />
        </div>
      </div>
    </div>
  )
}
