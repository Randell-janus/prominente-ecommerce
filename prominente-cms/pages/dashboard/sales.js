import { Tbody, Tr, Td } from "@chakra-ui/react";

import withPrivate from "../../src/utils/routes/withPrivate";
import {
  PageLayout,
  TableLayout,
} from "../../src/components/reusable/layouts";
import AppTable from "../../src/components/reusable/AppTable";
import { convToDate } from "../../src/utils/common";
import { useSales } from "../../src/utils/contexts/salesContext";
import { useProducts } from "../../src/utils/contexts/productsContext";

const Sales = () => {
  const { bills } = useSales();
  const { glassProducts, alumProducts } = useProducts();

  const sumedUpDates = [];
  const dailyIncomes = [];

  function isDateSumedUp(date) {
    return sumedUpDates.indexOf(date) !== -1;
  }

  function sumUpDate(date) {
    const sum = 0;

    bills?.forEach((bill) => {
      if (convToDate(bill.timestamp) === date) {
        sum += parseInt(bill.totalBill);
      }
    });

    sumedUpDates.push(date);
    dailyIncomes.push(sum);
  }

  bills.forEach((bill) => {
    if (!isDateSumedUp(convToDate(bill.timestamp))) {
      sumUpDate(convToDate(bill.timestamp));
    }
  });

  return (
    <PageLayout pageTitle={"Dashboard > Sales"}>
      <TableLayout title="Daily Sales" isHeaderPrimary={true}>
        <AppTable colNames={["date", "Total Income"]} className="max-h-screen">
          <Tbody className="font-light">
            {sumedUpDates?.map((d, i) => {
              return (
                <Tr key={i}>
                  <Td>{d}</Td>
                  <Td>₱{dailyIncomes[i].toFixed(2)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </AppTable>
      </TableLayout>

      <TableLayout title="Glass Sales">
        <AppTable
          colNames={["Product", "Total Sales"]}
          className="max-h-screen"
        >
          <Tbody className="font-light">
            {glassProducts
              ?.sort((a, b) => b.sales - a.sales)
              .map((product) => {
                return (
                  <Tr key={product.id}>
                    <Td>
                      {product.material} {product.type}
                    </Td>
                    <Td>{product.sales}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </AppTable>
      </TableLayout>

      <TableLayout title="Aluminum Sales">
        <AppTable
          colNames={["Product", "Total Sales"]}
          className="max-h-screen"
        >
          <Tbody className="font-light">
            {alumProducts
              ?.sort((a, b) => b.sales - a.sales)
              .map((product) => {
                return (
                  <Tr key={product.id}>
                    <Td>
                      {product.material} {product.type}
                    </Td>
                    <Td>{product.sales}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </AppTable>
      </TableLayout>
    </PageLayout>
  );
};

export default withPrivate(Sales);
