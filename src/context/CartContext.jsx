// import React, { createContext, useState, useEffect, useContext } from 'react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     try {
//       const storedCart = localStorage.getItem('cart');
//       return storedCart ? JSON.parse(storedCart) : [];
//     } catch {
//       return [];
//     }
//   });

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Helper function to generate unique ID for cart item (important for prescription items)
//   const generateCartItemId = (product, prescription) => {
//     if (!prescription || Object.values(prescription).every(v => !v)) {
//       return product.id.toString();
//     }
//     // Create unique ID based on product ID and prescription values
//     const prescriptionHash = JSON.stringify(prescription);
//     return `${product.id}_${btoa(prescriptionHash).substring(0, 20)}`;
//   };

//   const addToCart = (product, quantity = 1) => {
//     setCartItems(prev => {
//       // Generate unique ID for this cart item (especially for prescription)
//       const cartItemId = generateCartItemId(product, product.prescription);
      
//       // Check if item with same ID exists (same product AND same prescription)
//       const existing = prev.find(item => item.cartItemId === cartItemId);
      
//       if (existing) {
//         // Update quantity if same product with same prescription
//         return prev.map(item =>
//           item.cartItemId === cartItemId
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
      
//       // Add new item with prescription data
//       return [...prev, { 
//         ...product, 
//         quantity,
//         cartItemId, // Unique identifier for this cart item
//         hasPrescription: !!(product.prescription && Object.values(product.prescription).some(v => v)),
//         addedAt: new Date().toISOString() // Timestamp for sorting
//       }];
//     });
//   };

//   const removeFromCart = (cartItemId) => {
//     setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
//   };

//   const updateQuantity = (cartItemId, quantity) => {
//     setCartItems(prev =>
//       prev.map(item =>
//         item.cartItemId === cartItemId ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => setCartItems([]);

//   const cartTotal = cartItems.reduce(
//     (sum, item) => sum + (item.price || 0) * item.quantity,
//     0
//   );

//   // Get prescription summary for display
//   const getPrescriptionSummary = (prescription) => {
//     if (!prescription) return null;
//     const hasValues = Object.values(prescription).some(v => v);
//     if (!hasValues) return null;
    
//     const parts = [];
//     if (prescription.sphereLeft || prescription.sphereRight) {
//       parts.push(`SPH: L:${prescription.sphereLeft || '0'} R:${prescription.sphereRight || '0'}`);
//     }
//     if (prescription.pd) {
//       parts.push(`PD: ${prescription.pd}mm`);
//     }
//     return parts.join(' | ');
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         cartTotal,
//         getPrescriptionSummary
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };




















/// src/context/CartContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

// Checks nested prescription objects (rightEye/leftEye/etc.) for any real value,
// instead of Object.values(prescription).some(v => v), which treats any object
// (even one full of empty strings) as truthy and can miss/misreport fields.
const hasPrescriptionValues = (prescription) => {
  if (!prescription) return false;
  return Object.values(prescription).some((val) => {
    if (val && typeof val === 'object') {
      return Object.values(val).some((v) => v !== '' && v !== null && v !== undefined);
    }
    return val !== '' && val !== null && val !== undefined && val !== 0;
  });
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const generateCartItemId = (product, prescription) => {
    if (!hasPrescriptionValues(prescription)) {
      return product.id.toString();
    }
    const prescriptionHash = JSON.stringify(prescription);
    return `${product.id}_${btoa(prescriptionHash).substring(0, 20)}`;
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const cartItemId = generateCartItemId(product, product.prescription);
      const existing = prev.find(item => item.cartItemId === cartItemId);

      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { 
        ...product, 
        quantity,
        cartItemId,
        hasPrescription: hasPrescriptionValues(product.prescription),
        addedAt: new Date().toISOString()
      }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  // ✅ اب یہ finalPrice کو بھی شامل کرے گا
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + (item.finalPrice ?? item.price) * item.quantity,
    0
  );

  const getPrescriptionSummary = (prescription) => {
    if (!hasPrescriptionValues(prescription)) return null;

    const parts = [];

    if (prescription.lensLabel) {
      parts.push(prescription.lensLabel);
    }

    const eyeSummary = (label, eye) => {
      if (!eye) return null;
      const bits = [];
      if (eye.sphere !== '' && eye.sphere != null) bits.push(`SPH ${eye.sphere}`);
      if (eye.cylinder !== '' && eye.cylinder != null) bits.push(`CYL ${eye.cylinder}`);
      if (eye.axis !== '' && eye.axis != null) bits.push(`AXIS ${eye.axis}`);
      return bits.length ? `${label}: ${bits.join(', ')}` : null;
    };

    const rightSummary = eyeSummary('R', prescription.rightEye);
    const leftSummary = eyeSummary('L', prescription.leftEye);
    if (rightSummary) parts.push(rightSummary);
    if (leftSummary) parts.push(leftSummary);

    if (prescription.pd) {
      parts.push(`PD: ${prescription.pd}mm`);
    }

    return parts.join(' | ');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        getPrescriptionSummary
      }}
    >
      {children}
    </CartContext.Provider>
  );
};