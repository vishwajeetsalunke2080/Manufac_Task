import React from 'react';
import { Table, Container, Title } from '@mantine/core';
import { parseData, aggregateData } from './dataProcessing';
import type { CropData } from './dataProcessing';
import rawData from "./data.json";
import '@mantine/core/styles.css';

const App: React.FC = () => {
  const parsedData: CropData[] = parseData(rawData);
  const { yearWiseData, cropAverageData } = aggregateData(parsedData);

  return (
    <Container>
      <Title order={2}  style={{textAlign:"center", margin:"2em 0em 2em"}}>Crop Production Data by Year</Title>
      <Table withTableBorder withColumnBorders withRowBorders style={{textAlign:"center", margin:"2em 0em 2em"}}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{textAlign:"center"}}>Year</Table.Th>
            <Table.Th style={{textAlign:"center"}}>Max Production Crop</Table.Th>
            <Table.Th style={{textAlign:"center"}}>Min Production Crop</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {yearWiseData.map((row) => (
            <Table.Tr key={row.year}>
              <Table.Td>{row.year}</Table.Td>
              <Table.Td>{row.maxProductionCrop}</Table.Td>
              <Table.Td>{row.minProductionCrop}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      
      <Title order={2} style={{textAlign:"center", margin:"2em 0em 2em"}}>Average Yield and Cultivation Area (1950-2020)</Title>
      <Table withTableBorder withColumnBorders withRowBorders style={{textAlign:"center", margin:"2em 0em 2em"}}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{textAlign:"center"}}>Crop</Table.Th>
            <Table.Th style={{textAlign:"center"}}>Average Yield (Kg/Ha)</Table.Th>
            <Table.Th style={{textAlign:"center"}}>Average Area (Ha)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {cropAverageData.map((row) => (
            <Table.Tr key={row.cropName}>
              <Table.Td>{row.cropName}</Table.Td>
              <Table.Td>{row.averageYield.toFixed(3)}</Table.Td>
              <Table.Td>{row.averageArea.toFixed(3)}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default App;
