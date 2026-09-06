import "./globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
title:"AI Firewall",
description:"AI Security Layer for LLM Applications"
};



export default function RootLayout({children}){


return (

<html lang="en">

<body className="bg-black">

<Navbar/>

{children}


</body>

</html>

)

}