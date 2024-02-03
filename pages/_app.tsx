import '@/styles/globals.css'
import '@/styles/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode, useEffect } from 'react';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import RootLayout from '@/components/layout/RootLayout';


type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  
  const { toasts } = useToasterStore();
  useEffect(() => {
      toasts
          .filter((t) => t.visible) // Only consider visible toasts
          .filter((_, i) => i >= 1) // Is toast index over limit
          .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) removal without animation
  }, [toasts]);


  useEffect(() => {
    // @ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, [])


  if (Component.getLayout) {
    return Component.getLayout(
      <SessionProvider session={pageProps.session}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              pointerEvents: 'none'
            }
          }} />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    )
  }

  return (
    <SessionProvider session={pageProps.session}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            pointerEvents: 'none'
          }
        }} />
      <QueryClientProvider client={queryClient}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </QueryClientProvider>
    </SessionProvider>
  )
}
