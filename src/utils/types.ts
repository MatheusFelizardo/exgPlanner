import React from 'react'
import { NextPage } from "next";
import { MouseEventHandler } from "react";

export interface EventProps extends React.ChangeEvent<HTMLInputElement> {}


export interface CoinsProps {
    AUD?: string
    BRL?: string
    CAD?: string
    EUR?: string
    GBP?: string
    USD?: string
}

export interface CurrencyProps {
 data: {
    base: string
    "exchange_rates": CoinsProps
    last_updated: number
 }
}

export const COINS = ["USD", "BRL", "CAD", "AUD", "EUR", "GBP"]

export interface CurrencyInfoProps {
    value: string
    coin: string
}

export interface ExpenseProps {
    type: string
    description: string
    value: string
}

export interface InfosToSaveProps {
    user: string
    country: string
    currentBudget: CurrencyInfoProps
    totalCost: CurrencyInfoProps
    travelDate: string, 
    expense?: ExpenseProps[] | [null]
}
