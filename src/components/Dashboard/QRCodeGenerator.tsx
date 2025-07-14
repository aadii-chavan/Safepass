import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { EmergencyProfile } from '../../types';
import { Download, X, QrCode, Smartphone, Printer, Share2 } from 'lucide-react';

interface QRCodeGeneratorProps {
  profile: EmergencyProfile;
  onClose: () => void;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ profile, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const publicUrl = `${window.location.origin}/${profile.publicUrl}`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, publicUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1e40af',
          light: '#ffffff'
        }
      });
    }
  }, [publicUrl]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `SafePass-QR-${profile.fullName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 z-50 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 max-w-lg w-full p-4 sm:p-8 my-8 max-h-[95vh] flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Your Emergency QR Code</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200 hover:bg-slate-100 p-2 rounded-xl"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-4 sm:p-8 mb-8 border border-slate-200 flex justify-center">
            <canvas ref={canvasRef} className="mx-auto w-full max-w-[300px] h-auto" style={{height: 'auto'}} />
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-slate-800 mb-4 text-lg">How to use your QR code:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Printer className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Print & Carry</p>
                  <p className="text-sm text-slate-600">Keep in wallet, car, or visible location</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Quick Scan</p>
                  <p className="text-sm text-slate-600">First responders can scan for instant access</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Share2 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">No Login Required</p>
                  <p className="text-sm text-slate-600">Direct access to emergency information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <QrCode className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Always Updated</p>
                  <p className="text-sm text-slate-600">Links to your latest profile information</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={downloadQRCode}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span>Download QR Code</span>
            </button>

            <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="font-semibold mb-2 text-slate-700">Public Emergency URL:</p>
              <p className="break-all font-mono bg-white px-3 py-2 rounded-lg border">{publicUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};