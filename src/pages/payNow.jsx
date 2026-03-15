import React, { useState } from 'react';
import { CreditCard, Banknote, ShieldCheck, Copy, CheckCircle2, Info, Landmark, QrCode } from 'lucide-react';

const PaymentPage = () => {
  const [copied, setCopied] = useState(false);

  const bankDetails = {
    accountNumber: "1025104000052164",
    bankName: "IDBI Bank",
    holderName: "VIJAY THAKUR",
    ifscCode: "IBKL0001025",
    branch: "Sundernagar"
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
            Scan to pay or use bank transfer to complete your booking.
          </p>
        </div>
      </div>

      {/* --- PAYMENT CARD --- */}
      <div className="max-w-5xl mx-auto px-4 -mt-20">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          
          <div className="grid grid-cols-1 md:grid-cols-5">
            
           {/* Left Side: Instructions */}
<div className="md:col-span-2 bg-slate-900 p-10 text-white space-y-8">
  <div className="space-y-4">
    <h3 className="text-2xl font-black flex items-center gap-3">
      <ShieldCheck className="text-[#4F46E5]" size={28} /> 100% Safe
    </h3>
    <p className="text-slate-400 text-sm leading-relaxed">
      Your payments are processed manually via Bank Transfer or UPI to ensure zero extra processing fees.
    </p>
  </div>

  <div className="space-y-6">
    <div className="flex gap-4">
      <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
      <p className="text-sm text-slate-300">Scan QR Code or copy bank details.</p>
    </div>
    <div className="flex gap-4">
      <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
      <p className="text-sm text-slate-300">Make payment via any UPI app or Bank app.</p>
    </div>
    <div className="flex gap-4">
      <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</div>
      <p className="text-sm text-slate-300">Share screenshot on WhatsApp.</p>
    </div>
  </div>

  {/* NEW: Professional Contact Support Line */}
  <div className="pt-6 border-t border-slate-800">
    <p className="text-xs text-slate-400 leading-relaxed">
      In case of any payment-related issues, please contact our support at: 
      <span className="block text-indigo-400 font-bold mt-1 text-sm">+91 80916-55570</span>
    </p>
  </div>

  <div className="pt-4">
    <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
      <Info size={20} className="text-[#4F46E5] shrink-0" />
      <p className="text-[12px] text-slate-400 italic">
        Mention your "Name" in the remarks for faster verification.
      </p>
    </div>
  </div>
</div>
            {/* Right Side: Scanner & Bank Details */}
            <div className="md:col-span-3 p-8 md:p-12 space-y-10">
              
              {/* --- SCANNER SECTION --- */}
              <div className="bg-slate-50 rounded-[2rem] p-6 border-2 border-dashed border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-[#4F46E5]">
                    <QrCode size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">Scan & Pay via UPI</h2>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-48 h-48 bg-white p-2 rounded-2xl shadow-md border border-slate-100 shrink-0">
                    <img 
                      src="https://gcxwcbxsknxgknaiyfte.supabase.co/storage/v1/object/public/Travelpkgimages/1773566347385-tchScanner.jpeg" 
                      alt="Payment Scanner" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-500 leading-tight">
                      Supported Apps:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['GPay', 'PhonePe', 'Paytm', 'Amazon Pay'].map(app => (
                        <span key={app} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase text-slate-400">
                          {app}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      Simply scan the QR code using any UPI app on your mobile phone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-sm uppercase font-black">
                  <span className="bg-white px-4 text-slate-300">OR Use Bank Transfer</span>
                </div>
              </div>

              {/* --- BANK DETAILS SECTION --- */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Holder Name</p>
                    <p className="text-lg font-black text-slate-800">{bankDetails.holderName}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bank Name</p>
                    <p className="text-lg font-black text-[#4F46E5]">{bankDetails.bankName}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Account Number</p>
                    <p className="text-lg font-black text-slate-800 tracking-wider">{bankDetails.accountNumber}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    className="p-3 bg-white text-[#4F46E5] rounded-xl shadow-sm hover:shadow-md active:scale-90 transition-all"
                  >
                    {copied ? <CheckCircle2 size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">IFSC Code</p>
                  <p className="text-lg font-black text-slate-800">{bankDetails.ifscCode}</p>
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
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale">
           <div className="flex items-center gap-2 font-bold text-xs">
             <ShieldCheck size={18} /> Verified Official Account
           </div>
           <div className="flex items-center gap-2 font-bold text-xs">
             <CreditCard size={18} /> Secure UPI Payment
           </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;