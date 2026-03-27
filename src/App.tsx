import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Code2, 
  Cloud,
  RefreshCw,
  ShieldCheck, 
  Smartphone,
  ChevronRight,
  Search,
  PieChart as PieChartIcon,
  MessageSquare
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SCHEMA_DATA = [
  { table: 'Transactions', fields: 'id, amount, type, timestamp, merchant, categoryId, contactId, refId' },
  { table: 'Contacts', fields: 'id, name, phone, upiId, balance' },
  { table: 'Categories', fields: 'id, name, icon, keywords' },
  { table: 'SmsLog', fields: 'id, messageId, body, timestamp, isProcessed' },
];

const REGEX_PATTERNS = [
  { bank: 'Common Debit', pattern: '(?i)Rs\\.?\\s*([\\d,.]+)\\s*debited.*at\\s*([^.]+)' },
  { bank: 'Common Credit', pattern: '(?i)credited.*Rs\\.?\\s*([\\d,.]+)' },
  { bank: 'UPI Transfer', pattern: '(?i)Paid\\s*Rs\\.?\\s*([\\d,.]+)\\s*to\\s*([^ ]+)' },
];

const CATEGORY_DISTRIBUTION = [
  { name: 'Food', value: 400, color: '#F27D26' },
  { name: 'Travel', value: 300, color: '#3b82f6' },
  { name: 'Shopping', value: 300, color: '#10b981' },
  { name: 'Bills', value: 200, color: '#ef4444' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('architecture');

  const tabs = [
    { id: 'architecture', label: 'Architecture', icon: LayoutDashboard },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'parsing', label: 'SMS Parsing', icon: MessageSquare },
    { id: 'backup', label: 'Cloud Sync', icon: Cloud },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#E4E3E0] text-[#141414] font-sans selection:bg-[#141414] selection:text-[#E4E3E0]">
      {/* Sidebar Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 border-r border-[#141414] bg-[#E4E3E0] z-10 hidden md:block">
        <div className="p-8 border-bottom border-[#141414]">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-6 h-6" />
            <h1 className="font-serif italic text-xl font-bold">Tracker.kt</h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-50">Android Blueprint v1.0</p>
        </div>
        
        <nav className="mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-8 py-4 text-sm transition-all duration-200 border-b border-[#141414]/10",
                activeTab === tab.id ? "bg-[#141414] text-[#E4E3E0]" : "hover:bg-[#141414]/5"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 p-8 md:p-12">
        <header className="mb-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-serif italic mb-2">System Blueprint</h2>
              <p className="text-[#141414]/60 max-w-xl">
                A technical overview of the production-grade Android SMS Expense Tracker implementation.
              </p>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-[11px] uppercase tracking-widest opacity-50 mb-1">Last Updated</p>
              <p className="font-mono text-sm">MAR 26, 2026</p>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'architecture' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 border border-[#141414] bg-white">
                  <h3 className="font-serif italic text-2xl mb-6">MVVM Pattern</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-[#141414] bg-[#E4E3E0]/30">
                      <p className="font-mono text-xs mb-1 opacity-50">VIEW LAYER</p>
                      <p className="font-medium">Fragments & Activities (Jetpack Compose)</p>
                    </div>
                    <div className="flex justify-center"><ChevronRight className="rotate-90" /></div>
                    <div className="p-4 border border-[#141414] bg-[#E4E3E0]/30">
                      <p className="font-mono text-xs mb-1 opacity-50">VIEWMODEL</p>
                      <p className="font-medium">StateFlow & LiveData Management</p>
                    </div>
                    <div className="flex justify-center"><ChevronRight className="rotate-90" /></div>
                    <div className="p-4 border border-[#141414] bg-[#E4E3E0]/30">
                      <p className="font-mono text-xs mb-1 opacity-50">REPOSITORY</p>
                      <p className="font-medium">Single Source of Truth (Room + SMS)</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 border border-[#141414] bg-white">
                  <h3 className="font-serif italic text-2xl mb-6">Analytics Preview</h3>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CATEGORY_DISTRIBUTION}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#141414', border: 'none', color: '#E4E3E0' }}
                          itemStyle={{ color: '#E4E3E0' }}
                        />
                        <Bar dataKey="value" fill="#141414" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'database' && (
              <div className="border border-[#141414] bg-white overflow-hidden">
                <div className="grid grid-cols-4 p-4 border-b border-[#141414] bg-[#141414] text-[#E4E3E0] text-[10px] uppercase tracking-widest">
                  <div className="col-span-1">Table Name</div>
                  <div className="col-span-3">Fields / Schema</div>
                </div>
                {SCHEMA_DATA.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 p-6 border-b border-[#141414] hover:bg-[#141414] hover:text-[#E4E3E0] transition-colors group">
                    <div className="col-span-1 font-serif italic text-lg">{row.table}</div>
                    <div className="col-span-3 font-mono text-xs opacity-60 group-hover:opacity-100">{row.fields}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'parsing' && (
              <div className="space-y-8">
                <div className="p-8 border border-[#141414] bg-white">
                  <h3 className="font-serif italic text-2xl mb-6">Regex Library</h3>
                  <div className="space-y-4">
                    {REGEX_PATTERNS.map((p, i) => (
                      <div key={i} className="p-4 border border-dashed border-[#141414]">
                        <p className="text-[10px] uppercase tracking-widest mb-2 opacity-50">{p.bank}</p>
                        <code className="block bg-[#E4E3E0] p-3 text-sm font-mono overflow-x-auto">
                          {p.pattern}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 border border-[#141414] bg-[#141414] text-[#E4E3E0]">
                  <h4 className="font-serif italic text-xl mb-4 text-[#F27D26]">Pro Tip: Normalization</h4>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Always normalize currency strings by removing commas and symbols before parsing to Double. 
                    Use a fallback value of 0.0 to prevent crash on malformed SMS.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 p-8 border border-[#141414] bg-white">
                  <h3 className="font-serif italic text-2xl mb-6">Google Drive Flow</h3>
                  <ol className="space-y-6">
                    <li className="flex gap-4">
                      <span className="font-serif italic text-3xl opacity-20">01</span>
                      <div>
                        <p className="font-bold">OAuth 2.0 Handshake</p>
                        <p className="text-sm opacity-60">Request 'drive.file' scope for app-specific folder access.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-serif italic text-3xl opacity-20">02</span>
                      <div>
                        <p className="font-bold">JSON Serialization</p>
                        <p className="text-sm opacity-60">Export Room entities to a structured JSON string.</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="font-serif italic text-3xl opacity-20">03</span>
                      <div>
                        <p className="font-bold">WorkManager Trigger</p>
                        <p className="text-sm opacity-60">Schedule monthly sync with 'Charging' and 'Unmetered Network' constraints.</p>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="p-8 border border-[#141414] bg-[#F27D26] text-[#141414] flex flex-col justify-center">
                  <Cloud className="w-12 h-12 mb-4" />
                  <h4 className="font-serif italic text-2xl mb-2">Sync Policy</h4>
                  <p className="text-sm font-medium">
                    "Backup once per month. Never overwrite. Append timestamp to filenames."
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="p-8 border border-[#141414] bg-white">
                <div className="flex items-center gap-4 mb-8">
                  <ShieldCheck className="w-10 h-10 text-green-600" />
                  <h3 className="font-serif italic text-3xl">Privacy First</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="uppercase text-[10px] tracking-[0.2em] font-bold mb-4 opacity-50">Local Processing</h4>
                    <p className="text-sm leading-relaxed mb-6">
                      All SMS parsing and classification happens on-device. No raw financial data is ever sent to a 3rd party server.
                    </p>
                    <h4 className="uppercase text-[10px] tracking-[0.2em] font-bold mb-4 opacity-50">Permission Handling</h4>
                    <p className="text-sm leading-relaxed">
                      Explicit runtime permission requests for READ_SMS. Graceful degradation if permission is denied.
                    </p>
                  </div>
                  <div className="bg-[#E4E3E0] p-6 border border-[#141414]">
                    <h4 className="font-serif italic text-lg mb-4">Security Checklist</h4>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#141414] rounded-full" />
                        SQLCipher for Room DB encryption
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#141414] rounded-full" />
                        Biometric Prompt for app entry
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#141414] rounded-full" />
                        No logging of PII in Logcat
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-[#141414] text-[#E4E3E0] flex items-center px-4 justify-between text-[10px] uppercase tracking-widest z-20">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Build: Stable
          </span>
          <span>Kotlin 1.9.0</span>
        </div>
        <div>
          © 2026 Android Architecture Guide
        </div>
      </footer>
    </div>
  );
}
