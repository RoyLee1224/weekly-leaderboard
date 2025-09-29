export interface Challenge {
  problemId: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completedDate: string;
  person: string;
}

export interface Participant {
  name: string;
  completed: number;
  target: number;
  difference: number;
  penalty: number;
  rank: number;
  avatar: string;
  completionPercentage: number;
}

export interface WeekData {
  participants: Participant[];
  totalPenalties: number;
}

export const mockData: Challenge[] = [
  // Week 1 (2024-01-01 to 2024-01-07)
  { problemId: "1", title: "Two Sum", difficulty: "Easy", completedDate: "2024-01-01", person: "Alice" },
  { problemId: "2", title: "Add Two Numbers", difficulty: "Medium", completedDate: "2024-01-02", person: "Alice" },
  { problemId: "3", title: "Longest Substring", difficulty: "Medium", completedDate: "2024-01-03", person: "Alice" },
  { problemId: "4", title: "Median Arrays", difficulty: "Hard", completedDate: "2024-01-04", person: "Alice" },
  { problemId: "5", title: "Palindrome", difficulty: "Easy", completedDate: "2024-01-05", person: "Alice" },
  { problemId: "6", title: "ZigZag Conversion", difficulty: "Medium", completedDate: "2024-01-06", person: "Alice" },
  
  { problemId: "7", title: "Reverse Integer", difficulty: "Easy", completedDate: "2024-01-01", person: "Bob" },
  { problemId: "8", title: "String to Integer", difficulty: "Medium", completedDate: "2024-01-03", person: "Bob" },
  { problemId: "9", title: "Palindrome Number", difficulty: "Easy", completedDate: "2024-01-05", person: "Bob" },
  
  { problemId: "10", title: "Regular Expression", difficulty: "Hard", completedDate: "2024-01-02", person: "Charlie" },
  { problemId: "11", title: "Container Water", difficulty: "Medium", completedDate: "2024-01-04", person: "Charlie" },
  { problemId: "12", title: "Integer to Roman", difficulty: "Medium", completedDate: "2024-01-06", person: "Charlie" },
  { problemId: "13", title: "Roman to Integer", difficulty: "Easy", completedDate: "2024-01-07", person: "Charlie" },
  
  { problemId: "14", title: "Longest Common Prefix", difficulty: "Easy", completedDate: "2024-01-01", person: "Diana" },
  { problemId: "15", title: "3Sum", difficulty: "Medium", completedDate: "2024-01-03", person: "Diana" },
  
  // Week 2 (2024-01-08 to 2024-01-14)
  { problemId: "16", title: "3Sum Closest", difficulty: "Medium", completedDate: "2024-01-08", person: "Alice" },
  { problemId: "17", title: "Letter Combinations", difficulty: "Medium", completedDate: "2024-01-09", person: "Alice" },
  { problemId: "18", title: "4Sum", difficulty: "Medium", completedDate: "2024-01-10", person: "Alice" },
  { problemId: "19", title: "Remove Nth Node", difficulty: "Medium", completedDate: "2024-01-11", person: "Alice" },
  { problemId: "20", title: "Valid Parentheses", difficulty: "Easy", completedDate: "2024-01-12", person: "Alice" },
  
  { problemId: "21", title: "Merge Two Lists", difficulty: "Easy", completedDate: "2024-01-08", person: "Bob" },
  { problemId: "22", title: "Generate Parentheses", difficulty: "Medium", completedDate: "2024-01-10", person: "Bob" },
  { problemId: "23", title: "Merge k Lists", difficulty: "Hard", completedDate: "2024-01-12", person: "Bob" },
  { problemId: "24", title: "Swap Nodes", difficulty: "Medium", completedDate: "2024-01-14", person: "Bob" },
  
  { problemId: "25", title: "Reverse Nodes", difficulty: "Hard", completedDate: "2024-01-09", person: "Charlie" },
  { problemId: "26", title: "Remove Duplicates", difficulty: "Easy", completedDate: "2024-01-11", person: "Charlie" },
  { problemId: "27", title: "Remove Element", difficulty: "Easy", completedDate: "2024-01-13", person: "Charlie" },
  
  { problemId: "28", title: "Find Index", difficulty: "Easy", completedDate: "2024-01-08", person: "Diana" },
  { problemId: "29", title: "Divide Integers", difficulty: "Medium", completedDate: "2024-01-10", person: "Diana" },
  { problemId: "30", title: "Substring Concat", difficulty: "Hard", completedDate: "2024-01-12", person: "Diana" },
  { problemId: "31", title: "Next Permutation", difficulty: "Medium", completedDate: "2024-01-14", person: "Diana" },
  
  { problemId: "32", title: "Longest Valid", difficulty: "Hard", completedDate: "2024-01-09", person: "Eve" },
  { problemId: "33", title: "Search Rotated", difficulty: "Medium", completedDate: "2024-01-11", person: "Eve" },
];

function getWeekNumber(date: string): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const dayOfYear = Math.floor((d.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)) + 1;
  const weekNumber = Math.ceil(dayOfYear / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

export function generateWeeklyData(challenges: Challenge[]): Record<string, WeekData> {
  const weeklyData: Record<string, WeekData> = {};
  
  // Group challenges by week
  const challengesByWeek: Record<string, Challenge[]> = {};
  challenges.forEach(challenge => {
    const week = getWeekNumber(challenge.completedDate);
    if (!challengesByWeek[week]) {
      challengesByWeek[week] = [];
    }
    challengesByWeek[week].push(challenge);
  });
  
  // Process each week
  Object.entries(challengesByWeek).forEach(([week, weekChallenges]) => {
    const participantCounts: Record<string, number> = {};
    
    // Count completions per person
    weekChallenges.forEach(challenge => {
      participantCounts[challenge.person] = (participantCounts[challenge.person] || 0) + 1;
    });
    
    // Create participant data
    const participants: Participant[] = [];
    const avatars = ["🧑‍💻", "👩‍💻", "🤓", "👨‍💻", "🧠", "🦄", "🔥", "⭐"];
    let avatarIndex = 0;
    
    Object.entries(participantCounts).forEach(([name, completed]) => {
      const target = 5; // Everyone has a target of 5 problems per week
      const difference = completed - target;
      const penalty = Math.max(0, target - completed);
      const completionPercentage = Math.round((completed / target) * 100);
      
      participants.push({
        name,
        completed,
        target,
        difference,
        penalty,
        rank: 0, // Will be calculated after sorting
        avatar: avatars[avatarIndex % avatars.length],
        completionPercentage,
      });
      avatarIndex++;
    });
    
    // Sort by completed (descending) and assign ranks
    participants.sort((a, b) => b.completed - a.completed);
    participants.forEach((participant, index) => {
      participant.rank = index + 1;
    });
    
    const totalPenalties = participants.reduce((sum, p) => sum + p.penalty, 0);
    
    weeklyData[week] = {
      participants,
      totalPenalties,
    };
  });
  
  return weeklyData;
}