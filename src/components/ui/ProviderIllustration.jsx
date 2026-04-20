import { motion } from "framer-motion";

export function ProviderIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 400 400" className="w-[130%] h-[130%] max-w-[500px] mx-auto drop-shadow-2xl">
        {/* Glow / Backdrop organic blob */}
        <motion.path 
          d="M200,60 C280,50 350,120 340,200 C330,280 260,350 180,340 C100,330 50,260 60,180 C70,100 120,70 200,60 Z"
          fill="white" opacity="0.08"
          animate={{ rotate: [0, 10, -5, 0], scale: [1, 1.05, 0.95, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        
        {/* Floating Screwdriver */}
        <motion.g 
          animate={{ y: [0, -15, 0], rotate: [-45, -35, -45] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          style={{ transformOrigin: "60px 100px" }}
        >
          <g transform="translate(60, 100) rotate(-45)">
            <rect x="-4" y="-30" width="8" height="40" fill="#E2E8F0" rx="4" />
            <rect x="-8" y="10" width="16" height="30" fill="#F43F5E" rx="6" />
            <path d="M-8 15 L8 15 M-8 20 L8 20 M-8 25 L8 25" stroke="#BE123C" strokeWidth="2" />
          </g>
        </motion.g>

        {/* Floating Gear */}
        <motion.g 
          animate={{ y: [0, 20, 0], rotate: [15, 60, 15] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          style={{ transformOrigin: "340px 140px" }}
        >
          <g transform="translate(340, 140) rotate(15)">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#F472B6" strokeWidth="8" strokeDasharray="12 8" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="#F472B6" strokeWidth="6" />
            <circle cx="0" cy="0" r="6" fill="#F472B6" />
          </g>
        </motion.g>

        {/* Floating Nut/Hex */}
        <motion.g 
          animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
          style={{ transformOrigin: "80px 280px" }}
        >
          <g transform="translate(80, 280)">
            <path d="M -15 -20 L 15 -20 L 30 0 L 15 20 L -15 20 L -30 0 Z" fill="#38BDF8" />
            <circle cx="0" cy="0" r="12" fill="#0EA5E9" />
            <circle cx="0" cy="0" r="8" fill="#0F172A" />
          </g>
        </motion.g>

        {/* Floating Toolbox */}
        <motion.g 
          animate={{ y: [0, 15, 0], rotate: [10, 0, 10] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          style={{ transformOrigin: "320px 280px" }}
        >
          <g transform="translate(320, 280) rotate(10)">
            <rect x="-35" y="-20" width="70" height="45" rx="8" fill="#F59E0B" />
            <path d="M-15 -20 L-15 -35 L15 -35 L15 -20" fill="none" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
            <rect x="-10" y="-10" width="20" height="8" rx="2" fill="#FEF3C7" />
            <circle cx="0" cy="-6" r="2" fill="#D97706" />
          </g>
        </motion.g>

        {/* Floating Sparkles Background */}
        <motion.path d="M 120 70 L 125 80 L 135 85 L 125 90 L 120 100 L 115 90 L 105 85 L 115 80 Z" fill="#FEF08A" animate={{ scale: [0.5, 1, 0.5], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 3 }} />
        <motion.circle cx="300" cy="320" r="6" fill="#FBCFE8" animate={{ scale: [0, 1.5, 0] }} transition={{ repeat: Infinity, duration: 2.5, delay: 1 }} />

        {/* THE CHARACTER */}
        <g id="character">
          {/* Back Arm (Left Arm resting on hip) */}
          <path d="M 160 170 Q 110 200 130 240" fill="none" stroke="#FDBA74" strokeWidth="18" strokeLinecap="round" />
          <path d="M 175 160 L 135 190" fill="none" stroke="#1E293B" strokeWidth="22" strokeLinecap="round" />
          
          {/* Shirt Details (Pink/Purple vibrant under-suit like the magician) */}
          <path d="M 175 130 L 225 130 L 215 150 L 185 150 Z" fill="#E879F9" />
          <polygon points="190,140 210,140 200,155" fill="#C026D3" />

          {/* Legs (Dancing Pose) */}
          {/* Left Leg (bent) */}
          <path d="M 175 250 L 140 290 L 160 340" fill="none" stroke="#0F172A" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          {/* Left Shoe */}
          <path d="M 160 330 L 130 340 C 130 350 170 350 170 340 Z" fill="#475569" />
          
          {/* Right Leg (straight) */}
          <path d="M 225 250 L 260 340" fill="none" stroke="#0F172A" strokeWidth="24" strokeLinecap="round" />
          {/* Right Shoe */}
          <path d="M 260 330 L 290 340 C 290 350 250 350 250 340 Z" fill="#475569" />

          {/* Torso (The "Suit" / Overalls) */}
          <path d="M 160 150 L 240 150 L 235 260 L 165 260 Z" fill="#1E293B" />
          {/* Buttons */}
          <circle cx="200" cy="180" r="5" fill="#F8FAFC" />
          <circle cx="200" cy="210" r="5" fill="#F8FAFC" />
          <circle cx="200" cy="240" r="5" fill="#F8FAFC" />
          
          {/* Shirt Collar / Lapels (White) */}
          <path d="M 160 150 L 185 150 L 200 200 Z" fill="#F8FAFC" />
          <path d="M 240 150 L 215 150 L 200 200 Z" fill="#F8FAFC" />

          {/* Head & Face */}
          <circle cx="200" cy="100" r="32" fill="#FDBA74" />
          
          {/* Classic Whimsical Mustache */}
          <path d="M 175 110 C 175 100 225 100 225 110 C 225 125 190 115 175 110 Z" fill="#0F172A" />
          
          {/* Eyes */}
          <circle cx="188" cy="95" r="4" fill="#0F172A" />
          <circle cx="212" cy="95" r="4" fill="#0F172A" />
          <path d="M 183 90 Q 188 85 193 90" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <path d="M 207 90 Q 212 85 217 90" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          
          {/* Rosy Cheeks */}
          <circle cx="178" cy="102" r="6" fill="#FCA5A5" opacity="0.6" />
          <circle cx="222" cy="102" r="6" fill="#FCA5A5" opacity="0.6" />

          {/* Hard Hat */}
          <path d="M 166 85 Q 200 30 234 85 Z" fill="#FCD34D" />
          <rect x="155" y="80" width="90" height="12" rx="6" fill="#D97706" />
          {/* Logo on Hat */}
          <circle cx="200" cy="70" r="6" fill="#FFFFFF" opacity="0.8" />

          {/* Front Arm (Right Arm) raised triumphantly holding the magical wrench */}
          <path d="M 230 160 Q 300 130 300 70" fill="none" stroke="#FDBA74" strokeWidth="18" strokeLinecap="round" />
          <path d="M 225 160 L 270 145" fill="none" stroke="#1E293B" strokeWidth="22" strokeLinecap="round" />

          {/* Magical Wrench (held like a wand) */}
          <motion.g 
            transform="translate(300, 70)"
            animate={{ rotate: [-5, 8, -5] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          >
            {/* Wrench Handle */}
            <line x1="0" y1="-30" x2="15" y2="40" stroke="#F1F5F9" strokeWidth="10" strokeLinecap="round" />
            <line x1="0" y1="-30" x2="15" y2="40" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" strokeDasharray="4 8" />
            
            {/* Wrench Head */}
            <path d="M -16 -30 A 16 16 0 1 1 16 -30 L 10 -20 L -10 -20 Z" fill="#94A3B8" />
            
            {/* Sparkles erupting from the wrench */}
            <motion.path 
              d="M 5 -60 L 9 -52 L 17 -48 L 9 -44 L 5 -36 L 1 -44 L -7 -48 L 1 -52 Z" 
              fill="#FEF08A" 
              animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.circle cx="25" cy="-55" r="4" fill="#67E8F9" animate={{ scale: [0, 1.2, 0], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
            <motion.circle cx="-20" cy="-30" r="5" fill="#F472B6" animate={{ scale: [0, 1.2, 0], y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
            <motion.circle cx="10" cy="-80" r="3" fill="#A78BFA" animate={{ scale: [0, 1, 0], y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }} />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
