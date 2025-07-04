import React from 'react';
// import './UniqueLoadingComponent.css';

const FullPageLoader = () => {

  return (
    <div className="lottie-loader-container">
      <style>
        {`
          .lottie-loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .lottie-loader {
            position: relative;
            width: 120px;
            height: 120px;
          }

          .glow-core {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 60px;
            background: radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0) 70%);
            transform: translate(-50%, -50%);
            animation: glowPulse 2s ease-in-out infinite;
          }

          .trapezoid {
            position: absolute;
            width: 40px;
            height: 20px;
            background: linear-gradient(135deg, #22d3ee, #10b981);
            clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
            left: 50%;
            transform: translateX(-50%);
          }

          .trapezoid-1 {
            top: 0;
            animation: moveTrapezoid1 3s ease-in-out infinite;
          }

          .trapezoid-2 {
            top: 20px;
            animation: moveTrapezoid2 3s ease-in-out infinite;
          }

          .trapezoid-3 {
            top: 40px;
            animation: moveTrapezoid3 3s ease-in-out infinite;
          }

          .symbol {
            position: absolute;
            font-size: 20px;
            font-weight: bold;
            color: #22d3ee;
            text-shadow: 0 0 8px rgba(34, 211, 238, 0.5);
            left: 50%;
            transform: translateX(-50%);
          }

          .dollar-1 {
            top: 0;
            animation: moveSymbol1 3s ease-in-out infinite;
          }

          .rupee-1 {
            top: 20px;
            animation: moveSymbol2 3s ease-in-out infinite;
          }

          .dollar-2 {
            top: 40px;
            animation: moveSymbol3 3s ease-in-out infinite;
          }

          @keyframes glowPulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.5;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.3;
            }
          }

          @keyframes moveTrapezoid1 {
            0%, 100% {
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 0.8;
            }
            25% {
              transform: translateX(-50%) translateY(-20px) scale(1.1);
              opacity: 0.5;
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.9);
              opacity: 0.3;
            }
            75% {
              transform: translateX(-50%) translateY(20px) scale(1.1);
              opacity: 0.5;
            }
          }

          @keyframes moveTrapezoid2 {
            0%, 100% {
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 0.8;
            }
            25% {
              transform: translateX(-50%) translateY(20px) scale(1.1);
              opacity: 0.5;
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.9);
              opacity: 0.3;
            }
            75% {
              transform: translateX(-50%) translateY(-20px) scale(1.1);
              opacity: 0.5;
            }
          }

          @keyframes moveTrapezoid3 {
            0%, 100% {
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 0.8;
            }
            25% {
              transform: translateX(-50%) translateY(-20px) scale(1.1);
              opacity: 0.5;
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.9);
              opacity: 0.3;
            }
            75% {
              transform: translateX(-50%) translateY(20px) scale(1.1);
              opacity: 0.5;
            }
          }

          @keyframes moveSymbol1 {
            0%, 100% {
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 1;
            }
            25% {
              transform: translateX(-50%) translateY(-15px) scale(1.2);
              opacity: 0.6;
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.8);
              opacity: 0.4;
            }
            75% {
              transform: translateX(-50%) translateY(15px) scale(1.2);
              opacity: 0.6;
            }
          }

          @keyframes moveSymbol2 {
            0%, 100% {
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 1;
            }
            25% {
              transform: translateX(-50%) translateY(15px) scale(1.2);
              opacity: 0.6;
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.8);
              opacity: 0.4;
            }
            75% {
              transform: translateX(-50%) translateY(-15px) scale(1.2);
              opacity: 0.6;
            }
          }

          @keyframes moveSymbol3 {
            0%, 100% {
              transform: translateX(-50%) translateY(0) scale(1);
              opacity: 1;
            }
            25% {
              transform: translateX(-50%) translateY(-15px) scale(1.2);
              opacity: 0.6;
            }
            50% {
              transform: translateX(-50%) translateY(0) scale(0.8);
              opacity: 0.4;
            }
            75% {
              transform: translateX(-50%) translateY(15px) scale(1.2);
              opacity: 0.6;
            }
          }
        `}
      </style>
      <div className="lottie-loader">
        <div className="glow-core"></div>
        <div className="trapezoid trapezoid-1"></div>
        <div className="trapezoid trapezoid-2"></div>
        <div className="trapezoid trapezoid-3"></div>
        <div className="symbol dollar-1">$</div>
        <div className="symbol rupee-1">₹</div>
        <div className="symbol dollar-2">$</div>
      </div>
    </div>
  );
};


export default FullPageLoader