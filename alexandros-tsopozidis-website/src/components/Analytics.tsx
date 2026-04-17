'use client';

import { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (id: number, action: string, ...rest: unknown[]) => void;
  }
}

function PageViewTracker({ ga4Id, ymId }: { ga4Id?: string; ymId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (ga4Id && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_location: typeof window !== 'undefined' ? window.location.href : url,
      });
    }

    if (ymId && typeof window.ym === 'function') {
      window.ym(Number(ymId), 'hit', url);
    }
  }, [pathname, searchParams, ga4Id, ymId]);

  return null;
}

export default function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    setConsent(localStorage.getItem('cookie-consent') === 'accepted');
  }, []);

  if (!consent) return null;

  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const ymId = process.env.NEXT_PUBLIC_YANDEX_METRICA_ID;

  return (
    <>
      {ga4Id && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:false});`}
          </Script>
        </>
      )}
      {ymId && (
        <Script id="yandex-metrica" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${ymId},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true,defer:true});`}
        </Script>
      )}
      <Suspense fallback={null}>
        <PageViewTracker ga4Id={ga4Id} ymId={ymId} />
      </Suspense>
    </>
  );
}
