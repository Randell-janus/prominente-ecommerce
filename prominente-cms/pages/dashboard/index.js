import { useState } from "react";
import { Tbody, Tr, Td } from "@chakra-ui/react";
import {
  doc,
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  increment,
} from "firebase/firestore";

import { db } from "../../src/utils/firebase/initClient";
import withPrivate from "../../src/utils/routes/withPrivate";
import {
  LabelledInfo,
  PageLayout,
  TableLayout,
} from "../../src/components/reusable/layouts";
import AppTable from "../../src/components/reusable/AppTable";
import { useOrders } from "../../src/utils/contexts/ordersContext";
import AppModal from "../../src/components/reusable/AppModal";
import {
  UnapprovedIcon,
  VerifiedIcon,
} from "../../src/components/reusable/icons";
import Show from "../../src/components/wrapper/Show";
import { convToDate, convToTime } from "../../src/utils/common";
import { SelectBox } from "../../src/components/reusable/inputs";

const Dashboard = () => {
  const { orders, ordersCount } = useOrders();

  const [selectedOrder, setSelectedOrder] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("none");
  const [selectedSort, setSelectedSort] = useState("by date");

  const ordersCols = ["Order ID", "Name", "Date", "Total", "Items", "Status"];

  const openModal = (order) => {
    setIsModalOpen(true);
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleIncrementSales = () => {
    selectedOrder?.items.forEach((item) => {
      const docRef = doc(db, item.category, item.pid);
      updateDoc(docRef, { sales: increment(item.qty) });
    });
  };

  const handleSalesTracker = async () => {
    await addDoc(collection(db, `sales`), {
      totalBill: selectedOrder?.totalBill,
      timestamp: selectedOrder?.timestamp,
    });
  };

  const handleNotifications = async (title, details) => {
    await addDoc(collection(db, `users/${selectedOrder?.uid}/notifications`), {
      title,
      details,
      timestamp: serverTimestamp(),
      read: "false",
    });
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const ref = doc(
      db,
      `users/${selectedOrder?.uid}/checkouts`,
      selectedOrder?.id
    );

    if (selectedOrder?.status === "confirmed") {
      await updateDoc(ref, {
        status: "delivered",
        delivered: serverTimestamp(),
      });
      await handleNotifications(
        "order delivered",
        `This is to notify you that your order (ID: ${selectedOrder?.id}) has been delivered to your set address.`
      );
      handleIncrementSales();
      handleSalesTracker();
      closeModal();
      return;
    }

    await updateDoc(ref, {
      status: "confirmed",
      confirmed: serverTimestamp(),
    });

    await handleNotifications(
      "order confirmation",
      `Your order (ID: ${selectedOrder?.id}) has been confirmed. You can expect a call when the materials are ready for delivery.`
    );

    closeModal();
  };

  const handleUnapproveOrder = async (e) => {
    e.preventDefault();
    const ref = doc(
      db,
      `users/${selectedOrder?.uid}/checkouts`,
      selectedOrder?.id
    );

    await updateDoc(ref, {
      status: "unapproved",
      unapproved: serverTimestamp(),
    });

    await handleNotifications(
      "order unapproved",
      `Your order (ID: ${selectedOrder?.id}) has been unapproved. Your payment will be refunded soon.`
    );
    closeModal();
  };

  const pending = selectedOrder?.status === "pending";
  const confirmed = selectedOrder?.status === "confirmed";
  const delivered = selectedOrder?.status === "delivered";
  const unapproved = selectedOrder?.status === "unapproved";

  return (
    <PageLayout
      pageTitle={"Dashboard > Orders"}
      absolutes={
        <AppModal
          title={
            pending
              ? "Confirm order"
              : confirmed
              ? "Mark as delivered"
              : unapproved
              ? "Order Unapproved"
              : "Delivered"
          }
          isOpen={isModalOpen}
          closeModal={closeModal}
          className="max-w-lg md:max-w-2xl"
          onClick={handleConfirmOrder}
          btnClassName={(delivered || unapproved) && "hidden"}
        >
          <main className="flex flex-col space-y-6">
            <LabelledInfo label={"Order ID: "} info={selectedOrder?.id} />
            <LabelledInfo
              label={"Date: "}
              info={`${convToDate(selectedOrder?.timestamp)} ${convToTime(
                selectedOrder?.timestamp
              )}`}
            />
            <AppTable
              colNames={["Product", "Details", "Qty"]}
              className="max-h-[15vh] md:max-h-[17vh] shadow-white border"
            >
              <Tbody className="font-light">
                {selectedOrder?.items.map((product, i) => (
                  <Tr key={i}>
                    <Td className="space-y-4">
                      <section className="space-y-1">
                        <h3 className="font-medium">{product.name}</h3>
                        {/* <p className="tracking-widest">{product.details}</p> */}
                      </section>
                    </Td>
                    <Td>{product.details}</Td>
                    <Td>{product.qty}</Td>
                    {/* <Td>₱{product.price}.00</Td> */}
                  </Tr>
                ))}
              </Tbody>
            </AppTable>
            <section className="space-y-2 border-b pb-6 text-right">
              <LabelledInfo label={"Address: "} info={selectedOrder?.address} />
              <LabelledInfo label={"Contact: "} info={selectedOrder?.contact} />
            </section>
            <section className="flex justify-end items-center space-x-1">
              <LabelledInfo
                label={`Total (${selectedOrder?.itemCount}):`}
                info={`₱${selectedOrder?.totalBill}.00`}
              />
              <Show when={delivered}>
                <VerifiedIcon
                  className={`h-5 w-5 md:h-6 md:w-6 text-green-400`}
                />
              </Show>
              <Show when={unapproved}>
                <UnapprovedIcon
                  className={`h-5 w-5 md:h-6 md:w-6 text-red-400`}
                />
              </Show>
            </section>
            <Show when={pending}>
              <button
                onClick={handleUnapproveOrder}
                className="w-full text-right underline pt-8"
              >
                Unapprove Order
              </button>
            </Show>
          </main>
        </AppModal>
      }
    >
      <TableLayout
        title="Orders"
        isHeaderPrimary={true}
        misc={
          <div className="flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <SelectBox
              label="Filter Status"
              options={[
                "none",
                "pending",
                "confirmed",
                "delivered",
                "unapproved",
              ]}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            />
            <SelectBox
              label="Sort"
              options={["by date", "total low-high", "total high-low"]}
              onChange={(e) => setSelectedSort(e.target.value)}
            />
          </div>
        }
        hasSearch
        searchPlaceholder="Search orders by name or date"
        onSearchChange={(e) => setSearchInput(e.target.value)}
      >
        <AppTable colNames={ordersCols}>
          <Tbody className="font-light">
            {orders
              ?.filter((el) => {
                if (selectedStatusFilter === "none") return el;
                else if (el.status === selectedStatusFilter) return el;
              })
              .filter((val) => {
                if (searchInput === "") return val;
                else if (
                  val.owner.toLowerCase().includes(searchInput.toLowerCase()) ||
                  convToDate(val.timestamp)
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                )
                  return val;
              })
              .sort((a, b) => {
                if (selectedSort === "by date") return;
                else if (selectedSort === "total low-high")
                  return a.totalBill - b.totalBill;
                else return b.totalBill - a.totalBill;
              })
              .map((order, i) => {
                const pending = order.status === "pending";
                const confirmed = order.status === "confirmed";
                const unapproved = order.status === "unapproved";

                return (
                  <Tr
                    key={i}
                    className="hover:bg-slate-100 cursor-pointer"
                    onClick={() => openModal(order)}
                  >
                    <Td>{order.id}</Td>
                    <Td className="capitalize">
                      <p>{order.owner}</p>
                    </Td>
                    <Td>{convToDate(order.timestamp)}</Td>
                    {/* <Td>{order.timestamp?}</Td> */}
                    <Td>
                      <p>₱{order.totalBill}.00</p>
                    </Td>
                    <Td>{order.itemCount}</Td>
                    <Td>
                      <p
                        className={`capitalize rounded-full px-3 w-max font-medium ${
                          pending
                            ? "bg-purple-200"
                            : confirmed
                            ? "bg-blue-200"
                            : unapproved
                            ? "bg-red-200"
                            : "bg-green-200"
                        }`}
                      >
                        {order.status}
                      </p>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </AppTable>
      </TableLayout>
    </PageLayout>
  );
};

export default withPrivate(Dashboard);
