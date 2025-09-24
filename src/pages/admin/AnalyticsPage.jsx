import React from "react";
import AnalyticsGraphs from "../../components/AnalyticsGraphs";
import StatsCards from "../../components/StatsCards";
import ExtraInfo from "../../components/Extrainfo";

export default function AnalyticsPage() {
  return (
    <>
      <StatsCards />
      <AnalyticsGraphs />
      <ExtraInfo />
    </>
  );
}
