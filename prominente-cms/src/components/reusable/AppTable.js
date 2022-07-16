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
      className={`bg-white rounded-md shadow p-2 modal-scrollbar ${className}`}
    >
      <Table variant="simple">
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
