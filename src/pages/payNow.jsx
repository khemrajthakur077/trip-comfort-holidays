import React, { useState } from 'react';
import { CreditCard, Banknote, ShieldCheck, Copy, CheckCircle2, Info, Landmark } from 'lucide-react';

const PaymentPage = () => {
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    accountNumber: "1025104000052164",
    bankName: "IDBI Bank",
    holderName: "VIJAY THAKUR",
    ifscCode: "IBKL0001025",
    branch: "Sundernagar" // Optional: added for professional look
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-[#4F46E5] pt-20 pb-32 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Secure <span className="text-indigo-200">Payment</span>
          </h1>
          <p className="text-indigo-100 text-lg font-medium opacity-90">
            Complete your booking by transferring the amount to our official bank account.
          </p>
        </div>
      </div>

      {/* --- PAYMENT CARD --- */}
      <div className="max-w-4xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-5">
            
            {/* Left Side: Instructions */}
            <div className="md:col-span-2 bg-slate-900 p-10 text-white space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <ShieldCheck className="text-[#4F46E5]" size={28} /> Safe & Secure
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Your payments are processed manually via Bank Transfer to ensure 100% security and zero extra processing fees.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <p className="text-sm text-slate-300">Copy the account details provided.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <p className="text-sm text-slate-300">Make a transfer via UPI, NEFT, or IMPS.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <p className="text-sm text-slate-300">Share the screenshot on WhatsApp.</p>
                </div>
              </div>

              <div className="pt-10">
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
                  <Info size={20} className="text-[#4F46E5] shrink-0" />
                  <p className="text-[12px] text-slate-400 italic">
                    Please mention your "Name" or "Tour ID" in the payment remarks for faster verification.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Bank Details */}
            <div className="md:col-span-3 p-8 md:p-12 space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Bank Details</h2>
                <Landmark size={32} className="text-slate-200" />
              </div>

              <div className="space-y-6">
                {/* Account Holder */}
                <div className="group p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Account Holder Name</p>
                  <p className="text-xl font-black text-slate-800">{bankDetails.holderName}</p>
                </div>

                {/* Bank Name */}
                <div className="group p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                  <p className="text-xl font-black text-[#4F46E5]">{bankDetails.bankName}</p>
                </div>

                {/* Account Number */}
                <div className="group p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Account Number</p>
                    <p className="text-xl font-black text-slate-800 tracking-wider">{bankDetails.accountNumber}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="p-3 bg-white text-[#4F46E5] rounded-xl shadow-sm hover:shadow-md active:scale-90 transition-all"
                  >
                    {copied ? <CheckCircle2 size={20} className="text-green-500" /> : <Copy size={20} />}
                  </button>
                </div>

                {/* IFSC Code */}
                <div className="group p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">IFSC Code</p>
                  <p className="text-xl font-black text-slate-800">{bankDetails.ifscCode}</p>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="https://wa.me/918091655570?text=I%20have%20made%20the%20payment.%20Here%20is%20the%20screenshot."
                  className="w-full bg-[#4F46E5] text-white py-5 rounded-2xl font-black text-center flex items-center justify-center gap-3 hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
                >
                  <Banknote size={22} /> Notify on WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* --- TRUST BADGES --- */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 font-bold text-sm">
              <ShieldCheck size={20} /> PCI DSS Compliant
           </div>
           <div className="flex items-center gap-2 font-bold text-sm">
              <CreditCard size={20} /> Secure Bank Transfer
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;