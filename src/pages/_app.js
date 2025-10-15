import { LayoutPageWrapper } from "@/components/layout";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { DeleteModalProvider } from "@/context/DeleteModalContext";
import "@/styles/globals.css";
import { Poppins, Roboto } from "next/font/google";
import Head from "next/head";
import { Toaster } from "sonner"; 
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
}); 
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AuthProvider>
      <DeleteModalProvider>
        <CartProvider>
          <Head>
            <title>Bajar - Online Shopping</title>
            <meta name="description" content="Bajar - Online Shopping" />
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/image.png" type="" />
          </Head>
          <main className={`  ${roboto.variable} ${poppins.variable}  `}>
            <LayoutPageWrapper>
              {getLayout(<Component {...pageProps} />)}
              <Toaster
                position="top-left"
                richColors
                closeButton
                visibleToasts={5}
                duration={900}
                toastOptions={{
                  style: {
                    borderRadius: "10px",
                    padding: "14px",
                  },
                }}
              />
            </LayoutPageWrapper>
          </main>
        </CartProvider>
      </DeleteModalProvider>
    </AuthProvider>
  );
}
