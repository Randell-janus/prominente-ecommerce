import { AuthProvider } from "../src/utils/contexts/AuthContext";
import { ProductsProvider } from "../src/utils/contexts/productsContext";
import { UsersProvider } from "../src/utils/contexts/usersContext";
import { OrdersProvider } from "../src/utils/contexts/ordersContext";
import { SalesProvider } from "../src/utils/contexts/salesContext";

import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "../styles/chakraTheme";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <UsersProvider>
          <OrdersProvider>
            <SalesProvider>
              <ChakraProvider theme={chakraTheme} resetCSS={false}>
                <Component {...pageProps} />
              </ChakraProvider>
            </SalesProvider>
          </OrdersProvider>
        </UsersProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default MyApp;
