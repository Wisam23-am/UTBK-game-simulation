'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dock from '@/components/Dock';
import { checkDatabaseSetup, getQuestionCount, checkAuth } from '@/lib/game/database-check';
import { DEV_MODE } from '@/lib/auth/auth-helpers';

export default function DiagnosticPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function runDiagnostics() {
      setLoading(true);
      
      const [dbStatus, questionCount, authStatus] = await Promise.all([
        checkDatabaseSetup(),
        getQuestionCount(),
        checkAuth(),
      ]);

      setStatus({
        database: dbStatus,
        questionCount,
        auth: authStatus,
        devMode: DEV_MODE,
      });

      setLoading(false);
    }

    runDiagnostics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Running diagnostics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔧 System Diagnostics</h1>
            <p className="text-gray-600">Check database and authentication status</p>
          </div>

          {/* Dev Mode Warning */}
          {status.devMode && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-bold text-yellow-800">Development Mode Active</p>
                  <p className="text-sm text-yellow-700">Authentication is disabled</p>
                </div>
              </div>
            </div>
          )}

          {/* Database Status */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🗄️</span> Database Status
            </h2>
            <div className="space-y-3">
              <StatusRow
                label="Overall Status"
                status={status.database.isReady}
                successText="Ready"
                failText="Not Ready"
              />
              <StatusRow
                label="profiles table"
                status={status.database.tables.profiles}
              />
              <StatusRow
                label="questions table"
                status={status.database.tables.questions}
              />
              <StatusRow
                label="game_results table"
                status={status.database.tables.game_results}
              />
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Question Count:</span>
                <span className={`font-bold ${status.questionCount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {status.questionCount} questions
                </span>
              </div>
            </div>

            {/* Errors */}
            {status.database.errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="font-bold text-red-800 mb-2">❌ Errors:</p>
                <ul className="space-y-1">
                  {status.database.errors.map((error: string, i: number) => (
                    <li key={i} className="text-sm text-red-700">• {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Authentication Status */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🔐</span> Authentication Status
            </h2>
            <div className="space-y-3">
              <StatusRow
                label="Authenticated"
                status={status.auth.isAuthenticated}
              />
              {status.auth.isAuthenticated && (
                <>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">User ID:</span>
                    <span className="font-mono text-sm text-gray-600">{status.auth.userId}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Email:</span>
                    <span className="font-mono text-sm text-gray-600">{status.auth.email}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Required */}
          {!status.database.isReady && (
            <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-lg font-bold text-blue-900 mb-3">📋 Action Required</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li>1. Open <code className="px-2 py-1 bg-blue-100 rounded">supabase-schema.sql</code></li>
                <li>2. Go to Supabase Dashboard → SQL Editor</li>
                <li>3. Copy & paste the schema</li>
                <li>4. Click Run (Ctrl+Enter)</li>
                <li>5. Refresh this page</li>
              </ol>
            </div>
          )}

          {status.questionCount === 0 && status.database.isReady && (
            <div className="mb-6 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">⚠️ No Questions Found</h3>
              <p className="text-sm text-yellow-800">
                Database is set up but no questions are available. Make sure you ran the full schema including the INSERT statements.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Link
              href="/"
              className="flex-1 py-3 px-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-center"
            >
              ← Back to Home
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Documentation */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">
              📖 Need help? Check <code className="px-2 py-1 bg-gray-200 rounded">DATABASE_SETUP.md</code> for detailed instructions.
            </p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4">
        <Dock />
      </div>
    </div>
  );
}

function StatusRow({
  label,
  status,
  successText = 'OK',
  failText = 'Error',
}: {
  label: string;
  status: boolean;
  successText?: string;
  failText?: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-700">{label}</span>
      <span
        className={`px-3 py-1 rounded-full text-sm font-bold ${
          status
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {status ? `✅ ${successText}` : `❌ ${failText}`}
      </span>
    </div>
  );
}
