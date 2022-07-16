import React from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";

import Show from "./wrapper/Show";
import { XIcon } from "./general/icons";
import AppTable from "./general/AppTable";
import { convToDate, convToTime } from "../utils/common";

const CheckoutItem = ({ checkout, tableCols, deleteOrderHandler }) => {
  return (
    <main className="space-y-4 border rounded-md p-4 md:p-6 relative">
      <Show
        when={
          checkout.status === "delivered" || checkout.status === "unapproved"
        }
      >
        <button onClick={deleteOrderHandler} className="absolute right-4 top-4">
          <XIcon className="h-5 w-5 md:h-6 md:w-6 hover:scale-125 transition-all" />
        </button>
      </Show>

      <p className="font-semibold">
        <span className="font-normal">Order ID:</span> {checkout.id}
      </p>
      <AppTable
        colNames={tableCols}
        className="max-h-[12rem] md:max-h-[12rem] border border-r-0"
      >
        <Tbody className="font-light">
          {checkout.items.map((product, i) => (
            <Tr key={i}>
              <Td>
                <img
                  src={product.image}
                  alt="Picture of the author"
                  className="w-40"
                />
              </Td>
              <Td className="space-y-8">
                <section className="space-y-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="tracking-widest">{product.details}</p>
                </section>
              </Td>
              <Td>₱ {product.price}.00</Td>
              <Td>{product.qty}</Td>
            </Tr>
          ))}
        </Tbody>
      </AppTable>
      <section className="flex flex-col items-end space-y-4">
        <div className="space-y-4 w-full border-b pb-4">
          <p>
            Ordered: {convToDate(checkout.timestamp)}{" "}
            {convToTime(checkout.timestamp)}
          </p>
          <Show when={checkout.confirmed}>
            <p>
              Confirmed: {convToDate(checkout.confirmed)}{" "}
              {convToTime(checkout.confirmed)}
            </p>
          </Show>
          <Show when={checkout.delivered}>
            <p>
              Delivered: {convToDate(checkout.delivered)}{" "}
              {convToTime(checkout.delivered)}
            </p>
          </Show>
          <Show when={checkout.unapproved}>
            <p>
              Unapproved: {convToDate(checkout.unapproved)}{" "}
              {convToTime(checkout.unapproved)}
            </p>
          </Show>
        </div>

        <p className="font-semibold">
          <span className="font-normal">{`Total (${checkout.itemCount} ${
            checkout.itemCount > 1 ? "items" : "item"
          }): `}</span>
          {`₱${checkout.totalBill}.00 `}
        </p>
        <p
          className={`order-status ${
            checkout.status === "pending"
              ? "bg-purple-200"
              : checkout.status === "confirmed"
              ? "bg-blue-200"
              : checkout.status === "unapproved"
              ? "bg-red-200"
              : "bg-green-200"
          }`}
        >
          {checkout.status}
        </p>
      </section>
    </main>
  );
};

export default CheckoutItem;
