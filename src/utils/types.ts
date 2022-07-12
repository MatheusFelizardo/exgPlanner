import { NextPage } from "next";
import { MouseEventHandler } from "react";


export interface EventProps extends React.ChangeEvent<HTMLInputElement> {}
export interface EventProps extends MouseEventHandler<HTMLButtonElement> {}


interface CoinsProps {
    EUR: string
    BRL: string
    CAD: string
    AUD: string
    USD: string
}

export interface CurrencyProps {
 data: {
    base: string
    "exchange_rates": CoinsProps
    last_updated: number
 }
}

export const COINS = ["BRL", "CAD", "AUD","USD", "EUR", "GBP"]