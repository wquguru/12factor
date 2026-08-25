'use client';

import { useState, useEffect } from 'react';

const START_DATE = new Date('2025-08-09T14:00:00Z');

export default function UptimeDisplay() {
  const [uptime, setUptime] = useState<string>('');
  const [tooltip, setTooltip] = useState<string>('');
  const [milestone, setMilestone] = useState<string>('');
  
  useEffect(() => {
    const calculateUptime = () => {
      const now = new Date();
      const diffMs = now.getTime() - START_DATE.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      // Calculate months and remaining days
      const months = Math.floor(diffDays / 30);
      const days = diffDays % 30;
      
      // Format uptime string
      let uptimeStr = 'Online: ';
      if (months > 0) {
        uptimeStr += `${months} month${months > 1 ? 's' : ''}`;
        if (days > 0) {
          uptimeStr += ` ${days} day${days > 1 ? 's' : ''}`;
        }
      } else {
        uptimeStr += `${days} day${days > 1 ? 's' : ''}`;
      }
      
      setUptime(uptimeStr);
      
      // Set tooltip with exact start time
      const formattedDate = START_DATE.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short'
      });
      setTooltip(`Started on ${formattedDate}`);
      
      // Check for 10-day milestones
      if (diffDays > 0 && diffDays % 10 === 0) {
        setMilestone(`🎉 ${diffDays} days online!`);
      } else {
        setMilestone('');
      }
    };
    
    calculateUptime();
    // Update every hour
    const interval = setInterval(calculateUptime, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Return placeholder during SSR to avoid hydration mismatch
  if (!uptime) {
    return <span className="text-t3">12Factor</span>;
  }
  
  return (
    <span className="relative group">
      <span className="text-t3 cursor-help" title={tooltip}>
        {milestone || uptime}
      </span>
      {milestone && (
        <span className="absolute left-0 -top-8 bg-warn-wash text-warn text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {milestone}
        </span>
      )}
    </span>
  );
}