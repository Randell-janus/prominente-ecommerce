import "../styles/globals.css";
import { AuthProvider } from "../src/utils/contexts/AuthContext";
import { ProductsProvider } from "../src/utils/contexts/ProductsContext";
import { CartProvider } from "../src/utils/contexts/cartContext";
import { NotifProvider } from "../src/utils/contexts/NotifContext";
import { BotProvider } from "../src/utils/contexts/BotContext";

import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "../styles/chakraTheme";

// import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

// if (typeof window !== "undefined") {
//   Kommunicate.init("2f46f3a897c59c659ce6cb5df569836e8");
// }

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <NotifProvider>
            <BotProvider>
              <ChakraProvider theme={chakraTheme} resetCSS={false}>
                <Component {...pageProps} />
              </ChakraProvider>
            </BotProvider>
          </NotifProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default MyApp;
