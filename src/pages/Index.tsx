import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, DollarSign, Calendar, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LeaderboardTable } from "@/components/LeaderBoard";
import { PrizePoolCard } from "@/components/PrizePoolCard";
import { ChartsSection } from "@/components/ChartsSection";
import { WeeklyTitles } from "@/components/WeeklyTitles";
import { mockData, generateWeeklyData } from "@/lib/mockData";

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState("2024-W01");
  
  const weeklyData = useMemo(() => generateWeeklyData(mockData), []);
  const currentWeekData = weeklyData[selectedWeek] || { participants: [], totalPenalties: 0 };
  
  const availableWeeks = Object.keys(weeklyData).sort().reverse();

  return (
    <div className="min-h-screen bg-background">
      {/* Gaming Header */}
      <motion.header 
        className="bg-gradient-card border-b border-border shadow-card"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold bg-gradient-gaming bg-clip-text text-transparent"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                🏆 NYU LeetCode Challenge
              </motion.h1>
              <motion.p 
                className="text-muted-foreground text-lg mt-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
              </motion.p>
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="w-48 bg-card border-primary/20 hover:border-primary/40 transition-colors">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableWeeks.map((week) => (
                    <SelectItem key={week} value={week}>
                      Week {week.split('-W')[1]} - {week.split('-')[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        {/* Weekly Titles */}
        <WeeklyTitles participants={currentWeekData.participants} />

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-2xl font-bold text-foreground">{currentWeekData.participants.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Targets Met</p>
                <p className="text-2xl font-bold text-success">
                  {currentWeekData.participants.filter(p => p.completed >= p.target).length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Total Penalties</p>
                <p className="text-2xl font-bold text-destructive">${currentWeekData.totalPenalties}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-card border-border shadow-card">
            <div className="flex items-center gap-3">
              <Coins className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Prize Pool</p>
                <p className="text-2xl font-bold text-accent">
                  ${Object.values(weeklyData).reduce((sum, week) => sum + week.totalPenalties, 0)}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Prize Pool Section */}
        <PrizePoolCard 
          totalPrizePool={Object.values(weeklyData).reduce((sum, week) => sum + week.totalPenalties, 0)}
          currentWeekPenalties={currentWeekData.totalPenalties}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="xl:col-span-2">
            <LeaderboardTable participants={currentWeekData.participants} />
          </div>

          {/* Charts */}
          <div>
            <ChartsSection participants={currentWeekData.participants} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;