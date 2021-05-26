import React from 'react'
// import { useTheme } from '@material-ui/core/styles'
import { ResponsiveContainer } from 'recharts'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

const GET_DATA_QUERY = gql`
  {
    count {
      substance {
        substancename
        CAS
      }
      product {
        gtin
        name
      }
      rel_list {
        identity
        start
        end
        from
        to
        processing_type
        amount
        unit
        type
        __typename
      }
    }
  }
`

export default function RatingsChart() {
  // const theme = useTheme()

  const { loading, error, data } = useQuery(GET_DATA_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Aluminium</Title>
      <ResponsiveContainer>
        {data && !error && !loading && (
          <div width="100%">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>substance</TableCell>
                  <TableCell>relation list</TableCell>
                  <TableCell>product</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.count.map(({ product, rel_list, substance }, index) => {
                  return (
                    <TableRow key={`row-${index}`}>
                      <TableCell>{JSON.stringify(substance)}</TableCell>
                      <TableCell>{JSON.stringify(rel_list)}</TableCell>
                      <TableCell>{JSON.stringify(product)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </ResponsiveContainer>
    </React.Fragment>
  )
}
