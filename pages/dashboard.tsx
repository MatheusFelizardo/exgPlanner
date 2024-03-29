import Budget from '@App/components/Dashboard/Budget'
import BudgetChart from '@App/components/Dashboard/Chart'
import CurrencyMenu from '@App/components/Dashboard/CurrencyMenu'
import CustomBudget from '@App/components/Dashboard/CustomBudget'
import VideoLink from '@App/components/Dashboard/VideoLink'
import AppHeader from '@App/components/Logged/AppHeader'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import ThumbSaveMoney from '@App/assets/img/youtube-1.png'
export interface CurrencyMenuProps {
  selectedCurrency: string
  // eslint-disable-next-line no-unused-vars
  setSelectedCurrency?: (x:string) => void
}

const Dashboard:NextPage = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  return (
    <>
      <Head>
        <title>Dashboard - exgPlanner </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <AppHeader />
        <CurrencyMenu selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
        <Budget selectedCurrency={selectedCurrency} />
        <CustomBudget selectedCurrency={selectedCurrency} />

        <BudgetChartContainer>
          <BudgetChart />
          <VideoWrapper>
            <VideoLink img={ThumbSaveMoney} text="Learn how to save money for your exchange" link="https://youtube.com" />
          </VideoWrapper>
        </BudgetChartContainer>
      </>
    </>
  )
}

export default Dashboard


const BudgetChartContainer = styled.div`
  padding: 1.6rem;
  background: #F2F2F2;
  display: flex;
  justify-content: space-between;
`

const VideoWrapper = styled.div`
  width: calc(50% - 0.4rem);

`