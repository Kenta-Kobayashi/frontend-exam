"use client";
import React, { useEffect } from 'react';
import Button from "@/components/Button/page";
import styles from "./styles/pages.module.css"
import RenderLineChart from "@/components/RenderLineChart/page";
import { useContext, useState} from 'react'
import { createContext } from "vm";
import DataProvider from "@/components/DataProvider/page";


/* export const UserCount = createContext() */

export default function Home() {





    return (

        <DataProvider>
            <div className={styles.wrapper}>
                <h1>都道府県</h1>
                <section className={styles.contents_box}>
                    <div className={styles.button_list}>
                        <Button />
                    </div>
                </section>

                <section className={styles.contents_box_chart}>
                    <RenderLineChart />
                </section>

            </div>
        </DataProvider>
    )

};
