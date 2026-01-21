"use client";

import { useState } from "react";

export function LiquidGlassDemo() {
  const [activeEffect, setActiveEffect] = useState<string>("basic");

  const effects = [
    { id: "basic", name: "Basic Liquid Glass", description: "Frosted glass with subtle shine" },
    { id: "text", name: "Liquid Text", description: "Animated gradient text effect" },
    { id: "border", name: "Liquid Border", description: "Flowing animated border" },
    { id: "card", name: "Liquid Card", description: "Floating glass card with hover" },
    { id: "accent", name: "Accent Glass", description: "Glass with accent color tint" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="border border-color-border p-6">
        <h2 className="text-2xl font-bold mb-4">Liquid Glass UI Exploration</h2>
        <p className="text-color-foreground-muted mb-6">
          Experimental Liquid Glass effects adapted for brutalist editorial design.
          Combines transparency, blur, and subtle animations while maintaining square edges.
        </p>

        {/* Effect selector */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Select Effect</h3>
          <div className="flex flex-wrap gap-2">
            {effects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => setActiveEffect(effect.id)}
                className={`px-4 py-2 border ${activeEffect === effect.id
                    ? "border-color-foreground bg-color-accent-highlight text-color-foreground"
                    : "border-color-border text-color-foreground-muted hover:border-color-accent"
                  }`}
              >
                {effect.name}
              </button>
            ))}
          </div>
        </div>

        {/* Demo area */}
        <div className="border border-color-border p-8 min-h-[400px] flex items-center justify-center">
          {activeEffect === "basic" && (
            <div className="liquid-glass square p-8 max-w-md">
              <h3 className="text-xl font-bold mb-3">Basic Liquid Glass</h3>
              <p className="text-color-foreground-muted">
                This element uses backdrop-filter blur with transparency.
                The square edges maintain brutalist design principles while
                the glass effect adds depth and modernity.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="px-4 py-2 border border-color-border hover:bg-color-accent-highlight">
                  Button
                </button>
                <button className="liquid-glass square hoverable px-4 py-2">
                  Glass Button
                </button>
              </div>
            </div>
          )}

          {activeEffect === "text" && (
            <div className="text-center max-w-2xl">
              <h3 className="text-4xl font-bold mb-6 text-liquid animated">
                Liquid Text Effect
              </h3>
              <p className="text-color-foreground-muted mb-8">
                Gradient text with subtle animation creates a fluid, glass-like appearance.
                Works with the existing color palette while adding visual interest.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-color-border">
                  <h4 className="text-lg font-medium text-liquid mb-2">Static</h4>
                  <p className="text-sm">Regular liquid text</p>
                </div>
                <div className="p-4 border border-color-border">
                  <h4 className="text-lg font-medium text-liquid animated mb-2">Animated</h4>
                  <p className="text-sm">With flowing gradient</p>
                </div>
              </div>
            </div>
          )}

          {activeEffect === "border" && (
            <div className="border-liquid p-8 max-w-md">
              <h3 className="text-xl font-bold mb-3">Liquid Border</h3>
              <p className="text-color-foreground-muted mb-6">
                Animated border with flowing gradient effect.
                Creates a subtle, dynamic outline without overwhelming the content.
              </p>
              <div className="space-y-4">
                <div className="p-4 border border-color-border">
                  <p>Regular border for comparison</p>
                </div>
                <div className="border-liquid p-4">
                  <p>Liquid border with animation</p>
                </div>
              </div>
            </div>
          )}

          {activeEffect === "card" && (
            <div className="flex flex-col items-center gap-8">
              <div className="liquid-card p-8 max-w-md">
                <h3 className="text-xl font-bold mb-3">Liquid Glass Card</h3>
                <p className="text-color-foreground-muted mb-6">
                  Floating card with enhanced backdrop blur and subtle shadows.
                  Hover to see the elevation effect.
                </p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 border border-color-border hover:bg-color-accent-highlight">
                    Action
                  </button>
                  <button className="px-4 py-2 bg-color-foreground text-color-background hover:bg-color-accent">
                    Primary
                  </button>
                </div>
              </div>
              <div className="text-sm text-color-foreground-muted text-center">
                Hover over the card to see the floating effect
              </div>
            </div>
          )}

          {activeEffect === "accent" && (
            <div className="grid grid-cols-2 gap-6 max-w-2xl">
              <div className="liquid-glass accent square p-6">
                <h4 className="font-bold mb-2">Accent Glass</h4>
                <p className="text-sm">Tinted with accent color</p>
              </div>
              <div className="liquid-glass highlight square p-6">
                <h4 className="font-bold mb-2">Highlight Glass</h4>
                <p className="text-sm">Softer highlight variant</p>
              </div>
              <div className="liquid-glass square hoverable p-6 col-span-2">
                <h4 className="font-bold mb-2">Interactive Glass Panel</h4>
                <p className="text-sm mb-4">Hover to see blur intensity change</p>
                <div className="flex gap-4">
                  <div className="px-3 py-1 border border-color-border text-xs">Item 1</div>
                  <div className="px-3 py-1 border border-color-border text-xs">Item 2</div>
                  <div className="px-3 py-1 border border-color-border text-xs">Item 3</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Implementation notes */}
        <div className="mt-8 p-4 border border-color-border bg-color-accent-highlight">
          <h4 className="font-bold mb-2">Implementation Notes</h4>
          <ul className="text-sm text-color-foreground-muted space-y-1">
            <li>• All effects use CSS custom properties for theme consistency</li>
            <li>• Square edges maintained to respect brutalist design principles</li>
            <li>• Respects reduced motion preferences via @media (prefers-reduced-motion)</li>
            <li>• Uses backdrop-filter with fallbacks for browser compatibility</li>
            <li>• Color palette adapts automatically to light/dark mode</li>
            <li>• Effects are additive and can be combined with existing components</li>
          </ul>
        </div>
      </div>
    </div>
  );
}