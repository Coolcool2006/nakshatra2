"use client";

import React, { useState, useEffect } from "react";
import { getCurrentNakshatra, getUpcomingNakshatras } from "@/lib/astrology";
import type { NakshatraTime } from "@/lib/types";
import { LocationTimeCard } from "@/components/cosmic-clock/LocationTimeCard";
import { CurrentNakshatraCard } from "@/components/cosmic-clock/CurrentNakshatraCard";
import { UpcomingNakshatrasList } from "@/components/cosmic-clock/UpcomingNakshatrasList";
import { Skeleton } from "@/components/ui/skeleton";

export default function CosmicClockPage() {
  const [now, setNow] = useState(new Date());
  const [currentNakshatra, setCurrentNakshatra] = useState<NakshatraTime | null>(null);
  const [upcomingNakshatras, setUpcomingNakshatras] = useState<NakshatraTime[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const initialDate = new Date();
    const current = getCurrentNakshatra(initialDate);
    setCurrentNakshatra(current);
    setUpcomingNakshatras(getUpcomingNakshatras(initialDate, 26));

    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isMounted && currentNakshatra && now > currentNakshatra.endTime) {
      const current = getCurrentNakshatra(now);
      setCurrentNakshatra(current);
      setUpcomingNakshatras(getUpcomingNakshatras(now, 26));
    }
  }, [now, currentNakshatra, isMounted]);

  if (!isMounted || !currentNakshatra) {
    return (
      <div className="min-h-screen w-full bg-background p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-accent font-headline">Cosmic Clock</h1>
        </header>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full bg-background p-4 sm:p-6 lg:p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-accent font-headline">Cosmic Clock</h1>
      </header>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2 space-y-8">
          <LocationTimeCard now={now} />
          <CurrentNakshatraCard now={now} currentNakshatra={currentNakshatra} />
        </div>
        
        <div className="lg:col-span-1">
           <UpcomingNakshatrasList upcomingNakshatras={upcomingNakshatras} now={now} />
        </div>
      </div>
    </main>
  );
}
