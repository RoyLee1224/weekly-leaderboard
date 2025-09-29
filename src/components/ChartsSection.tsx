import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { Participant } from "@/lib/mockData";

interface ChartsSectionProps {
  participants: Participant[];
}

export function ChartsSection({ participants }: ChartsSectionProps) {
  const barChartData = participants.map(p => ({
    name: p.name.split(' ')[0], // First name only for compact display
    completed: p.completed,
    target: p.target,
    penalty: p.penalty,
  }));

  const pieChartData = participants.map(p => ({
    name: p.name,
    value: p.completionPercentage,
    completed: p.completed,
    target: p.target,
  }));

  const COLORS = ['hsl(192 100% 50%)', 'hsl(270 50% 50%)', 'hsl(45 100% 60%)', 'hsl(142 76% 45%)', 'hsl(0 75% 60%)'];

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      dataKey: string;
      value: number;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="font-semibold text-foreground">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'completed' ? 'Completed' : 
               entry.dataKey === 'target' ? 'Target' : 'Penalty'}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: {
    active?: boolean;
    payload?: Array<{
      payload: {
        name: string;
        completed: number;
        target: number;
        value: number;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card">
          <p className="font-semibold text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.completed}/{data.target} problems ({data.value}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Bar Chart */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-card border-border shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Completed vs Target</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="completed" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                  name="Completed"
                />
                <Bar 
                  dataKey="target" 
                  fill="hsl(var(--muted))" 
                  radius={[4, 4, 0, 0]}
                  name="Target"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Pie Chart */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-card border-border shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <PieChartIcon className="h-5 w-5 text-secondary" />
            <h3 className="text-lg font-semibold text-foreground">Completion Rates</h3>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="mt-4 grid grid-cols-1 gap-2">
            {pieChartData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-foreground">{entry.name}</span>
                <span className="text-muted-foreground ml-auto">{entry.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Card className="p-6 bg-gradient-card border-border shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Completion</span>
              <span className="font-semibold text-foreground">
                {participants.length > 0 
                  ? Math.round(participants.reduce((sum, p) => sum + p.completed, 0) / participants.length)
                  : 0
                } problems
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Top Performer</span>
              <span className="font-semibold text-primary">
                {participants.length > 0 ? participants[0]?.name || 'N/A' : 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="font-semibold text-success">
                {participants.length > 0 
                  ? Math.round((participants.filter(p => p.completed >= p.target).length / participants.length) * 100)
                  : 0
                }%
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}