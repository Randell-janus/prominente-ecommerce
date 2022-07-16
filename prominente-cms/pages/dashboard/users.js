import { useState } from "react";
import { Tbody, Tr, Td, useToast } from "@chakra-ui/react";

import { db } from "../../src/utils/firebase/initClient";
import withPrivate from "../../src/utils/routes/withPrivate";
import {
  LabelledInfo,
  PageLayout,
  TableLayout,
} from "../../src/components/reusable/layouts";
import AppTable from "../../src/components/reusable/AppTable";
import LoginForm from "../../src/components/LoginForm";
import { useUsers } from "../../src/utils/contexts/usersContext";

const Users = () => {
  const { users } = useUsers();

  const [searchInput, setSearchInput] = useState("");

  const tableCols = ["User ID", "Name/Email", "Address", "Contact", "Email"];

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      displayName,
      email,
      password,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/admin";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      setDisplayName("")
      setEmail("")
      setPassword("")

      // console.log(result.uid);
    } catch (err) {
      alert(err.code);
    }
  };

  return (
    <PageLayout pageTitle={"Dashboard > Users"}>
      <TableLayout
        title="Users"
        isHeaderPrimary={true}
        hasSearch
        searchPlaceholder="Search users by name or address"
        onSearchChange={(e) => setSearchInput(e.target.value)}
      >
        <AppTable colNames={tableCols} className="max-h-screen">
          <Tbody className="font-light">
            {/* sort name alphabetically on client side */}
            {users
              ?.filter((val) => {
                if (searchInput === "") return val;
                else if (
                  val.firstname
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  val.surname
                    .toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  val.address.toLowerCase().includes(searchInput.toLowerCase())
                )
                  return val;
              })
              .sort((a, b) => a.firstname.localeCompare(b.firstname))
              .map((user) => {
                return (
                  <Tr key={user.id}>
                    <Td>
                      <p className="whitespace-normal">{user.id}</p>
                    </Td>
                    <Td>
                      <p className="w-64 whitespace-normal capitalize">
                        {user.firstname} {user.surname}
                      </p>
                    </Td>
                    {/* <Td>{user.timestamp?.toDate().toDateString()}</Td> */}
                    <Td className="">
                      {/* <p className="max-w-md w-max whitespace-pre-line"> */}
                      <p className="w-96 whitespace-normal">{user.address}</p>
                    </Td>
                    <Td>
                      <p className="w-32 whitespace-normal">
                        {user.contact.replace(/\s/g, "")}
                      </p>
                    </Td>
                    <Td>
                      <p className="w-52 whitespace-normal">{user.email}</p>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </AppTable>
      </TableLayout>

      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="font-bold mb-4">Create Admin</h1>
        <LoginForm
          fieldLabel="Display Name"
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <LoginForm
          fieldLabel="Email Address"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginForm
          fieldLabel="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-primary-filled bg-teal-400 hover:bg-teal-300">
          CREATE
        </button>
      </form>
    </PageLayout>
  );
};

export default withPrivate(Users);
