import React from "react";
import "./Skeleton.css";

export default function Skeleton({ type = "grid", count = 8 }) {
  if (type === "grid") {
    return (
      <div className="skeletonGrid">
        {Array.from({ length: count }).map((_, i) => (
          <div className="skeletonCard" key={i}>
            <div className="skeletonPoster" />
            <div className="skeletonMeta">
              <div className="skeletonLine short" />
              <div className="skeletonLine long" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // details skeleton
  return (
    <div className="skeletonDetails">
      <div className="skeletonPoster large" />
      <div className="skeletonMeta">
        <div className="skeletonLine xl" />
        <div className="skeletonLine long" />
        <div className="skeletonLine long" />
        <div className="skeletonLine long" />
      </div>
      <div className="skeletonSpinner" />
    </div>
  );
}
