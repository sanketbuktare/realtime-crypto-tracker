import React from "react";

interface CoinTableProps {
  data: {
    timestamp: number;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

const CoinTable: React.FC<CoinTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              End / Close Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Open
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              High
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Low
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Close
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(item.timestamp).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{item.open}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.high}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.low}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinTable;
