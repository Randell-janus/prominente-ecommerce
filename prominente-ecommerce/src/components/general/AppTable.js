import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const AppTable = ({ colNames, children, className }) => {
  return (
    <TableContainer
      overflowY="auto"
      className={`${className} bg-white rounded-md p-2 modal-scrollbar`}
    >
      <Table variant="simple" className="">
        <Thead>
          <Tr>
            {colNames.map((colName, i) => (
              <Th key={i}>{colName}</Th>
            ))}
          </Tr>
        </Thead>
        {children}
      </Table>
    </TableContainer>
  );
};

export default AppTable;
