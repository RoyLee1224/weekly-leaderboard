import { motion } from "framer-motion";
import { Trophy, Target, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Participant } from "@/lib/mockData";

interface LeaderboardTableProps {
  participants: Participant[];
}

export function LeaderboardTable({ participants }: LeaderboardTableProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <Card className="bg-gradient-card border-border shadow-card overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Weekly Leaderboard</h2>
          </div>
          
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-7 gap-4 mb-4 p-4 bg-muted/10 rounded-lg border border-border/50">
            <div className="text-sm font-medium text-muted-foreground">Rank</div>
            <div className="text-sm font-medium text-muted-foreground">Player</div>
            <div className="text-sm font-medium text-muted-foreground">Completed</div>
            <div className="text-sm font-medium text-muted-foreground">Target</div>
            <div className="text-sm font-medium text-muted-foreground">Difference</div>
            <div className="text-sm font-medium text-muted-foreground">Penalty</div>
            <div className="text-sm font-medium text-muted-foreground">Status</div>
          </div>
          
          {/* Table Body */}
          <div className="space-y-3">
            {participants.map((participant, index) => (
              <motion.div
                key={participant.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.2 }}
                className={`
                  grid grid-cols-1 md:grid-cols-7 gap-4 p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01]
                  ${participant.rank === 1
                    ? 'bg-gradient-accent/10 border-accent/30 shadow-champion'
                    : participant.difference < 0
                      ? 'bg-destructive/5 border-destructive/20 shadow-penalty'
                      : 'bg-success/5 border-success/20 shadow-gaming'
                  }
                `}
              >
                {/* Rank */}
                <div className="flex items-center gap-2">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${participant.rank === 1 
                      ? 'bg-accent text-accent-foreground' 
                      : participant.rank <= 3 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {participant.rank === 1 ? '👑' : participant.rank}
                  </div>
                  <span className="md:hidden text-xs text-muted-foreground">Rank</span>
                </div>
                
                {/* Player */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{participant.avatar}</div>
                  <div>
                    <div className="font-semibold text-foreground">{participant.name}</div>
                    <div className="text-xs text-muted-foreground md:hidden">
                      {participant.completed}/{participant.target} problems
                    </div>
                  </div>
                </div>
                
                {/* Completed */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{participant.completed}</span>
                  <span className="text-xs text-muted-foreground md:hidden">completed</span>
                </div>
                
                {/* Target */}
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{participant.target}</span>
                </div>
                
                {/* Difference */}
                <div className="flex items-center gap-2">
                  {participant.difference >= 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-success font-medium">+{participant.difference}</span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      <span className="text-destructive font-medium">{participant.difference}</span>
                    </>
                  )}
                </div>
                
                {/* Penalty */}
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${participant.penalty > 0 ? 'text-destructive' : 'text-success'}`}>
                    ${participant.penalty}
                  </span>
                </div>
                
                {/* Status */}
                <div className="flex items-center">
                  <Badge 
                    variant={participant.difference >= 0 ? "default" : "destructive"}
                    className={
                      participant.difference >= 0 
                        ? "bg-success/10 text-success border-success/20 hover:bg-success/20" 
                        : "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
                    }
                  >
                    {participant.difference >= 0 ? '🎯 Target Met' : '❌ Penalty'}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
          
          {participants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <p className="text-muted-foreground">No data available for this week</p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}