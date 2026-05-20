// import React, { useState, useEffect } from 'react';

// const PageLoader = () => {
//   const [visible, setVisible] = useState(true);
//   const [exiting, setExiting] = useState(false);

//   useEffect(() => {
//     const exitTimer = setTimeout(() => setExiting(true), 2000);
//     const hideTimer = setTimeout(() => setVisible(false), 2900);
//     return () => {
//       clearTimeout(exitTimer);
//       clearTimeout(hideTimer);
//     };
//   }, []);

//   if (!visible) return null;

//   return (
//     <div style={{
//       position: 'fixed', inset: 0, background: '#000',
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       zIndex: 9999, overflow: 'hidden',
//       transform: exiting ? 'translateX(-100%)' : 'translateX(0)',
//       transition: exiting ? 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
//     }}>
//       <style>{`
//         @keyframes spinIn {
//           from { opacity:0; transform: rotate(-360deg) scale(0.3); }
//           to   { opacity:1; transform: rotate(0deg) scale(1); }
//         }
//         @keyframes rotateSpin {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(360deg); }
//         }
//         @keyframes fadeUp {
//           from { opacity:0; transform: translateY(6px); }
//           to   { opacity:1; transform: translateY(0); }
//         }
//         @keyframes progressFill {
//           0%   { width: 0%; }
//           60%  { width: 70%; }
//           100% { width: 100%; }
//         }
//         .loader-ring { animation: rotateSpin 1.4s linear infinite; }
//         .loader-logo-img { animation: spinIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity:0; }
//         .loader-sub { animation: fadeUp 0.5s ease-out 0.7s forwards; opacity:0; }
//         .loader-bar-wrap { animation: fadeUp 0.3s ease-out 0.5s forwards; opacity:0; }
//         .loader-bar-fill { animation: progressFill 1.8s cubic-bezier(0.4,0,0.2,1) 0.5s forwards; }
//       `}</style>

//       <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px' }}>

//         {/* Ring + Logo Image */}
//         <div style={{ position:'relative', width:'130px', height:'130px', display:'flex', alignItems:'center', justifyContent:'center' }}>

//           {/* Rotating ring */}
//           <svg className="loader-ring" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 130 130">
//             <circle fill="none" stroke="#333" strokeWidth="1.5" cx="65" cy="65" r="58"/>
//             <circle fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"
//               strokeDasharray="90 220" cx="65" cy="65" r="58"/>
//           </svg>

//           {/* Logo image */}
//           <img
//             className="loader-logo-img"
//             src="/iqra.jpeg"
//             alt="IQRA Optical"
//             style={{ width:'80px', height:'80px', objectFit:'contain', borderRadius:'50%',background:'#fff'}}
//           />
//         </div>

//         {/* Optical text */}
//         <span className="loader-sub" style={{
//           fontSize:'8px', letterSpacing:'0.6em', color:'#666',
//           textTransform:'uppercase', fontWeight:'300', fontFamily:'sans-serif'
//         }}>
//           Optical
//         </span>

//         {/* Progress bar */}
//         <div className="loader-bar-wrap" style={{ width:'120px', height:'1px', background:'#333', marginTop:'20px', overflow:'hidden' }}>
//           <div className="loader-bar-fill" style={{ height:'100%', background:'#fff', width:'0%' }}/>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default PageLoader;
















import React, { useState, useEffect } from 'react';

const PageLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 3.5s tak loader dikhega (animation ke khatam hone tak)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      <style>{`
        /* Slow & Smooth Swipe: Left to Right */
        @keyframes slowSwipe {
          0% {
            opacity: 0;
            transform: translateX(-120vw) scale(0.8);
          }
          20% {
            opacity: 1;
          }
          /* Center Position & Size Peak */
          50% {
            opacity: 1;
            transform: translateX(0vw) scale(1.4); 
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(120vw) scale(0.8);
          }
        }

        /* Headline text animation */
        @keyframes fadeInUp {
          0%, 25% { opacity: 0; transform: translateY(20px); }
          50% { opacity: 1; transform: translateY(0); }
          75%, 100% { opacity: 0; transform: translateY(-20px); }
        }

        .loader-main-container {
          animation: slowSwipe 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .headline-text {
          font-family: 'serif', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 0.1em;
          margin-top: 10px;
          text-transform: uppercase;
          animation: fadeInUp 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .sub-text {
          font-size: 10px;
          letter-spacing: 0.6em;
          color: #888;
          text-transform: uppercase;
          margin-top: -10px;
        }
      `}</style>

      <div className="loader-main-container">
        
        {/* Logo Image */}
        <img
          src="/iqra.jpeg"
          alt="IQRA Optical"
          style={{
            width: '150px', // Pehle se thora bara size
            height: '150px',
            objectFit: 'contain',
            borderRadius: '50%',
            background: '#fff',
            padding: '5px',
            boxShadow: '0 0 40px rgba(255, 255, 255, 0.15)'
          }}
        />

        {/* Main Headline Message */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="headline-text">Iqra Optics</h1>
          <span className="sub-text">World of Vision</span>
        </div>

      </div>
    </div>
  );
};

export default PageLoader;