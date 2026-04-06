'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Download, ChevronLeft, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProtectedInvoiceGenerator() {
  // --- AUTHENTICATION STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Check if she is already logged in during this browser session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('rixile_admin_auth');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // CHANGE THIS PASSWORD TO WHATEVER YOU WANT
    const SECURE_PASSWORD = 'Rixile2026';

    if (passwordInput === SECURE_PASSWORD) {
      sessionStorage.setItem('rixile_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasswordInput('');
    }
  };

  // --- INVOICE STATE ---
  const [invoiceNo, setInvoiceNo] = useState('769');
  const [date, setDate] = useState('17 Mar 2026');
  const [dueDate, setDueDate] = useState('17 Mar 2026');

  const [clientName, setClientName] = useState('Gloria Maulana');
  const [clientPhone, setClientPhone] = useState('+27 81 588 6265');

  const [items, setItems] = useState([
    { id: 1, description: 'Bulk Diesel - 50ppm (Litres)', qty: 1000, price: 23.50 },
    { id: 2, description: 'On-site Delivery Surcharge', qty: 1, price: 750.00 }
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const total = subtotal;

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: '', qty: 1, price: 0 }]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleItemChange = (id: number, field: string, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rixile_admin_auth');
    setIsAuthenticated(false);
  };

  // ==========================================
  // RENDER: LOGIN SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 selection:bg-purple-200">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-purple-900/10 overflow-hidden border border-slate-100">
          
          <div className="bg-purple-950 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-800/40 to-transparent z-0" />
            <img src="/logo.png" alt="Rixile Nxalati Logo" className="h-16 mx-auto mb-4 relative z-10 bg-white/10 p-2 rounded-xl backdrop-blur-sm" />
            <h2 className="text-xl font-bold text-white relative z-10">Admin Portal</h2>
            <p className="text-purple-200 text-sm mt-1 relative z-10">Restricted Access</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-purple-950 flex items-center gap-2">
                  <Lock size={16} className="text-purple-600" /> Security PIN / Password
                </label>
                <Input 
                  type="password" 
                  placeholder="Enter your access code" 
                  className={`bg-slate-50 py-6 text-center tracking-widest ${authError ? 'border-red-400 focus-visible:ring-red-400' : 'border-purple-100 focus-visible:ring-purple-600'}`}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
                {authError && (
                  <p className="text-xs text-red-500 font-bold flex items-center justify-center gap-1 mt-2">
                    <AlertCircle size={14} /> Incorrect password. Please try again.
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full bg-purple-900 text-white hover:bg-purple-800 rounded-xl py-6 font-bold shadow-lg shadow-purple-900/20">
                Unlock Generator <ArrowRight size={18} className="ml-2" />
              </Button>
            </form>
            <div className="mt-8 text-center">
              <a href="/" className="text-sm font-medium text-slate-500 hover:text-purple-700 transition-colors">
                &larr; Return to main website
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: INVOICE GENERATOR (Protected)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-purple-200">
      
      {/* LEFT PANEL: Form Controls (Hidden when printing) */}
      <div className="w-[400px] bg-white border-r border-slate-200 p-6 overflow-y-auto h-screen print:hidden shadow-xl z-10 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <a href="/" className="text-slate-500 hover:text-purple-700 transition-colors">
              <ChevronLeft size={20} />
            </a>
            <h2 className="text-xl font-bold text-purple-950">Invoice Generator</h2>
          </div>
          <button onClick={handleLogout} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
            Logout
          </button>
        </div>

        <div className="space-y-8 flex-1">
          {/* Client Details Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-purple-600">Bill To</h3>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1 block">Client Name</label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} className="bg-slate-50" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1 block">Client Phone</label>
              <Input value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} className="bg-slate-50" />
            </div>
          </div>

          {/* Invoice Details Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-widest uppercase text-purple-600">Invoice Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Invoice #</label>
                <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="bg-slate-50" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 mb-1 block">Date</label>
                <Input value={date} onChange={(e) => setDate(e.target.value)} className="bg-slate-50" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 mb-1 block">Due Date</label>
              <Input value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-slate-50" />
            </div>
          </div>

          {/* Line Items Form */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold tracking-widest uppercase text-purple-600">Line Items</h3>
              <Button size="sm" variant="outline" onClick={handleAddItem} className="h-8 text-xs border-purple-200 text-purple-700 hover:bg-purple-50">
                <Plus size={14} className="mr-1" /> Add
              </Button>
            </div>
            
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50 space-y-3 relative group">
                  <button onClick={() => handleRemoveItem(item.id)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Trash2 size={12} />
                  </button>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                    <Input value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} className="h-8 text-sm bg-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Qty</label>
                      <Input type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', Number(e.target.value))} className="h-8 text-sm bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Price (R)</label>
                      <Input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))} className="h-8 text-sm bg-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 mt-8">
          <Button onClick={handlePrint} className="w-full bg-purple-900 text-white hover:bg-purple-800 rounded-xl py-6 font-bold shadow-lg shadow-purple-900/20">
            <Download className="mr-2 h-5 w-5" /> Save as PDF
          </Button>
          <p className="text-xs text-center text-slate-400 mt-3 font-medium">Clicking this will open the print dialog. Select "Save as PDF".</p>
        </div>
      </div>

      {/* RIGHT PANEL: Live Invoice Preview */}
      <div className="flex-1 overflow-y-auto p-10 print:p-0 flex justify-center bg-slate-100 print:bg-white">
        
        {/* A4 Document Container */}
        <div className="bg-white w-[210mm] min-h-[297mm] shadow-2xl print:shadow-none p-[12mm] relative">
          
          {/* Header Section */}
          <div className="flex justify-between items-start border-b-2 border-purple-900 pb-8 mb-8">
            <div className="w-1/2">
              <img src="/logo.png" alt="Rixile Nxalati Logo" className="h-24 object-contain mb-4" />
            </div>
            <div className="w-1/2 text-right">
              <h1 className="text-4xl font-extrabold text-purple-950 tracking-tight mb-2 uppercase">Invoice</h1>
              <h2 className="text-lg font-bold text-purple-900">Rixile Nxalati Pty. Ltd</h2>
              <p className="text-sm text-slate-600 mt-1">Bokmakierie Rd, Rooihuiskraal</p>
              <p className="text-sm text-slate-600">Centurion, 0157</p>
              <p className="text-sm text-slate-600 mt-2">+27 81 588 6265</p>
              <p className="text-sm text-slate-600">rixilenxalati@outlook.com</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-sm font-bold tracking-widest uppercase text-purple-600 mb-2">Bill To</h3>
              <p className="text-lg font-bold text-purple-950">{clientName || 'Client Name'}</p>
              <p className="text-sm text-slate-600">{clientPhone || 'Client Phone'}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 w-64">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-slate-500">Invoice #</span>
                <span className="text-sm font-extrabold text-purple-950">{invoiceNo || '---'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-slate-500">Date</span>
                <span className="text-sm font-bold text-slate-800">{date || '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-bold text-slate-500">Due Date</span>
                <span className="text-sm font-bold text-slate-800">{dueDate || '---'}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2 border-purple-200">
                <th className="py-3 text-left text-sm font-bold tracking-widest uppercase text-purple-900">Item</th>
                <th className="py-3 text-center text-sm font-bold tracking-widest uppercase text-purple-900 w-24">Quantity</th>
                <th className="py-3 text-right text-sm font-bold tracking-widest uppercase text-purple-900 w-32">Price</th>
                <th className="py-3 text-right text-sm font-bold tracking-widest uppercase text-purple-900 w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-slate-100">
                  <td className="py-4 text-sm font-medium text-slate-800 pr-4">{item.description}</td>
                  <td className="py-4 text-sm text-slate-600 text-center">{item.qty}</td>
                  <td className="py-4 text-sm text-slate-600 text-right">R {item.price.toFixed(2)}</td>
                  <td className="py-4 text-sm font-bold text-purple-950 text-right">R {(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div className="flex justify-end mb-16">
            <div className="w-72 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Subtotal</span>
                <span className="font-bold text-slate-800">R {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-bold text-slate-500">Total</span>
                <span className="font-bold text-slate-800">R {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-purple-900">
                <span className="font-bold text-purple-900 uppercase tracking-wider text-sm">Amount Due</span>
                <span className="font-extrabold text-2xl text-purple-950">R {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl w-3/4 print:break-inside-avoid">
            <h3 className="text-sm font-bold tracking-widest uppercase text-purple-600 mb-4">Payment Instruction</h3>
            <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account Holder:</span>
                <span className="font-bold text-slate-800">Rixile Nxalati Pty. Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Account Type:</span>
                <span className="font-bold text-slate-800">Current Account</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Bank:</span>
                <span className="font-bold text-slate-800">FNB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Branch Code:</span>
                <span className="font-bold text-slate-800">250655</span>
              </div>
              <div className="flex justify-between col-span-2 mt-2 pt-2 border-t border-slate-200">
                <span className="text-slate-500 font-medium">Account Number:</span>
                <span className="font-extrabold text-lg text-purple-950 tracking-wider">1234 5678 910</span>
              </div>
            </div>
          </div>

          {/* Orange Accent Footer Line */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-purple-900 via-purple-600 to-orange-500" />

        </div>
      </div>
    </div>
  );
}