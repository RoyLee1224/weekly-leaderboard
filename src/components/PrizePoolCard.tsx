import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PrizePoolCardProps {
  totalPrizePool: number;
  currentWeekPenalties: number;
}

export function PrizePoolCard({ totalPrizePool, currentWeekPenalties }: PrizePoolCardProps) {
  const [showCoins, setShowCoins] = useState(false);
  const [previousTotal, setPreviousTotal] = useState(totalPrizePool);

  useEffect(() => {
    if (totalPrizePool > previousTotal) {
      setShowCoins(true);
      const timer = setTimeout(() => setShowCoins(false), 2000);
      setPreviousTotal(totalPrizePool);
      return () => clearTimeout(timer);
    }
  }, [totalPrizePool, previousTotal]);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mb-8"
    >
      <Card className="relative overflow-hidden bg-gradient-card border-border shadow-card">
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Prize Pool Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <motion.div
                  className="text-6xl"
                  animate={showCoins ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  🏆
                </motion.div>
                
                {/* Falling Coins Animation */}
                <AnimatePresence>
                  {showCoins && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-2xl"
                          initial={{ 
                            y: -50, 
                            x: (i - 2) * 20,
                            rotate: 0,
                            opacity: 0 
                          }}
                          animate={{ 
                            y: 100, 
                            rotate: 360,
                            opacity: [0, 1, 0] 
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 1.5,
                            delay: i * 0.1,
                            ease: "easeOut"
                          }}
                        >
                          🪙
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Prize Pool</h2>
                <motion.div 
                  className="text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent"
                  key={totalPrizePool}
                  initial={{ scale: 1.2, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${totalPrizePool}
                </motion.div>
                <p className="text-muted-foreground mt-2">
                  Accumulated from all weekly penalties
                </p>
              </div>
            </div>
            
            {/* Current Week Stats */}
            <div className="text-center md:text-right">
              <div className="flex items-center gap-2 justify-center md:justify-end mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold text-primary">This Week</span>
              </div>
              <div className="text-3xl font-bold text-destructive mb-1">
                ${currentWeekPenalties}
              </div>
              <p className="text-sm text-muted-foreground">
                {currentWeekPenalties > 0 ? "New penalties added" : "No penalties yet! 🎉"}
              </p>
            </div>
          </div>
          
          {/* Prize Pool Description */}
          <motion.div 
            className="mt-6 p-4 bg-muted/10 rounded-lg border border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">How it works:</span>
            </div>
            <p className="text-sm text-muted-foreground">
              For every problem below your weekly target, you contribute $1 to the prize pool. 
              At the end of the challenge period, the accumulated prize pool goes to the top performers! 
              💰 Miss your target = pay up. Crush your goals = get paid! 🏆
            </p>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-accent/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-primary/10 rounded-full blur-2xl -z-10" />
      </Card>
    </motion.div>
  );
}