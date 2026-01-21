import { setRequestLocale } from 'next-intl/server';
import { GoogleMaps, LeafletMap } from '@/components';
import { LiquidGlassDemo } from '@/components/demo/LiquidGlassDemo';

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: 'de' | 'en' }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 sm:px-8 py-24 space-y-24">
      {/* Liquid Glass Demo Section */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight leading-tight mb-6">
          Liquid Glass UI Demo
        </h1>
        <p className="text-color-foreground-muted mb-8">
          Experimental Liquid Glass effects adapted for brutalist editorial design.
          These effects combine transparency, blur, and subtle animations while maintaining square edges.
        </p>
        <div className="border border-color-border p-6">
          <LiquidGlassDemo />
        </div>
        <div className="mt-8 p-4 border border-color-border bg-color-accent-highlight">
          <h3 className="font-bold mb-2">Implementation Notes</h3>
          <ul className="text-sm text-color-foreground-muted space-y-1">
            <li>• Located in: <code>src/components/demo/LiquidGlassDemo.tsx</code></li>
            <li>• CSS utilities in: <code>src/app/globals.css</code> (search for &quot;LIQUID GLASS&quot;)</li>
            <li>• Square edges maintained to respect brutalist design principles</li>
            <li>• Respects reduced motion preferences via @media (prefers-reduced-motion)</li>
            <li>• Uses backdrop-filter with fallbacks for browser compatibility</li>
            <li>• Color palette adapts automatically to light/dark mode</li>
          </ul>
        </div>
      </section>

      {/* Google Maps Demo Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight leading-tight mb-6">
          Google Maps Integration
        </h2>
        <p className="text-color-foreground-muted mb-8">
          Monochrome styled maps with green markers, showing Vienna locations.
          The component is already integrated into the Contact pages.
        </p>
        
        <div className="border border-color-border p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Live Demo</h3>
          <div className="mb-6 p-4 border border-color-border bg-color-accent-highlight">
            <p className="text-sm font-medium mb-2">⚠️ Google Maps API Key Required</p>
            <p className="text-sm text-color-foreground-muted">
              To see the map, you need to add a Google Maps API key to your <code>.env.local</code> file:
            </p>
            <pre className="text-xs mt-2 p-3 bg-color-background border border-color-border overflow-x-auto">
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</pre>
          </div>
          
          <div className="mt-8" style={{ height: '400px' }}>
            <GoogleMaps 
              simplifiedStyle={true}
              showControls={true}
              className="h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-color-border p-6">
            <h3 className="font-bold mb-3">Component Location</h3>
            <p className="text-sm text-color-foreground-muted mb-4">
              <code>src/components/maps/GoogleMaps.tsx</code>
            </p>
            <ul className="text-sm text-color-foreground-muted space-y-2">
              <li>• Monochrome styling with green markers</li>
              <li>• Vienna locations (client is Austria-based)</li>
              <li>• Square edges per brutalist design system</li>
              <li>• Responsive container with location cards</li>
              <li>• Environment variable configuration</li>
            </ul>
          </div>

          <div className="border border-color-border p-6">
            <h3 className="font-bold mb-3">Integration Points</h3>
            <ul className="text-sm text-color-foreground-muted space-y-2">
              <li>• <strong>English Contact Page:</strong> <code>src/app/[locale]/contact/page.tsx</code></li>
              <li>• <strong>German Contact Page:</strong> <code>src/app/[locale]/kontakt/page.tsx</code></li>
              <li>• <strong>Component Export:</strong> <code>src/components/index.ts</code></li>
              <li>• <strong>Environment Template:</strong> <code>.env.local.example</code></li>
            </ul>
            <div className="mt-6 p-4 border border-color-border">
              <p className="text-sm font-medium">Quick Navigation:</p>
              <div className="flex gap-4 mt-3">
                <a 
                  href={`/${locale}/contact`}
                  className="px-4 py-2 border border-color-border hover:bg-color-accent-highlight text-sm"
                >
                  Go to Contact Page
                </a>
                <a 
                  href={`/${locale}/kontakt`}
                  className="px-4 py-2 border border-color-border hover:bg-color-accent-highlight text-sm"
                >
                  Go to Kontakt Page
                </a>
              </div>
            </div>
          </div>
        </div>
       </section>

       {/* Leaflet/OpenStreetMap Demo Section */}
       <section>
         <h2 className="text-3xl font-bold tracking-tight leading-tight mb-6">
           Leaflet/OpenStreetMap Alternative
         </h2>
         <p className="text-color-foreground-muted mb-8">
           Free, open-source map alternative using OpenStreetMap tiles. No API key required.
           Fully compatible with brutalist design system including dark mode support.
         </p>
         
         <div className="border border-color-border p-6 mb-8">
           <h3 className="text-xl font-semibold mb-4">Light Mode (Monochrome)</h3>
           <div className="mt-8" style={{ height: '400px' }}>
             <LeafletMap 
               simplifiedStyle={true}
               showControls={true}
               className="h-full"
               darkMode={false}
             />
           </div>
         </div>

         <div className="border border-color-border p-6 mb-8 bg-gray-900">
           <h3 className="text-xl font-semibold mb-4 text-white">Dark Mode Alternative</h3>
           <p className="text-gray-400 mb-4">
             Dark theme map with contrasting markers and text.
           </p>
           <div className="mt-8" style={{ height: '400px' }}>
             <LeafletMap 
               simplifiedStyle={true}
               showControls={true}
               className="h-full"
               darkMode={true}
             />
           </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="border border-color-border p-6">
             <h3 className="font-bold mb-3">Benefits vs Google Maps</h3>
             <ul className="text-sm text-color-foreground-muted space-y-2">
               <li>• <strong>Zero cost:</strong> No API key or usage fees</li>
               <li>• <strong>Privacy friendly:</strong> No user tracking</li>
               <li>• <strong>Open source:</strong> Fully customizable</li>
               <li>• <strong>Smaller bundle:</strong> ~45KB vs ~400KB</li>
               <li>• <strong>EU compliant:</strong> No data transfer concerns</li>
             </ul>
           </div>

           <div className="border border-color-border p-6">
             <h3 className="font-bold mb-3">Implementation Details</h3>
             <ul className="text-sm text-color-foreground-muted space-y-2">
               <li>• <code>src/components/maps/LeafletMap.tsx</code></li>
               <li>• Uses <code>react-leaflet</code> + <code>leaflet</code></li>
               <li>• OpenStreetMap tile servers</li>
               <li>• Custom green markers matching design system</li>
               <li>• Same API as GoogleMaps component</li>
               <li>• Drop-in replacement for existing maps</li>
             </ul>
             <div className="mt-6 p-4 border border-color-border">
               <p className="text-sm font-medium">Migration Ready:</p>
               <p className="text-sm text-color-foreground-muted mt-2">
                 Simply replace <code>{"<GoogleMaps />"}</code> with <code>{"<LeafletMap />"}</code> in contact pages.
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* Other Components Demo */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight leading-tight mb-6">
          Other Implemented Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-color-border p-6">
            <h3 className="font-bold mb-3">Social Media Integration</h3>
            <p className="text-sm text-color-foreground-muted mb-4">
              Instagram follow button + 5 platform links
            </p>
            <ul className="text-sm text-color-foreground-muted space-y-1">
              <li>• <code>src/components/SocialMediaLinks.tsx</code></li>
              <li>• <code>src/components/InstagramFollowButton.tsx</code></li>
              <li>• Integrated into enhanced Footer</li>
            </ul>
          </div>

          <div className="border border-color-border p-6">
            <h3 className="font-bold mb-3">Footer Logo Tiles</h3>
            <p className="text-sm text-color-foreground-muted mb-4">
              3-column grid of affiliated organizations
            </p>
            <ul className="text-sm text-color-foreground-muted space-y-1">
              <li>• <code>src/components/Footer.tsx</code> (updated)</li>
              <li>• <code>src/lib/affiliations.ts</code> (data structure)</li>
              <li>• Hover effects with square edges</li>
            </ul>
          </div>

          <div className="border border-color-border p-6">
            <h3 className="font-bold mb-3">Info/Warning Banner</h3>
            <p className="text-sm text-color-foreground-muted mb-4">
              Dismissible announcement component
            </p>
            <ul className="text-sm text-color-foreground-muted space-y-1">
              <li>• <code>src/components/InfoBanner.tsx</code></li>
              <li>• 4 variants: info, warning, success, error</li>
              <li>• localStorage persistence option</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}