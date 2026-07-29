// // src/components/PrescriptionForm.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';

// const LENS_TYPES = [
//   { id: 'standard', label: 'Standard Lenses', price: 0 },
//   { id: 'anti_reflection', label: 'Anti Reflection', price: 850 },
//   { id: 'uv', label: 'UV Protection', price: 4500 },
//   { id: 'just_vision', label: 'Just Vision', price: 850 },
//   { id: 'blue_light', label: 'Blue Light Protection', price: 4500 },
// ];

// const PrescriptionForm = ({ isOpen, onClose, onSave, initialData }) => {
//   const [lensType, setLensType] = useState(initialData?.lensType || 'standard');
//   const [rightEye, setRightEye] = useState({
//     sphere: initialData?.rightEye?.sphere ?? '',
//     axis: initialData?.rightEye?.axis ?? '',
//   });
//   const [leftEye, setLeftEye] = useState({
//     sphere: initialData?.leftEye?.sphere ?? '',
//     axis: initialData?.leftEye?.axis ?? '',
//   });

//   useEffect(() => {
//     if (initialData) {
//       setLensType(initialData.lensType || 'standard');
//       setRightEye(initialData.rightEye || { sphere: '', axis: '' });
//       setLeftEye(initialData.leftEye || { sphere: '', axis: '' });
//     }
//   }, [initialData]);

//   const handleEyeChange = (eye, field, value) => {
//     const updater = eye === 'right' ? setRightEye : setLeftEye;
//     updater((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSave = () => {
//     const lens = LENS_TYPES.find((l) => l.id === lensType);
//     onSave({
//       lensType,
//       lensLabel: lens.label,
//       extraCharge: lens.price,
//       rightEye,
//       leftEye,
//     });
//     onClose();
//   };

//   const selectedLens = LENS_TYPES.find((l) => l.id === lensType);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.95 }}
//             className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-100">
//               <h2 className="text-xl font-serif font-semibold text-ink">Prescription Details</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-50 rounded-full transition-colors"
//                 aria-label="Close"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-6">
//               <p className="text-xs text-gray-500 mb-4">
//                 All fields optional. Sphere & Cylinder can be ±. Axis required only if Cylinder has a value.
//               </p>

//               {/* Lens Type */}
//               <div className="mb-6">
//                 <label className="text-sm font-semibold text-ink block mb-2">Lens Type</label>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//                   {LENS_TYPES.map((lens) => (
//                     <button
//                       key={lens.id}
//                       onClick={() => setLensType(lens.id)}
//                       className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
//                         lensType === lens.id
//                           ? 'border-ink bg-ink text-white'
//                           : 'border-gray-200 text-gray-600 hover:border-ink'
//                       }`}
//                     >
//                       {lens.label}
//                       {lens.price > 0 && (
//                         <span className="block text-[10px] opacity-70">+PKR {lens.price}</span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Right Eye */}
//               <div className="mb-6">
//                 <h4 className="text-sm font-semibold text-ink mb-2">Right Eye</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-500 block mb-1">Sphere</label>
//                     <input
//                       type="number"
//                       step="0.25"
//                       value={rightEye.sphere}
//                       onChange={(e) => handleEyeChange('right', 'sphere', e.target.value)}
//                       placeholder="0.00"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 block mb-1">Axis</label>
//                     <input
//                       type="number"
//                       step="0.25"
//                       value={rightEye.axis}
//                       onChange={(e) => handleEyeChange('right', 'axis', e.target.value)}
//                       placeholder="0"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
//                     />
//                   </div>
//                 </div>
//                 <p className="text-[10px] text-gray-400 mt-1">(stop 0.25 to 0.5) • stop 0.25</p>
//               </div>

//               {/* Left Eye */}
//               <div className="mb-6">
//                 <h4 className="text-sm font-semibold text-ink mb-2">Left Eye</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-gray-500 block mb-1">Sphere</label>
//                     <input
//                       type="number"
//                       step="0.25"
//                       value={leftEye.sphere}
//                       onChange={(e) => handleEyeChange('left', 'sphere', e.target.value)}
//                       placeholder="0.00"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-xs text-gray-500 block mb-1">Axis</label>
//                     <input
//                       type="number"
//                       step="0.25"
//                       value={leftEye.axis}
//                       onChange={(e) => handleEyeChange('left', 'axis', e.target.value)}
//                       placeholder="0"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
//                     />
//                   </div>
//                 </div>
//                 <p className="text-[10px] text-gray-400 mt-1">(stop 0.25 to 0.5) • stop 0.25</p>
//               </div>

//               {/* Extra charge summary */}
//               {selectedLens.price > 0 && (
//                 <div className="bg-cream/60 rounded-xl p-3 mb-4 flex justify-between items-center">
//                   <span className="text-sm text-ink font-medium">Lens Extra Charge:</span>
//                   <span className="text-sm font-bold text-ink">+PKR {selectedLens.price}</span>
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
//                 <button
//                   onClick={onClose}
//                   className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-ink transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSave}
//                   className="px-6 py-2.5 bg-ink text-white text-sm font-bold rounded-full hover:bg-black transition-colors"
//                 >
//                   Save Prescription
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PrescriptionForm;



























// src/components/PrescriptionForm.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Updated lens types with prices from your data
const LENS_TYPES = [
  { id: 'standard', label: 'Standard Lenses', price: 0 },
  { id: 'cr_multicoated', label: 'CR Multicoated Lenses', price: 800 },
  { id: 'uv_blue_cut', label: 'UV Protection Blue Cut', price: 1300 },
  { id: 'transition', label: 'Transition Glasses', price: 1500 },
  { id: 'transition_blue_cut', label: 'Transition Blue Cut', price: 2000 },
  { id: 'drive_safe', label: 'Drive Safe Glasses', price: 2500 },
  { id: 'drive_safe_transition', label: 'Drive Safe Transition', price: 3500 },
];

const PrescriptionForm = ({ isOpen, onClose, onSave, initialData }) => {
  const [lensType, setLensType] = useState(initialData?.lensType || 'standard');
  const [rightEye, setRightEye] = useState({
    sphere: initialData?.rightEye?.sphere ?? '',
    axis: initialData?.rightEye?.axis ?? '',
  });
  const [leftEye, setLeftEye] = useState({
    sphere: initialData?.leftEye?.sphere ?? '',
    axis: initialData?.leftEye?.axis ?? '',
  });

  useEffect(() => {
    if (initialData) {
      setLensType(initialData.lensType || 'standard');
      setRightEye(initialData.rightEye || { sphere: '', axis: '' });
      setLeftEye(initialData.leftEye || { sphere: '', axis: '' });
    }
  }, [initialData]);

  const handleEyeChange = (eye, field, value) => {
    const updater = eye === 'right' ? setRightEye : setLeftEye;
    updater((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const lens = LENS_TYPES.find((l) => l.id === lensType);
    onSave({
      lensType,
      lensLabel: lens.label,
      extraCharge: lens.price,
      rightEye,
      leftEye,
    });
    onClose();
  };

  const selectedLens = LENS_TYPES.find((l) => l.id === lensType);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif font-semibold text-ink">Prescription Details</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <p className="text-xs text-gray-500 mb-4">
                All fields optional. Sphere & Cylinder can be ±. Axis required only if Cylinder has a value.
              </p>

              {/* Lens Type */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-ink block mb-2">Lens Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {LENS_TYPES.map((lens) => (
                    <button
                      key={lens.id}
                      onClick={() => setLensType(lens.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                        lensType === lens.id
                          ? 'border-ink bg-ink text-white'
                          : 'border-gray-200 text-gray-600 hover:border-ink'
                      }`}
                    >
                      {lens.label}
                      {lens.price > 0 && (
                        <span className="block text-[10px] opacity-70">+PKR {lens.price}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Eye */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink mb-2">Right Eye</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Sphere</label>
                    <input
                      type="number"
                      step="0.25"
                      value={rightEye.sphere}
                      onChange={(e) => handleEyeChange('right', 'sphere', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Axis</label>
                    <input
                      type="number"
                      step="0.25"
                      value={rightEye.axis}
                      onChange={(e) => handleEyeChange('right', 'axis', e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">(stop 0.25 to 0.5) • stop 0.25</p>
              </div>

              {/* Left Eye */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-ink mb-2">Left Eye</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Sphere</label>
                    <input
                      type="number"
                      step="0.25"
                      value={leftEye.sphere}
                      onChange={(e) => handleEyeChange('left', 'sphere', e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Axis</label>
                    <input
                      type="number"
                      step="0.25"
                      value={leftEye.axis}
                      onChange={(e) => handleEyeChange('left', 'axis', e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:border-ink outline-none text-sm"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1">(stop 0.25 to 0.5) • stop 0.25</p>
              </div>

              {/* Extra charge summary */}
              {selectedLens.price > 0 && (
                <div className="bg-cream/60 rounded-xl p-3 mb-4 flex justify-between items-center">
                  <span className="text-sm text-ink font-medium">Lens Extra Charge:</span>
                  <span className="text-sm font-bold text-ink">+PKR {selectedLens.price}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-ink transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2.5 bg-ink text-white text-sm font-bold rounded-full hover:bg-black transition-colors"
                >
                  Save Prescription
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrescriptionForm;