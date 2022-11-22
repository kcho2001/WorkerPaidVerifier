import { gql } from "@apollo/client";

export const GET_DAYS_UNPAID = gql`
  query {
    workers {
      id
      daysUnpaid
    }
  }
`;

export const GET_PAYMENTS = gql`
  query {
    payments {
      id
      year
      month
      day
    }
  }
`;
