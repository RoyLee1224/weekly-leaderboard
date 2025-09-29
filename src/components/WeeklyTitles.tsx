import { motion } from "framer-motion";
import { Crown, Turtle, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Participant } from "@/lib/mockData";

interface WeeklyTitlesProps {
  participants: Participant[];
}

export function WeeklyTitles({ participants }: WeeklyTitlesProps) {
  if (participants.length === 0) return null;

  const champion = participants.find(p => p.rank === 1);
  const slowWalker = participants.reduce((prev, current) => 
    (prev.completed < current.completed) ? prev : current
  );
  const biggestContributor = participants.reduce((prev, current) => 
    (prev.penalty > current.penalty) ? prev : current
  );

  const titles = [
    {
      title: "🏆 Champion",
      description: "Most problems solved",
      participant: champion,
      icon: Crown,
      color: "accent",
      bgColor: "bg-gradient-accent/10",
      borderColor: "border-accent/30",
    },
    {
      title: "🐢 Slow Walker",
      description: "Fewest problems solved",
      participant: slowWalker,
      icon: Turtle,
      color: "secondary",
      bgColor: "bg-gradient-secondary/10",
      borderColor: "border-secondary/30",
    },
    {
      title: "💰 Biggest Contributor",
      description: "Most penalties paid",
      participant: biggestContributor?.penalty > 0 ? biggestContributor : null,
      icon: DollarSign,
      color: "destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {titles.map((titleData, index) => (
          <motion.div
            key={titleData.title}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Card className={`
              p-6 transition-all duration-300 ${titleData.participant ? 'hover:scale-[1.01] cursor-pointer hover:shadow-lg' : 'opacity-60'}
              ${titleData.bgColor} ${titleData.borderColor} shadow-card
            `}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <titleData.icon className={`h-6 w-6 text-${titleData.color}`} />
                  <div>
                    <h3 className="font-bold text-foreground">{titleData.title}</h3>
                    <p className="text-sm text-muted-foreground">{titleData.description}</p>
                  </div>
                </div>
                
                {titleData.participant && (
                  <div className="text-3xl animate-bounce">
                    {titleData.participant.rank === 1 ? '👑' : 
                     titleData.title.includes('Slow') ? '🐌' : '💸'}
                  </div>
                )}
              </div>
              
              {titleData.participant ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{titleData.participant.avatar}</div>
                    <div>
                      <p className="font-semibold text-foreground">{titleData.participant.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {titleData.title.includes('Champion') && (
                          <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                            {titleData.participant.completed} problems
                          </Badge>
                        )}
                        {titleData.title.includes('Slow') && (
                          <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs">
                            {titleData.participant.completed} problems
                          </Badge>
                        )}
                        {titleData.title.includes('Contributor') && titleData.participant.penalty > 0 && (
                          <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs">
                            ${titleData.participant.penalty} penalty
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">
                    {titleData.title.includes('Contributor') 
                      ? "No penalties this week! 🎉" 
                      : "No data available"
                    }
                  </p>
                </div>
              )}
              
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Special celebration if everyone meets target */}
      {participants.length > 0 && participants.every(p => p.completed >= p.target) && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <Card className="p-6 bg-gradient-gaming/10 border-primary/30 shadow-gaming">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold text-primary mb-2">Perfect Week!</h3>
            <p className="text-muted-foreground">
              Everyone met their targets this week! No penalties, pure victory! 🏆
            </p>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}