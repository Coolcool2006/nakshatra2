"use client"

import React from 'react';
import type { NakshatraTime } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Orbit, Sparkles, Milestone, Star } from 'lucide-react';
import { formatDuration } from '@/lib/astrology';

type CurrentNakshatraCardProps = {
  now: Date;
  currentNakshatra: NakshatraTime;
  timezone?: string;
};

export function CurrentNakshatraCard({ now, currentNakshatra, timezone }: CurrentNakshatraCardProps) {
  const { sanskritName, englishName, rulingPlanet, deity, symbol, characteristics, startTime, endTime } = currentNakshatra;
  
  const totalDuration = endTime.getTime() - startTime.getTime();
  const elapsedTime = now.getTime() - startTime.getTime();
  const progress = Math.min(100, (elapsedTime / totalDuration) * 100);
  const timeRemaining = endTime.getTime() - now.getTime();

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-lg shadow-primary/10 overflow-hidden">
      <CardHeader className="bg-primary/20">
        <CardTitle className="text-3xl font-headline text-accent">{englishName}</CardTitle>
        <CardDescription className="text-xl font-sanskrit text-foreground/80">{sanskritName}</CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 mt-1 text-accent/80 shrink-0" />
            <div>
              <p className="font-semibold text-lg">Ruling Deity</p>
              <p className="text-muted-foreground">{deity}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Orbit className="h-6 w-6 mt-1 text-accent/80 shrink-0" />
            <div>
              <p className="font-semibold text-lg">Ruling Planet</p>
              <p className="text-muted-foreground">{rulingPlanet}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Milestone className="h-6 w-6 mt-1 text-accent/80 shrink-0" />
            <div>
              <p className="font-semibold text-lg">Symbol</p>
              <p className="text-muted-foreground">{symbol}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
            <div className="flex items-start gap-4">
            <Star className="h-6 w-6 mt-1 text-accent/80 shrink-0" />
            <div>
              <p className="font-semibold text-lg">Characteristics</p>
              <p className="text-muted-foreground italic">"{characteristics}"</p>
            </div>
          </div>
          <div className="mt-4">
             <p className="font-semibold text-lg mb-2">Auspicious Activities</p>
             <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Beginnings</Badge>
                <Badge variant="secondary">Healing</Badge>
                <Badge variant="secondary">Travel</Badge>
                <Badge variant="secondary">Learning</Badge>
             </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 bg-primary/20 p-6">
        <div>
          <p className="text-center text-lg">Ends in: <span className="font-bold text-accent font-mono">{formatDuration(timeRemaining)}</span></p>
          <p className="text-center text-sm text-muted-foreground">
            On {endTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: timezone })} at {endTime.toLocaleTimeString(undefined, { timeZone: timezone, hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <Progress value={progress} className="w-full h-2 bg-primary/50 [&>div]:bg-accent" />
      </CardFooter>
    </Card>
  );
}
