"use client"

import React from "react"

import { SessionProvider } from "next-auth/react"
import {ThemeProvider} from "next-themes"

export default function Provider({children}:{children:React.ReactNode,}){
	return (
		<SessionProvider>
			<ThemeProvider attribute="class" defaultTheme="dark">
			{children}
			</ThemeProvider>
		</SessionProvider>
	)
}
