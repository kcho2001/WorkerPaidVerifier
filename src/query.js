import { gql } from "@apollo/client";

export const GET_DAYS_UNPAID = gql`
  query {
    workers {
      id
      daysUnpaid
    }
  }
`;
