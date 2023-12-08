import { formatDateTime } from "@/lib/date";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

const TableComponent = ({ data, onClick }: any) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Applicant Number</Th>
          <Th>Name</Th>
          <Th>Classification</Th>
          <Th>Status</Th>
          <Th>Created At</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((applicant: any) => (
          <Tr key={applicant.id}>
            <Td>{applicant.applicantNumber}</Td>
            <Td>{`${applicant.firstName} ${applicant.middleName} ${applicant.lastName}`}</Td>
            <Td>{applicant.classification}</Td>
            <Td>{applicant.status}</Td>
            <Td>
              {!applicant.created_at
                ? "-"
                : formatDateTime(applicant.created_at)}
            </Td>
            <Td>
              <Button
                colorScheme="linkedin"
                onClick={() => onClick(applicant.id)}
              >
                View
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TableComponent;
